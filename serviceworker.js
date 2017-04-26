var CACHE_NAME = 'gih-cache-v5';
var CACHED_URLS = [
  // Our HTML
  'index.html',
  'staffs-uni.html',
  'sign-up.html',
  'dino.png',
  'mystyles.css',
  'styles.css',
  'offline.html',
  'images/favicon/android-icon-36x36.png',
  'images/favicon/android-icon-48x48.png',
  'images/favicon/android-icon-72x72.png',
  'images/favicon/android-icon-96x96.png',
  'images/favicon/android-icon-144x144.png',
  'images/favicon/android-icon-192x192.png',
  'images/favicon/favicon-16x16.png',
  'images/favicon/favicon-32x32.png',
  'images/favicon/favicon-96x96.png',
  'images/favicon/ic_launcher-1x.png',
  'images/favicon/ic_launcher-2x.png',
  'images/favicon/ic_launcher-3x.png',
  'images/favicon/ic_launcher-4x.png',
  'images/favicon/ic_launcher-5x.png',
  'images/favicon/manifest.json',
  'images/activities-image.jpg',
  'images/banner.jpg',
  'images/clubs-image.jpg',
  'images/main-image.jpg',
  'images/party-image.jpg',
  'images/pic01.jpg',
  'images/pic02.jpg',
  'images/pic03.jpg',
  'images/pic04.jpg',
  'images/pic05.jpg',
  'images/pic06.jpg',
  'images/pic07.jpg',
  'images/pic08.jpg',
  'images/pic09.jpg',
  'images/pic10.jpg',
  'images/study-image.jpg',
  'images/universityImage-1x.jpg',
  'images/universityImage-2x.jpg',
  'images/universityImage-3x.jpg',
  'assets/css/images/overlay.png',
  'assets/css/images/shadow.png',
  'assets/css/font-awesome.min.css',
  'assets/css/ie8.css',
  'assets/css/main.css',
  'assets/css/normalize.css',
  'assets/fonts/FontAwesome.otf',
  'assets/fonts/fontawesome-webfont.eot',
  'assets/fonts/fontawesome-webfont.svg',
  'assets/fonts/fontawesome-webfont.ttf',
  'assets/fonts/fontawesome-webfont.woff',
  'assets/fonts/fontawesome-webfont.woff2',
  'assets/js/gen_validatorv31.js',
  'assets/js/jquery.dropotron.min.js',
  'assets/js/jquery.min.js',
  'assets/js/main.js',
  'assets/js/modernizr.js',
  'assets/js/skel.min.js',
  'assets/js/skel-viewport.min.js',
  'assets/js/util.js',
  'assets/js/ie/backgroundsize.min.htc',
  'assets/js/ie/html5shiv.js',
  'assets/js/ie/PIE.htc',
  'assets/js/ie/respond.min.js',
  'assets/sass/libs/_functions.scss',
  'assets/sass/libs/_mixins.scss',
  'assets/sass/libs/_skel.scss',
  'assets/sass/libs/_vars.scss',
  'assets/sass/ie8.scss',
  'assets/sass/main.scss',
  'assets/browserconfig.xml'
  
  // Stylesheets and fonts
  // JavaScript
  // Images
];

self.addEventListener('install', function(event) {
  // Cache everything in CACHED_URLS. Installation will fail if something fails to cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  var requestURL = new URL(event.request.url);
  if (requestURL.pathname === 'first.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match('first.html').then(function(cachedResponse) {
          var fetchPromise = fetch('first.html').then(function(networkResponse) {
            cache.put('first.html', networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      })
    );
  }
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache-v5') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});