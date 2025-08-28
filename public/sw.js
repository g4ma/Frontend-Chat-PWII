let lastNotificationData = null;

// Push notifications
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        const isFocused = windowClients.some((client) => client.focused);

        if (!isFocused) {
          lastNotificationData = data;

          return self.registration.showNotification(
            data.title || "New message",
            {
              body: data.body || "You have a new chat message",
              icon: "/icon-192x192.png",
              data,
            }
          );
        }
      })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const notificationData = event.notification.data;
  lastNotificationData = notificationData;

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (client.url === notificationData.url && "focus" in client) {
            client.postMessage({
              type: "NEW_PUSH_DATA",
              payload: notificationData,
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

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "REQUEST_NOTIFICATION_DATA") {
    if (lastNotificationData) {
      event.source.postMessage({
        type: "NEW_PUSH_DATA",
        payload: lastNotificationData,
      });
      lastNotificationData = null;
    }
  }
});

// Cache offline de arquivos estáticos
self.addEventListener("install", (event) => {
  const filesToCache = [
    "/",
    "/index.html",
    "/app.css",
    "/vite.svg",
    "/icon-192x192.png",
    "/icon-512x512.png",
  ];

  event.waitUntil(
    caches.open("static-cache-v1").then((cache) => {
      const absoluteURLs = filesToCache.map((path) =>
        new URL(path, self.registration.scope).toString()
      );
      return cache.addAll(absoluteURLs);
    })
  );
});

// Limpar caches antigos
self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["static-cache-v1"];
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
