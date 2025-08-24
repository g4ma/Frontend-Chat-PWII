import { useEffect } from "react";
import { getOfflineMessages, clearOfflineMessages } from "../utils/storage";
import { Socket } from "socket.io-client";

export function useOfflineQueue(socket: Socket | null) {
  useEffect(() => {
    if (!socket) return;

    function sendOfflineMessages() {
      const messages = getOfflineMessages();
      if (socket) {
        messages.forEach((msg) => socket.emit("sendMessage", msg));
      }
      clearOfflineMessages();
    }

    window.addEventListener("online", sendOfflineMessages);
    return () => window.removeEventListener("online", sendOfflineMessages);
  }, [socket]);
}
