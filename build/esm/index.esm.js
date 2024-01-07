import{renderToString as r}from"react-dom/server";import{StaticRouter as t}from"react-router-dom/server";import{Routes as e}from"react-router-dom";import{renderRoutes as o}from"react-router-layout";import{HelmetProvider as c}from"react-helmet-async";import i from"serialize-javascript";import{RootContextProvider as a,createServerStore as n}from"react-reducer-ssr";import{jsx as s}from"react/jsx-runtime";import{matchRoutes as m}from"react-router";import p from"parseurl";import u from"fs";var d=function(n,m,p,u,d){var f={},l=s(t,{location:u.url,children:s(c,{context:f,children:s(a,{reducer:n,initialState:null==d?void 0:d.root,children:s(e,{children:o(p)})})})}),v=r(l),h="production"===process.env.NODE_ENV?'<script src="/static/js/service-worker.js" defer><\/script>':"",x=f.helmet,S=x&&x.title?x.title.toString():"",T=x&&x.meta?x.meta.toString():"";return m.replace('<div id="app"></div>','<div id="app">'.concat(v,"</div>\n      <script>\n        window.INITIAL_STATE = ").concat(i(d.root),"\n      <\/script>\n      ").concat(h)).replace("\x3c!-- META --\x3e","".concat(S,"\n      ").concat(T))},f=function(r,t,e,o){return function(c,i,a){var s=p(c),f=s?s.search:"",v=s?s.pathname:"",h=o?{services:o(c.cookies)}:{},x=n(t,h,{}),S=u.readFileSync(r,"utf8"),T=m(e,v||"");if(!T)return i.statusCode=404,void a("Not found");var E=T.map((function(r){var t=r.route;return t.loadData?t.loadData(x.dispatch,c.cookies,f):null})).map((function(r){if(r)return new Promise((function(t){r.then(t).catch(t)}))}));Promise.all(E).then((function(){var r=d(t,S,e,c,x);l(i,r),a()})).catch((function(r){l(i,"Error happens: "+r),a()}))}};function l(r,t){r.statusCode=r.statusCode||200,r.setHeader("Content-Type","text/html; charset=UTF-8"),r.end(t)}export{f as reactSsr,d as renderHtml};