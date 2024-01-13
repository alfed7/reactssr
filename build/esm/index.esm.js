import{renderToString as r}from"react-dom/server";import{StaticRouter as t}from"react-router-dom/server";import{Routes as e}from"react-router-dom";import{renderRoutes as o}from"react-router-layout";import{HelmetProvider as n}from"react-helmet-async";import i from"serialize-javascript";import{RootContextProvider as c,createServerStore as a}from"react-reducer-ssr";import{jsx as u}from"react/jsx-runtime";import{matchRoutes as s}from"react-router";import f from"parseurl";import p from"fs";var m=function(a,s,f,p,m){var l={},d=u(t,{location:p.url,children:u(n,{context:l,children:u(c,{reducer:a,initialState:null==m?void 0:m.root,children:u(e,{children:o(f)})})})}),v=r(d),y="production"===process.env.NODE_ENV?'<script src="/static/js/service-worker.js" defer><\/script>':"",b=l.helmet,h=b&&b.title?b.title.toString():"",O=b&&b.meta?b.meta.toString():"";return s.replace('<div id="app"></div>','<div id="app">'.concat(v,"</div>\n      <script>\n        window.INITIAL_STATE = ").concat(i(m.root),"\n      <\/script>\n      ").concat(y)).replace("\x3c!-- META --\x3e","".concat(h,"\n      ").concat(O))};function l(r){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},l(r)}function d(r){var t=function(r,t){if("object"!==l(r)||null===r)return r;var e=r[Symbol.toPrimitive];if(void 0!==e){var o=e.call(r,t||"default");if("object"!==l(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(r)}(r,"string");return"symbol"===l(t)?t:String(t)}function v(r,t){var e=Object.keys(r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(r);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),e.push.apply(e,o)}return e}function y(r){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?v(Object(e),!0).forEach((function(t){var o,n,i;o=r,n=t,i=e[t],(n=d(n))in o?Object.defineProperty(o,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):o[n]=i})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(e)):v(Object(e)).forEach((function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(e,t))}))}return r}var b=function(r,t,e,o){return function(n,i,c){var u=f(n),l=u?u.search:"",d=u?u.pathname:"",v=y({},n.cookies),b=y({},n.cookies),O=o?{services:o(b)}:{},j=a(t,O,{}),S=p.readFileSync(r,"utf8"),w=s(e,d||"");if(!w)return i.statusCode=404,void c("Not found");var g=w.map((function(r){var t=r.route;return t.loadData?t.loadData(j.dispatch,b,l):null})).map((function(r){if(r)return new Promise((function(t){r.then(t).catch(t)}))}));Promise.all(g).then((function(){var r=m(t,S,e,n,j),o=function(r,t){var e={};for(var o in t)r[o]!==t[o]&&(e[o]=t[o]);return e}(v,b);for(var a in o)i.cookie(a,o[a]);h(i,r),c()})).catch((function(r){h(i,"Error happens: "+r),c()}))}};function h(r,t){r.statusCode=r.statusCode||200,r.setHeader("Content-Type","text/html; charset=UTF-8"),r.setHeader("X-Powered-By","react-ssr-web"),r.end(t)}export{b as reactSsr,m as renderHtml};
