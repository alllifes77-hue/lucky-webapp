// Lucky Numbers PWA Service Worker
// v29: 타분야 상위기능 X9 — 다크모드(시스템연동·토글·localStorage)
const CACHE_NAME = 'lucky-v29';
const STATIC_ASSETS = [
  '/lucky/',
  '/lucky/index.html',
  '/lucky/luck-elements.js',
  '/lucky/lucky-app.js',
  '/lucky/lang/ko.js',
  '/lucky/lang/en.js',
  '/lucky/lang/ja.js',
  '/lucky/lang/de.js',
  '/lucky/lang/fr.js',
  '/lucky/lang/es.js',
  '/lucky/lang/pt.js',
  '/lucky/lang/it.js',
  '/lucky/lang/id.js',
  '/lucky/favicon-32x32.png',
  '/lucky/favicon-16x16.png',
  '/lucky/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c =>
      // 하나가 실패해도 나머지는 캐시되도록 개별 add (addAll 은 전체 롤백)
      Promise.allSettled(STATIC_ASSETS.map(u => c.add(u)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // 외부(CDN 등): network-first
  if (url.hostname !== location.hostname) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // HTML 문서(내비게이션): network-first — 배포 즉시 반영, 오프라인 시 캐시 폴백
  if (e.request.mode === 'navigate' || e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return response;
      }).catch(() => caches.match(e.request).then(c => c || caches.match('/lucky/')))
    );
    return;
  }

  // 정적 자산(js/css/png — 버전 쿼리로 무효화): cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return response;
      });
    })
  );
});
