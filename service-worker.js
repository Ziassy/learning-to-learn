const CACHE_NAME = 'letle v-35';
const urlsToCache = [
    '/',
    '/nav.html',
    '/index.html',
    '/manifest.json',
    '/icons/icon.png',
    '/icons/icon2.png',
    '/icons/icon3.png',
    '/icons/icon4.png',
    '/icons/icon5.png',
    '/pages/home.html',
    '/pages/about.html',
    '/pages/artikel.html',
    '/pages/challenge.html',
    '/pages/learn.html',
    '/image/1.jpg',
    '/image/2.jpg',
    '/image/4.jpg',
    '/image/java.jpg',
    '/image/ziah.jpg',
    '/image/js.jpg',
    '/image/reading.jpg',
    '/image/listening.jpg',
    '/image/grammar.jpg',
    '/image/AR.png',
    '/image/firebas.png',
    '/image/idcamp.png',
    '/image/php.png',
    '/image/python.png',
    '/image/logo.png',
    '/image/data.png',
    '/css/materialize.min.css',
    '/css/style.css',
    '/js/materialize.min.js',
    '/js/script.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName != CACHE_NAME) {
                            console.log("ServiceWorker: cache " + cacheName + " dihapus");
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, { cacheName: CACHE_NAME })
            .then(response => {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
                return fetch(event.request);
            })
    );
});

