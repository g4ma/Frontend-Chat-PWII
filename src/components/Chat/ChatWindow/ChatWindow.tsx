import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import { cacheMessages, getCachedMessages } from "../../../utils/storage";
import type { Message } from "../../../interfaces/Message";

import { MainDiv, MessageBubble, MessagesArea } from "./ChatWindow.style";
import MessageInput from "../MessageInput/MessageInput";

interface ChatWindowProps {
  socket: Socket;
  currentUserId: number;
  contactId: number;
  connected: boolean;
  refreshContacts: () => void;
}

export default function ChatWindow({
  connected,
  socket,
  currentUserId,
  contactId,
  refreshContacts,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(
    getCachedMessages(contactId)
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesAreaRef = useRef<HTMLDivElement>(null);

  function formatDate(fullDate: Date | string) {
    if (!fullDate) return "";
    const date = new Date(fullDate);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`;
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let data: Message[];
        if (connected) {
          const response = await fetch(
            `http://localhost:3000/messages/history/${currentUserId}/${contactId}`
          );
          if (!response.ok) throw new Error(`Erro ao buscar mensagens`);
          data = await response.json();
        } else {
          data = getCachedMessages(contactId);
        }
        setMessages(data);
        cacheMessages(contactId, data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [currentUserId, contactId, connected]);

  useEffect(() => {
    const handleReceive = (message: Message) => {
      if (
        (message.senderId === contactId &&
          message.receiverId === currentUserId) ||
        (message.senderId === currentUserId && message.receiverId === contactId)
      ) {
        setMessages((prev) => {
          const updated = [...prev, message];
          cacheMessages(contactId, updated);
          return updated;
        });
      }
    };

    socket.on("receiveMessage", handleReceive);
    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [socket, currentUserId, contactId]);

  useEffect(() => {
    const messagesArea = messagesAreaRef.current;
    if (!messagesArea) return;
    messagesArea.scrollTop = 0;
  }, [messages]);

  return (
    <MainDiv>
      <MessagesArea ref={messagesAreaRef}>
        {[...messages].reverse().map((m, i) => (
          <MessageBubble key={i} $isSent={m.senderId === currentUserId}>
            <p>{m.text}</p>
            <span>{formatDate(m.createdAt ?? new Date())}</span>
          </MessageBubble>
        ))}
        <div ref={messagesEndRef} />
      </MessagesArea>

      <MessageInput
        socket={socket}
        senderId={currentUserId}
        receiverId={contactId}
        onSendMessage={refreshContacts}
      />
    </MainDiv>
  );
}
