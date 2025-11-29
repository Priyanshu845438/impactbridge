"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { setApiClientToken } from "@/lib/api-client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'NGO' | 'COMPANY' | 'DONOR';
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  unreadNotifications: number;
  markNotificationRead: (count?: number) => void;
  resetNotifications: () => void;
  syncNotificationsCount: (count: number) => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);
let tokenStore: string | null = null;
let userStore: AuthUser | null = null;
let unreadStore = 0;

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setTokenState] = useState<string | null>(tokenStore);
  const [user, setUserState] = useState<AuthUser | null>(userStore);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(unreadStore);
  const router = useRouter();

  const login = (jwt: string, authUser: AuthUser) => {
    tokenStore = jwt;
    userStore = authUser;
    setApiClientToken(jwt);
    setTokenState(jwt);
    setUserState(authUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("impactbridge:token", jwt);
      localStorage.setItem("impactbridge:user", JSON.stringify(authUser));
      const storedUnread = localStorage.getItem("impactbridge:notifications:unread");
      if (storedUnread) {
        const parsedUnread = Number.parseInt(storedUnread, 10);
        if (!Number.isNaN(parsedUnread)) {
          unreadStore = parsedUnread;
          setUnreadNotifications(parsedUnread);
        }
      } else {
        unreadStore = 3;
        setUnreadNotifications(3);
        localStorage.setItem("impactbridge:notifications:unread", "3");
      }
    }
  };

  const logout = () => {
    tokenStore = null;
    userStore = null;
    setApiClientToken(null);
    setTokenState(null);
    setUserState(null);
    setUnreadNotifications(0);
    unreadStore = 0;
    if (typeof window !== "undefined") {
      localStorage.removeItem("impactbridge:token");
      localStorage.removeItem("impactbridge:user");
      localStorage.removeItem("impactbridge:notifications:unread");
    }
  };

  const markNotificationRead = (count = 1) => {
    setUnreadNotifications((prev) => {
      const next = Math.max(prev - count, 0);
      unreadStore = next;
      if (typeof window !== "undefined") {
        localStorage.setItem("impactbridge:notifications:unread", String(next));
      }
      return next;
    });
  };

  const resetNotifications = () => {
    setUnreadNotifications(0);
    unreadStore = 0;
    if (typeof window !== "undefined") {
      localStorage.setItem("impactbridge:notifications:unread", "0");
    }
  };

  const syncNotificationsCount = (count: number) => {
    const safeCount = Number.isFinite(count) && count >= 0 ? Math.round(count) : 0;
    setUnreadNotifications(safeCount);
    unreadStore = safeCount;
    if (typeof window !== "undefined") {
      localStorage.setItem("impactbridge:notifications:unread", String(safeCount));
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedToken = localStorage.getItem("impactbridge:token");
    const storedUser = localStorage.getItem("impactbridge:user");
    const storedUnread = localStorage.getItem("impactbridge:notifications:unread");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as AuthUser;
        tokenStore = storedToken;
        userStore = parsedUser;
        if (storedUnread) {
          const parsedUnread = Number.parseInt(storedUnread, 10);
          if (!Number.isNaN(parsedUnread)) {
            unreadStore = parsedUnread;
            setUnreadNotifications(parsedUnread);
          } else {
            unreadStore = 0;
            setUnreadNotifications(0);
          }
        } else {
          unreadStore = 0;
          setUnreadNotifications(0);
        }
        setApiClientToken(storedToken);
        setTokenState(storedToken);
        setUserState(parsedUser);
      } catch (error) {
        localStorage.removeItem("impactbridge:token");
        localStorage.removeItem("impactbridge:user");
        localStorage.removeItem("impactbridge:notifications:unread");
      }
    } else {
      router.replace("/login");
    }
  }, [router]);

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
      unreadNotifications,
      markNotificationRead,
      resetNotifications,
      syncNotificationsCount,
    }),
    [token, user, unreadNotifications],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
