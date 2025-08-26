import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

import type { User } from "../../interfaces/User";

import { useOfflineQueue } from "../../hooks/useOfflineQueue";

import ChatWindow from "../../components/Chat/ChatWindow/ChatWindow";
import ContactList from "../../components/ContactList/ContactList";
import { useNavigate } from "react-router-dom";
import NewChatSelector from "../../components/NewChatSelector/NewChatSelector";

const socket: Socket = io("http://localhost:3000");
const PUBLIC_VAPID = "BE3CpnkxOYj-pAs3_jx8kpXR9KaGNWxRIFEawedp4rMyeOdxxrwbErES2H_fDvL9n_pXNSXLfPy-WOW6Memzckg"
  

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function ChatPage() {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(socket.connected);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedContact, setSelectedContact] = useState<User | null>(null);

  useOfflineQueue(socket);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      navigate("/", { replace: true });
    } else {
      setUserId(parseInt(storedUserId));
    }

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));
  }, [navigate]);

  useEffect(() => {
    async function subscribeToPushNotification(receiverId: number){
      if ("serviceWorker" in navigator){
        const registration = await navigator.serviceWorker.register('/sw.js')
        
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID)
        })

        await fetch("http://localhost:3000/notification/subscribe", {
          method: "POST",
          body: JSON.stringify({
            subscription,
            receiverId,
          }),
          headers: { "Content-Type": "application/json" },
        })
      }
    }

    if (userId !== null){
      subscribeToPushNotification(userId);
    }
  }, [userId])
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data?.type === "NEW_PUSH_DATA") {
          const msg = event.data.payload;
          setSelectedContact({ name: "", username: "", password: "", id: msg.chatId });
        }
      });
  
      navigator.serviceWorker.ready.then(reg => {
        if (reg.active) {
          reg.active.postMessage({ type: "REQUEST_NOTIFICATION_DATA" });
        }
      });
    }
  }, []);

  Notification.requestPermission().then((result) => {
    console.log(result);
  });

  return (
    <>
      {userId === null ? (
        <div>loading</div>
      ) : (
        <div style={{ display: "flex" }}>
          <div style={{ width: "200px" }}>
            <h3>{connected ? "Online" : "Offline"}</h3>
            <ContactList
              currentUserId={userId}
              selectContact={setSelectedContact}
            />
            <NewChatSelector
              currentUserId={userId}
              onSelect={setSelectedContact}
            />
          </div>
          <div style={{ flex: 1 }}>
            {selectedContact && (
              <ChatWindow
                socket={socket}
                currentUserId={userId}
                contactId={selectedContact.id}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
