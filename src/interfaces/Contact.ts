import type { Message } from "./Message";

export interface Contact {
  [contactId: string]: Message[];
}
