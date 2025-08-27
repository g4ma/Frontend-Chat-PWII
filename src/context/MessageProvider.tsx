import { useState, useEffect, type ReactNode } from "react";
import type { Message } from "../interfaces/Message";
import { MessageContext } from "./MessageContext";
import type { Socket } from "socket.io-client";
import { cacheMessages, getCachedMessages } from "../utils/storage";

export function MessageProvider({
  children,
  socket,
}: {
  children: ReactNode;
  socket: Socket;
}) {
  const [messages, setMessages] = useState<Message[]>(() =>
    getCachedMessages()
  );

  const addMessage = (msg: Message) => {
    const exists = messages.some(
      (m) =>
        m.senderId === msg.senderId &&
        m.receiverId === msg.receiverId &&
        m.text === msg.text &&
        new Date(m.createdAt ?? 0).getTime() ===
          new Date(msg.createdAt ?? 0).getTime()
    );
    if (exists) return;

    const updated = [...messages, msg];
    setMessages(updated);
    cacheMessages(updated);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", addMessage);

    return () => {
      socket.off("receiveMessage", addMessage);
    };
  }, [socket, messages]);

  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
}
