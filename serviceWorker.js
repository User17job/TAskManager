// self.addEventListener('install', (event) => {
//     event.waitUntil(
//       caches.open('mi-cache').then((cache) => {
//         return cache.addAll([
//           '/styles.css',
//           '/script.js',
//           '/switch.js',
//           '/favicon.png'
//         ]);
//       })
//     );
//   });


//   self.addEventListener('activate', (event) => {
//     event.waitUntil(
//       caches.keys().then((cacheNames) => {
//         return Promise.all(
//           cacheNames.map((cacheName) => {
//             if (cacheName !== 'mi-cache') {
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       })
//     );
//   });

//   self.addEventListener('fetch', (event) => {
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return response || fetch(event.request);
//       })
//     );
//   });
  
// serviceWorker.js

const CACHE_NAME = 'task-app-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/switch.js',
  '/favicon.png'
  // Incluye aquí todos los recursos que deseas cachear
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return the response from the cache
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
