import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";

import { MessageInput } from "../MessageInput/MessageInput";
import { cacheMessages, getCachedMessages } from "../../../utils/storage";
import type { Message } from "../../../interfaces/Message";
import { MainDiv, MessageBubble, MessagesArea } from "./ChatWindow.style";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesAreaRef = useRef<HTMLDivElement>(null);

  // Pega histórico de mensagens ao mudar de contato
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/messages/history/${currentUserId}/${contactId}`
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar mensagens: ${response.status}`);
        }

        const data: Message[] = await response.json();

        setMessages(data);
        cacheMessages(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [currentUserId, contactId]);

  // Recebe novas mensagens via socket
  useEffect(() => {
    const handleReceive = (message: Message) => {
      if (
        (message.senderId === contactId &&
          message.receiverId === currentUserId) ||
        (message.senderId === currentUserId &&
          message.receiverId === contactId)
      ) {
        setMessages((prev) => {
          const updated = [...prev, message];
          cacheMessages(updated);
          return updated;
        });
      }
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [socket, currentUserId, contactId]);

  // Scroll automático
  useEffect(() => {
    const messagesArea = messagesAreaRef.current;
    if (!messagesArea || !messagesEndRef.current) return;

    // Verifica se está quase no final
    const nearBottom =
      messagesArea.scrollHeight - messagesArea.scrollTop - messagesArea.clientHeight <
      50;

    if (nearBottom) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <MainDiv>
      <MessagesArea ref={messagesAreaRef}>
        {messages.map((m, i) => (
          <MessageBubble key={i} isSent={m.senderId === currentUserId}>
            {m.text}
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </MessagesArea>

      <MessageInput
        socket={socket}
        senderId={currentUserId}
        receiverId={contactId}
      />
    </MainDiv>
  );
}
