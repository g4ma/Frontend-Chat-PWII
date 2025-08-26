import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

import type { User } from "../../interfaces/User";

import { useOfflineQueue } from "../../hooks/useOfflineQueue";

import ChatWindow from "../../components/Chat/ChatWindow/ChatWindow";
import ContactList from "../../components/ContactList/ContactList";
import { useNavigate } from "react-router-dom";
import NewChatSelector from "../../components/NewChatSelector/NewChatSelector";
import { ChatArea, ChatDisplay, ChatSidebar, Logo } from "../../components";
import { StatusTitle } from "./ChatPage.style";

const socket: Socket = io("http://localhost:3000");

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

  return (
    <>
      {userId === null ? (
        <div>loading</div>
      ) : (
        <ChatDisplay>
          <ChatSidebar>
            <StatusTitle>{connected ? "Online" : "Offline"}</StatusTitle>
            <NewChatSelector
              currentUserId={userId}
              onSelect={setSelectedContact}
            />
            <ContactList
              currentUserId={userId}
              selectContact={setSelectedContact}
            />
          </ChatSidebar>
          <ChatArea>
            {selectedContact ? (
              <ChatWindow
                socket={socket}
                currentUserId={userId}
                contactId={selectedContact.id}
              />
            ) : (
              <Logo fontSize="3rem" iconSize="75" />
            )}
          </ChatArea>

        </ChatDisplay>
      )}
    </>
  );
}
