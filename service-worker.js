!function(){"use strict";const e=["client/client.d645a20e.js","client/about.f11589b3.js","client/index.a9e5b020.js","client/[slug].7e01ccaf.js","client/index.efd3f81c.js","client/client.18abc3e0.js"].concat(["service-worker-index.html","android-chrome-192x192.png","android-chrome-512x512.png","apple-touch-icon.png","browserconfig.xml","favicon-16x16.png","favicon-32x32.png","favicon.ico","global.css","img/article-default-1200x630.jpg","img/article-default-500x309.jpg","img/chouette--s.jpg","img/chouette--s.png","img/chouette-logo--s.jpg","img/chouette-logo--s.png","img/chouette-logo-1200x630.png","img/chouette-logo.jpg","img/chouette-logo.png","img/chouette-logo.svg","img/chouette.jpg","img/chouette.png","img/chouette.svg","img/default-profile-pic--s.png","img/default-profile-pic.png","img/wing.png","img/wing.svg","logo.png","logo.svg","manifest.json","mstile-150x150.png","safari-pinned-tab.svg","site.webmanifest"]),t=new Set(e);self.addEventListener("install",t=>{t.waitUntil(caches.open("cache1585485765169").then(t=>t.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const t of e)"cache1585485765169"!==t&&await caches.delete(t);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const n=new URL(e.request.url);n.protocol.startsWith("http")&&(n.hostname===self.location.hostname&&n.port!==self.location.port||(n.host===self.location.host&&t.has(n.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1585485765169").then(async t=>{try{const n=await fetch(e.request);return t.put(e.request,n.clone()),n}catch(n){const c=await t.match(e.request);if(c)return c;throw n}}))))})}();
