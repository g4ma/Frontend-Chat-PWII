import type { Message } from "../interfaces/Message";
import type { User } from "../interfaces/User";

const OFFLINE_QUEUE = "offlineQueue";
const MESSAGES_KEY = "messagesCache";

const CONTACTS_KEY = (userId: number) => `contacts_${userId}`;

export function saveContacts(userId: number, contacts: User[]) {
  localStorage.setItem(CONTACTS_KEY(userId), JSON.stringify(contacts));
}

export function getContacts(userId: number): User[] {
  const data = localStorage.getItem(CONTACTS_KEY(userId));
  return data ? JSON.parse(data) : [];
}

export function saveOfflineMessage(msg: Message) {
  const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE) || "[]");
  queue.push(msg);
  localStorage.setItem(OFFLINE_QUEUE, JSON.stringify(queue));
}

export function getOfflineMessages(): Message[] {
  return JSON.parse(localStorage.getItem(OFFLINE_QUEUE) || "[]");
}

export function clearOfflineMessages() {
  localStorage.removeItem(OFFLINE_QUEUE);
}

export function cacheMessages(messages: Message[]) {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export function getCachedMessages() {
  return JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
}
