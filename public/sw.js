/* 소울코드 서비스워커: 오프라인에서도 앱 화면과 사주 계산이 동작하도록 정적 파일을 캐시해요. */
const CACHE = 'soulcode-v4';
const CORE = ['/', '/soulcode/app.js', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin || url.pathname.startsWith('/api/') || url.pathname.startsWith('/payments/')) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then((res) => { caches.open(CACHE).then((c) => c.put('/', res.clone())); return res; }).catch(() => caches.match('/')));
    return;
  }
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => { if (res.ok) caches.open(CACHE).then((c) => c.put(req, res.clone())); return res; }).catch(() => hit);
      return hit || net;
    })
  );
});

/* 아침 알림: 서버는 본문 없이 깨우기만 하고, 문구는 여기서 골라요. */
const MORNING = [
  ['오늘의 카드가 리필됐어요 🌙', '우주가 오늘 너한테 할 말이 있대. 한 장 뽑아볼까?'],
  ['좋은 아침 ☀️ 오늘 우주 날씨 확인!', '오늘 일진이랑 카드 한 장이면 하루 준비 끝'],
  ['오늘 뭐 됨? 🔮', '10초면 돼요. 오늘의 카드 뽑으러 가기'],
  ['출석 체크 시간 🔥', '연속 출석 이어가고 오늘의 럭키템도 확인해요'],
];
self.addEventListener('push', (e) => {
  const fallback = () => { const [title, body] = MORNING[new Date().getDate() % MORNING.length]; return { title, body, url: '/?from=push', tag: 'soulcode-daily' }; };
  e.waitUntil(
    self.registration.pushManager.getSubscription()
      .then((sub) => sub ? fetch('/api/push/pull', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ endpoint: sub.endpoint }) }).then((r) => r.json()) : fallback())
      .catch(fallback)
      .then((m) => self.registration.showNotification(m.title, { body: m.body, icon: '/icons/icon-192.png', badge: '/icons/icon-192.png', tag: m.tag || 'soulcode-daily', data: { url: m.url || '/' } }))
  );
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((ws) => {
    const w = ws.find((c) => new URL(c.url).origin === location.origin);
    if (w) { w.focus(); return w.navigate ? w.navigate(url) : null; }
    return self.clients.openWindow(url);
  }));
});
