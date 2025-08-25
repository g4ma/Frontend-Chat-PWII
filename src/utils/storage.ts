import type { Message } from "../interfaces/Message";

const OFFLINE_QUEUE = "offlineQueue";
const MESSAGES_KEY = "messagesCache";

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
