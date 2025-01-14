import express from 'express';
import { matchPath, matchRoutes } from "react-router";
import parseUrl from "parseurl";
import fs from "fs";
import { createServerStore, type DispatchFunction } from 'react-reducer-ssr'
import { renderHtml } from "./renderHtml";

export type LoadDataFunction = (dispatch: DispatchFunction,
  cookies: {}, urlSearch: string | null, params: any) => Promise<void>;
export type RouteObjectSsr = {
  loadData?: LoadDataFunction,
  component: any,
  isNotFound?: boolean
}

function findChangedValues(originalObject: Record<string, any>, copiedObject: Record<string, any>): Record<string, any> {
  const changedValues: Record<string, any> = {};
  for (const key in copiedObject) {
    if (originalObject[key] !== copiedObject[key]) {
      changedValues[key] = copiedObject[key];
    }
  }
  return changedValues;
}

export const ssr = (htmlTemplatePath: string, reducers: any, routes: any, createServices?: (cookies: any) => any) => (
  req: express.Request, res: express.Response, next: express.NextFunction) => {
  const url_parts = parseUrl(req);
  const urlSearch = url_parts ? url_parts.search : "";
  const urlPath = url_parts ? url_parts.pathname : "";

  const originalCookies = {...req.cookies};
  const cookies = {...req.cookies};
  //console.log("cookies", cookies)
  const customParams = createServices ? {services: createServices(cookies)} : {};
  const store = createServerStore(reducers, customParams, null);
  const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf8");

  const matches = matchRoutes(routes, urlPath || '');
  if (!matches) {
    res.statusCode = 404;
    next("Not found");
    return;
  }

  const promises = matches
    .map(({ route }) => {
      let params;
      if(route.path) {
        const match = matchPath({ path: route.path }, req.url);
        params = match?.params;
      }
      const r = route as RouteObjectSsr;
      return r.loadData ? (r.loadData(store.dispatch, cookies, urlSearch, params)) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve) => {
          promise.then(resolve).catch(resolve);
        });
      }
      return;
    });
  Promise.all(promises)
    .then(() => {
      const content = renderHtml(reducers, htmlTemplate, routes, req, store);

      const changedCookies = findChangedValues(originalCookies, cookies);
      for (const key in changedCookies) {
        res.cookie(key, changedCookies[key]);
        //console.log("next changedCookie", key, changedCookies[key]);
      }
      // It's better to handle redirects on a client because of a browser cache.
      sendResponse(res, content);
      next();
    })
    .catch((err) => {
      sendResponse(res, "Error happens: " + err);
      next();
    });
};

function sendResponse(res: express.Response, content: string) {
  res.statusCode = res.statusCode || 200;
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.setHeader('X-Powered-By', 'react-ssr-web');
  res.end(content);
}

export default ssr;