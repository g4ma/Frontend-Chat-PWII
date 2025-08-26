import { useEffect, useState } from "react";
import { saveOfflineMessage } from "../../../utils/storage";
import { Socket } from "socket.io-client";
import Arrow from "../../../assets/arrow";
import { InputDiv, SendButton, TextInput } from "./MessageInput.style";

interface Props {
  socket: Socket | null;
  senderId: number;
  receiverId: number;
}

export function MessageInput({ socket, senderId, receiverId }: Props) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", { userId: senderId, contactId: receiverId });
    }
  }, [socket, senderId, receiverId]);

  function sendMessage() {

    if (!text.trim()) return; // evita enviar mensagem vazia

    const message = { senderId, receiverId, text, createdAt: new Date() };

    if (navigator.onLine && socket) {
      socket.emit("sendMessage", message);
    } else {
      saveOfflineMessage(message);
    }

    setText("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}


  return (
    <InputDiv>
      <TextInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite uma mensagem..."
        onKeyDown={handleKeyDown}
      />
      <SendButton onClick={sendMessage}>
        <Arrow size="20" color="#1F1F1F" />
      </SendButton>
    </InputDiv>
  );
}
