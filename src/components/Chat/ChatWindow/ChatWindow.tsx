import { useEffect } from "react";
import { useMessages } from "../../../context/UseMessageContext";
import { MessageInput } from "../MessageInput/MissageInput";
import type { Message } from "../../../interfaces/Message";
import type { Socket } from "socket.io-client";
import { cacheMessages, getCachedMessages } from "../../../utils/storage";

interface ChatWindowProps {
  socket: Socket;
  currentUserId: number;
  contactId: number;
}

export default function ChatWindow({
  socket,
  currentUserId,
  contactId,
}: ChatWindowProps) {
  const { messages, addMessage } = useMessages();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/messages/history/${currentUserId}/${contactId}`
        );
        const data: Message[] = await res.json();

        data.forEach(addMessage);

        cacheMessages(data);
      } catch (err) {
        console.warn("Falha ao buscar mensagens. Carregando do cache...");
        const cached = getCachedMessages();
        cached.forEach(addMessage);
      }
    };

    fetchMessages();
  }, [currentUserId, contactId, addMessage]);

  const chatMessages = messages.filter(
    (m) =>
      (m.senderId === currentUserId && m.receiverId === contactId) ||
      (m.senderId === contactId && m.receiverId === currentUserId)
  );

  return (
    <div>
      <div>
        {chatMessages.map((m, i) => (
          <p key={i}>
            {m.senderId === currentUserId ? "eu: " : "você: "} {m.text}
          </p>
        ))}
      </div>

      <MessageInput
        socket={socket}
        senderId={currentUserId}
        receiverId={contactId}
        onSendMessage={addMessage}
      />
    </div>
  );
}
