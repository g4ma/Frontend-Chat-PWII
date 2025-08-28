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

export function cacheMessages(contactId: number, messages: Message[]) {
  const cached = getAllCachedMessages(); // pega todo o cache existente
  cached[contactId] = messages; // atualiza ou adiciona
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(cached));
}

export function getCachedMessages(contactId: number) {
  console.log(contactId);
  const cached = getAllCachedMessages();
  return cached[contactId] || []; // retorna as mensagens ou array vazio
}

function getAllCachedMessages() {
  return JSON.parse(localStorage.getItem(MESSAGES_KEY) || "{}");
}
