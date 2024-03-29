const filesToCache = [
    '/',
    'style.css',
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
    'images/6.jpg',
    'images/7.jpg'
]

const staticCacheName = 'pages-cache-v2'

self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets')
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache)
            })
    )
})

self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url)
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache')
                    return response
                }
                console.log('Network request for ', event.request.url)
                return fetch(event.request)
                // Add fetched files to the cache
            })
            .catch(error => {
                // Respond with custom offline page
            })
    )
})

self.addEventListener('activate', event => {
    console.log('Activating new service worker...')
    const cacheWhitelist = [staticCacheName]
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})