import { useEffect, useState } from "react";
import { saveOfflineMessage } from "../../../utils/storage";
import { Socket } from "socket.io-client";

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
    const message = { senderId, receiverId, text, createdAt: new Date() };

    if (navigator.onLine && socket) {
      socket.emit("sendMessage", message);
    } else {
      saveOfflineMessage(message);
    }

    setText("");
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
