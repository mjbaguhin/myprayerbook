/* My Prayerbook — offline service worker.
   Everything is precached on install, so the app opens with no signal at all. */

const CACHE = "prayerbook-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      if (hit) {
        // Refresh in the background when there happens to be a signal.
        fetch(req).then(res => {
          if (res && res.ok && new URL(req.url).origin === location.origin) {
            caches.open(CACHE).then(c => c.put(req, res.clone()));
          }
        }).catch(() => {});
        return hit;
      }
      return fetch(req).catch(() => caches.match("./index.html"));
    })
  );
});
