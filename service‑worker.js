const CACHE_NAME = "zhu-wo-cache-v2";
const assets = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png"
];

self.addEventListener("install", event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(assets)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      )
    })
  )
});

self.addEventListener("fetch", event => {
    event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)));
});
