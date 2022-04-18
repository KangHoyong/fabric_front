const CACHE_NAME = 'static-cache-v1';

const FILES_TO_CACHE = [
    '/',
    './index.html',
    './model1.html',
    './model2.html',
    './model3.html',
    './model4.html',
    './js/scripts.js',
    './css/styles.css',
    './assets/favicon.ico',
    './assets/favicon1.ico',
    './assets/touch-icon-ipad-retina.png',
    './assets/touch-icon-ipad.png',
    './assets/touch-icon-iphone-retina.png',
    './assets/touch-icon-iphone.png',
    './assets/touch-icon-iphone32.png'
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if(key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(evt.request)
            .then((response) => {
                return response || fetch(evt.request);
            });
        })
    );
});