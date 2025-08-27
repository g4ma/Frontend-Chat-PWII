// src/utils/pwa.ts
export async function registerPWA() {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register('/sw.js')
    console.log('SW registered:', registration)

    // Solicitar permissão de notificações
    if (Notification.permission !== 'granted') {
      await Notification.requestPermission()
    }

    // Receber mensagens do SW
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data?.type === 'NEW_PUSH_DATA') {
        console.log('Nova notificação recebida:', event.data.payload)
      }
    })
  }
}
