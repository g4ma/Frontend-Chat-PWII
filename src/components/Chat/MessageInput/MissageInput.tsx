import { useState } from "react";
import { saveOfflineMessage } from "../../../utils/storage";
import type { Message } from "../../../interfaces/Message";
import type { Socket } from "socket.io-client";

interface Props {
  socket: Socket;
  senderId: number;
  receiverId: number;
  onSendMessage: (msg: Message) => void;
}

export function MessageInput({
  socket,
  senderId,
  receiverId,
  onSendMessage,
}: Props) {
  const [text, setText] = useState("");

  function sendMessage() {
    if (!text.trim()) return;

    const message: Message = {
      senderId,
      receiverId,
      text,
      createdAt: new Date(),
    };

    if (navigator.onLine && socket) {
      socket.emit("sendMessage", message);
    } else {
      saveOfflineMessage(message);
    }

    onSendMessage(message);
    setText("");
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
