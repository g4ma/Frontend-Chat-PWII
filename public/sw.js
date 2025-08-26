self.addEventListener('push', event => {
  const data = event.data?.json() || {};

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(windowClients => {
      
      for (const client of windowClients) {
        client.postMessage({
          type: "NEW_PUSH_DATA",
          payload: data
        });
      }

      // Verifica se alguma aba está focada
      const isFocused = windowClients.some(client => client.focused);

      if (!isFocused) {
        return self.registration.showNotification(data.title || "New message", {
          body: data.body || "You have a new chat message",
          icon: "/icon.png",
          data: data.url || "/"
        });
      }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(windowClients => {
      for (const client of windowClients) {
        // se já tiver uma aba com a URL, só foca nela
        if (client.url === event.notification.data && 'focus' in client) {
          return client.focus();
        }
      }
      // se não tiver nenhuma aberta, aí sim abre uma nova
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data);
      }
    })
  );
});