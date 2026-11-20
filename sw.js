// مشغل الخلفية لتثبيت التطبيق (PWA Service Worker)
const CACHE_NAME = 'mansa-prep-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // تمرير الطلبات بشكل طبيعي للإنترنت
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
