const CACHE = "agri-advisor-v1"
const STATIC_ASSETS = [
  "/",
  "/dashboard",
  "/scan",
  "/weather",
  "/market",
  "/settings",
  "/login",
  "/history",
  "/manifest.json",
  "/icons/icon-192.svg",
  "/icons/icon-512.svg",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  )
})

self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET and Supabase API calls
  if (request.method !== "GET" || url.hostname.includes("supabase")) return

  // Static assets with hash in name or common image/font extensions
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/models/") ||
    url.pathname.match(/\.(js|css|woff2?|png|svg|ico|json|bin)$/)
  ) {
    event.respondWith(
      caches.open(CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const fetchAndCache = fetch(request).then((res) => {
            if (res.ok) cache.put(request, res.clone())
            return res
          })
          return cached || fetchAndCache
        })
      )
    )
    return
  }

  // HTML pages – network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) {
          const clone = res.clone()
          caches.open(CACHE).then((cache) => cache.put(request, clone))
        }
        return res
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("/")))
  )
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  )
})
