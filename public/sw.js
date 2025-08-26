self.addEventListener('push', event => {
  console.log(event)
  const data = event.data?.json() || {};
  event.waitUntil(
    self.registration.showNotification(data.title || "New message", {
      body: data.body || "You have a new chat message",
      icon: "/icon.png",
      data: data.url || "/"
    })
  );
});
  
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data)
  );
});