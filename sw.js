if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let c={};const t=e=>i(e,r),a={module:{uri:r},exports:c,require:t};s[r]=Promise.all(n.map((e=>a[e]||t(e)))).then((e=>(o(...e),c)))}}define(["./workbox-4de3aa5f"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-223fd923.js",revision:null},{url:"assets/index-6b6a88b0.css",revision:null},{url:"assets/workbox-window.prod.es5-a7b12eab.js",revision:null},{url:"index.html",revision:"5093e5e2d620af93bb78358d8a6ec487"},{url:"favicon.ico",revision:"dc6c9cc5ad30c7b59e9a9db5375f4588"},{url:"favicon.svg",revision:"cb05f7d332add1fa7980137e376726cb"},{url:"icons/manifest-icon-192.maskable.png",revision:"c3e0a67260296fcb092abdfaa9bdcd2b"},{url:"icons/manifest-icon-512.maskable.png",revision:"5a093fcd0bdf323a18844cee873d2407"},{url:"manifest.webmanifest",revision:"2c10a9799b8722e25a03ebb024cc5e87"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
