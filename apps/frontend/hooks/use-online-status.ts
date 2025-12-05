"use client";

import { useEffect, useState } from "react";

interface OnlineStatus {
  online: boolean;
}

export function useOnlineStatus(): OnlineStatus {
  const [online, setOnline] = useState<boolean>(() => {
    if (typeof navigator === "undefined") {
      return true;
    }
    return navigator.onLine ?? true;
  });

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return { online };
}
