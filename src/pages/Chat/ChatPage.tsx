import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import type { User } from "../../interfaces/User";
import { useOfflineQueue } from "../../hooks/useOfflineQueue";
import { useNavigate } from "react-router-dom";

import {
  ChatAreaDisplay,
  ChatDisplay,
  ChatSidebarArea,
  ChatWindow,
  ContactList,
  Logo,
  NewChatSelector,
  StatusDisplay,
} from "../../components";
import { ContactListWrapper, StatusTitle } from "./ChatPage.style";
import SmallDot from "../../assets/smalldot";
import Logout from "../../components/Sidebar/Logout/Logout";

const socket: Socket = io("http://localhost:3000");
const PUBLIC_VAPID =
  "BE3CpnkxOYj-pAs3_jx8kpXR9KaGNWxRIFEawedp4rMyeOdxxrwbErES2H_fDvL9n_pXNSXLfPy-WOW6Memzckg";

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

async function subscribeToPushNotification(receiverId: number) {
  const subscriptionLS = localStorage.getItem("subscription");

  if ("serviceWorker" in navigator && !subscriptionLS) {
    const registration = await navigator.serviceWorker.register("/sw.js");

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID),
    });

    localStorage.setItem("subscription", JSON.stringify(subscription));

    await fetch("http://localhost:3000/notification/subscribe", {
      method: "POST",
      body: JSON.stringify({
        subscription,
        receiverId,
      }),
      headers: { "Content-Type": "application/json" },
    });
  }
}

export default function ChatPage() {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(navigator.onLine);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedContact, setSelectedContact] = useState<User | null>(null);
  const [showNewChat, setShowNewChat] = useState(false);

  useOfflineQueue(connected, socket);

  useEffect(() => {
    function connect() {
      setConnected(true);
    }

    function desconnect() {
      setConnected(false);
    }

    window.addEventListener("online", connect);
    window.addEventListener("offline", desconnect);

    return () => {
      window.removeEventListener("online", connect);
      window.removeEventListener("offline", desconnect);
    };
  }, []);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      navigate("/", { replace: true });
    } else {
      setUserId(parseInt(storedUserId));
    }
  }, [navigate]);

  useEffect(() => {
    if (userId !== null) {
      subscribeToPushNotification(userId);
    }
  }, [userId]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data?.type === "NEW_PUSH_DATA") {
          const msg = event.data.payload;
          setSelectedContact({
            name: "",
            username: "",
            password: "",
            id: msg.chatId,
          });
        }
      });

      navigator.serviceWorker.ready.then((reg) => {
        if (reg.active) {
          reg.active.postMessage({ type: "REQUEST_NOTIFICATION_DATA" });
        }
      });
    }
  }, []);

  Notification.requestPermission();

  return (
    <>
      {userId === null ? (
        <div>loading</div>
      ) : (
        <ChatDisplay>
          <title>Conversas - Chatbot UI</title>
          <ChatSidebarArea>
            <StatusDisplay>
              {connected ? (
                <>
                  <StatusTitle>Online</StatusTitle>
                  <SmallDot size="13" color="#4caf50" />
                </>
              ) : (
                <>
                  <StatusTitle>Offline</StatusTitle>
                  <SmallDot size="13" color="#918f8fff" />
                </>
              )}
            </StatusDisplay>
            <NewChatSelector
              currentUserId={userId}
              onSelect={setSelectedContact}
              onToggleOpen={setShowNewChat}
            />
            <ContactListWrapper $hidden={showNewChat}>
              <ContactList
                connected={connected}
                currentUserId={userId}
                selectContact={setSelectedContact}
                selectedContactId={selectedContact?.id ?? null}
              />
            </ContactListWrapper>
            <Logout />
          </ChatSidebarArea>
          <ChatAreaDisplay>
            {selectedContact ? (
              <ChatWindow
                connected={connected}
                socket={socket}
                currentUserId={userId}
                contactId={selectedContact.id}
              />
            ) : (
              <Logo fontSize="2rem" iconSize="50" />
            )}
          </ChatAreaDisplay>
        </ChatDisplay>
      )}
    </>
  );
}
