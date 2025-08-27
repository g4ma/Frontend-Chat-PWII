// src/utils/db.ts
import { openDB } from "idb";

const DB_NAME = "offline-messages-db";
const STORE_NAME = "messages";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function addOfflineMessage(message: any) {
  const db = await getDB();
  await db.add(STORE_NAME, message);
}

export async function getOfflineMessages() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function clearOfflineMessages() {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.clear();
  await tx.done;
}
