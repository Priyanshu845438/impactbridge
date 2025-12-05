"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useOnlineStatus } from "@/hooks/use-online-status";
import {
  clearAction,
  enqueueAction,
  getQueueSnapshot,
  subscribeQueue,
  type QueuedAction,
} from "@/lib/queue-manager";

interface OfflineContextValue {
  online: boolean;
  queue: QueuedAction[];
  enqueue: (action: { type: string; payload: QueuedAction["payload"]; id?: string }) => QueuedAction;
  markSynced: (id: string) => void;
}

const OfflineContext = createContext<OfflineContextValue | null>(null);

export function OfflineStatusProvider({ children }: PropsWithChildren) {
  const { online } = useOnlineStatus();
  const [queue, setQueue] = useState<QueuedAction[]>(() => getQueueSnapshot());
  const [wasOffline, setWasOffline] = useState(() => !online);

  useEffect(() => {
    const unsubscribe = subscribeQueue(setQueue);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!online) {
      setWasOffline(true);
      toast.warning("⚠ You're offline. Changes will sync when back online.");
      return;
    }

    if (wasOffline && online) {
      toast.success("Synced.");
      setWasOffline(false);
    }
  }, [online, wasOffline]);


  const value = useMemo<OfflineContextValue>(
    () => ({
      online,
      queue,
      enqueue: (action) => enqueueAction(action),
      markSynced: clearAction,
    }),
    [online, queue],
  );

  return <OfflineContext.Provider value={value}>{children}</OfflineContext.Provider>;
}

export function useOfflineContext(): OfflineContextValue {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error("useOfflineContext must be used within OfflineStatusProvider");
  }
  return context;
}
