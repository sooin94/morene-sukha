
self.addEventListener('push', (event) => {
  let data = {};

  try {
    data = event.data?.json() || {};
  } catch {
    data = { body: event.data?.text() || '' };
  }

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'Morene Sukha',
      {
        body: data.body || '새로운 주문이 들어왔습니다!',
        icon: '/icon-192.png',
        data: {
          url: data.url || '/admin/orders'
        }
      }
    )
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const target = new URL(
    event.notification.data?.url || '/admin/orders',
    self.location.origin
  );

  if (target.origin !== self.location.origin) return;

  event.waitUntil(
    clients.openWindow(target.href)
  );
});
