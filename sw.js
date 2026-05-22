var CACHE_NAME = 'toolbox-pwa-v1';
var PRECACHE_URLS = [
    '/',
    '/index.html',
    '/about.html',
    '/search-index.json',
    '/assets/css/global.css',
    '/assets/js/theme.js',
    '/assets/js/libs.js',
    '/assets/js/record-tool.js',
    '/manifest.json'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(PRECACHE_URLS);
        }).then(function() {
            return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(name) {
                    return name !== CACHE_NAME;
                }).map(function(name) {
                    return caches.delete(name);
                })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.method !== 'GET') return;

    var url = new URL(event.request.url);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

    if (url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/')) {
        event.respondWith(networkFirst(event.request));
        return;
    }

    if (url.pathname.match(/\.(css|js|json|woff2?|ttf|eot|svg|png|jpg|jpeg|gif|ico|webp)$/)) {
        event.respondWith(cacheFirst(event.request));
        return;
    }

    event.respondWith(networkFirst(event.request));
});

function networkFirst(request) {
    return fetch(request).then(function(response) {
        if (response.ok) {
            var clone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
                cache.put(request, clone);
            });
        }
        return response;
    }).catch(function() {
        return caches.match(request).then(function(cached) {
            return cached || new Response('离线不可用', { status: 503, statusText: 'Offline' });
        });
    });
}

function cacheFirst(request) {
    return caches.match(request).then(function(cached) {
        if (cached) return cached;
        return fetch(request).then(function(response) {
            if (response.ok) {
                var clone = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(request, clone);
                });
            }
            return response;
        });
    });
}
