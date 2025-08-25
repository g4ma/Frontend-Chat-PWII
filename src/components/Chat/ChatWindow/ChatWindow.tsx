import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { MessageInput } from "../MessageInput/MissageInput";
import { cacheMessages, getCachedMessages } from "../../../utils/storage";
import type { Message } from "../../../interfaces/Message";

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
  const [messages, setMessages] = useState<Message[]>(getCachedMessages());

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/messages/history/${currentUserId}/${contactId}`
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar mensagens: ${response.status}`);
        }

        const data = await response.json();

        setMessages(data);
        cacheMessages(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [currentUserId, contactId]);

  useEffect(() => {
    function handleReceive(message: Message) {
      if (
        (message.senderId === contactId &&
          message.receiverId === currentUserId) ||
        (message.senderId === currentUserId && message.receiverId === contactId)
      ) {
        setMessages((prev) => {
          const updated = [...prev, message];
          cacheMessages(updated);
          return updated;
        });
      }
    }

    socket.on("receiveMessage", handleReceive);
    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [socket, currentUserId, contactId]);

  return (
    <div>
      <div>
        {messages.map((m, i) => (
          <p key={i}>
            {m.senderId === currentUserId ? "eu: " : "você: "}
            {m.text}
          </p>
        ))}
      </div>

      <MessageInput
        socket={socket}
        senderId={currentUserId}
        receiverId={contactId}
      />
    </div>
  );
}
