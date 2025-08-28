import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import { cacheMessages, getCachedMessages } from "../../../utils/storage";
import type { Message } from "../../../interfaces/Message";

import { MainDiv, MessageBubble, MessagesArea } from "./ChatWindow.style";
import MessageInput from "../MessageInput/MessageInput";
// import type { User } from "../../../interfaces/User";

interface ChatWindowProps {
  socket: Socket;
  currentUserId: number;
  contactId: number;
  connected: boolean;
  // setContacts: (user: User[]) => void;
}

export default function ChatWindow({
  connected,
  socket,
  currentUserId,
  contactId,
}: // setContacts,
ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(
    getCachedMessages(contactId)
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesAreaRef = useRef<HTMLDivElement>(null);

  // Formata a data para exibição
  function formatDate(fullDate: Date | string) {
    if (!fullDate) return "";

    const date = new Date(fullDate);
    const formattedDate = `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`;

    return formattedDate;
  }

  // Buscar histórico de mensagens ao montar o componente ou mudar de contato
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let data: Message[];
        if (connected) {
          const response = await fetch(
            `http://localhost:3000/messages/history/${currentUserId}/${contactId}`
          );

          if (!response.ok) {
            throw new Error(`Erro ao buscar mensagens: ${response.status}`);
          }
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

  // Receber mensagens em tempo real
  useEffect(() => {
    const handleReceive = async (message: Message) => {
      if (
        (message.senderId === contactId &&
          message.receiverId === currentUserId) ||
        (message.senderId === currentUserId && message.receiverId === contactId)
      ) {
        console.log(message);
        setMessages((prev) => {
          const updated = [...prev, message];
          cacheMessages(contactId, updated);
          // cacheMessages(updated);
          return updated;
        });
      }

      // const newContactId: number =
      //   message.senderId === currentUserId
      //     ? message.receiverId
      //     : message.senderId;

      // try {
      //   const response = await fetch(
      //     `http://localhost:3000/users/newchat/${currentUserId}`,
      //     {
      //       method: "GET",
      //       headers: { "Content-Type": "application/json" },
      //     }
      //   );
      //   if (!response.ok) throw new Error("Erro ao buscar usuários");
      //   const allUsers: User[] = await response.json();

      //   const user = allUsers.find((u) => u.id === newContactId);
      //   if (user) {
      //     setContacts((prev: User[]) => {
      //       if (prev) {
      //         return [...prev, user];
      //       }
      //       return [user];
      //     });
      //   }
      // } catch (err) {
      //   console.error(err);
      // }
    };

    socket.on("receiveMessage", handleReceive);

    return () => {
      socket.off("receiveMessage", handleReceive);
    };
  }, [socket, currentUserId, contactId]);

  // Scrollar mensagens para a mais recente quando uma nova chegar
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
      />
    </MainDiv>
  );
}
