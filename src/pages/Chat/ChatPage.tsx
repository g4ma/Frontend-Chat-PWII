import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import type { User } from "../../interfaces/User";
import { useOfflineQueue } from "../../hooks/useOfflineQueue";
import { useNavigate } from "react-router-dom";

import { ChatAreaDisplay, ChatDisplay, ChatSidebarArea, ChatWindow, ContactList, Logo, NewChatSelector, StatusDisplay } from "../../components";
import { ContactListWrapper, StatusTitle } from "./ChatPage.style";
import SmallDot from "../../assets/smalldot";


const socket: Socket = io("http://localhost:3000");


export default function ChatPage() {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(socket.connected);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedContact, setSelectedContact] = useState<User | null>(null);
  const [showNewChat, setShowNewChat] = useState(false);

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
          <ChatSidebarArea>
            <StatusDisplay>
              {connected ? (
                <>
                  <StatusTitle>
                    Online
                  </StatusTitle>
                  <SmallDot size="13" color="#4caf50" />
                </>
              ) : (
                <>
                  <StatusTitle>
                    Offline
                  </StatusTitle>
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
                currentUserId={userId}
                selectContact={setSelectedContact}
              />
            </ContactListWrapper>
          </ChatSidebarArea>
          <ChatAreaDisplay>
            {selectedContact ? (
              <ChatWindow
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
