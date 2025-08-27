let lastNotificationData = null;

self.addEventListener('push', event => {
  const data = event.data?.json() || {};

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(windowClients => {
      const isFocused = windowClients.some(client => client.focused);

      if (!isFocused) {
        lastNotificationData = data;
        
        return self.registration.showNotification(data.title || "New message", {
          body: data.body || "You have a new chat message",
          icon: "/icon.png",
          data
        });
      }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const notificationData = event.notification.data;
  lastNotificationData = notificationData;

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        if (client.url === notificationData.url && 'focus' in client) {
          client.postMessage({
            type: "NEW_PUSH_DATA",
            payload: notificationData
          });
          lastNotificationData = null;
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(notificationData.url);
      }
    })
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "REQUEST_NOTIFICATION_DATA") {
    if (lastNotificationData) {
      event.source.postMessage({
        type: "NEW_PUSH_DATA",
        payload: lastNotificationData
      });
      lastNotificationData = null;
    }
  }
});
