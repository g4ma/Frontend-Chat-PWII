import { createContext } from "react";
import type { Message } from "../interfaces/Message";

interface MessageContextType {
  messages: Message[];
  addMessage: (msg: Message) => void;
}

export const MessageContext = createContext<MessageContextType | undefined>(
  undefined
);
