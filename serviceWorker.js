self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('mi-cache').then((cache) => {
        return cache.addAll([
          '/styles.css',
          '/script.js',
          '/switch.js',
          '/favicon.png'
        ]);
      })
    );
  });


  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== 'mi-cache') {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  