"use client";

interface QueuedAction {
  id: string;
  timestamp: number;
  type: string;
  payload: Record<string, unknown>;
}

const STORAGE_KEY = "impactbridge-offline-queue";

type QueueListener = (queue: QueuedAction[]) => void;

const listeners = new Set<QueueListener>();

function readQueue(): QueuedAction[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as QueuedAction[];
  } catch (error) {
    console.error("Failed to read offline queue", error);
    return [];
  }
}

function writeQueue(queue: QueuedAction[]): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    listeners.forEach((listener) => listener(queue));
  } catch (error) {
    console.error("Failed to write offline queue", error);
  }
}

export function getQueueSnapshot(): QueuedAction[] {
  return readQueue();
}

export function enqueueAction(action: Omit<QueuedAction, "id" | "timestamp"> & { id?: string }): QueuedAction {
  const queue = readQueue();
  const entry: QueuedAction = {
    id: action.id ?? crypto.randomUUID(),
    timestamp: Date.now(),
    type: action.type,
    payload: action.payload,
  };
  queue.push(entry);
  writeQueue(queue);
  return entry;
}

export function clearAction(id: string): void {
  const queue = readQueue();
  const next = queue.filter((item) => item.id !== id);
  writeQueue(next);
}

export function clearAllActions(): void {
  writeQueue([]);
}

export function subscribeQueue(listener: QueueListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export type { QueuedAction };
