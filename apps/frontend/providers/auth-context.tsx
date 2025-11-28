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
}

const AuthContext = createContext<AuthState | undefined>(undefined);
let tokenStore: string | null = null;
let userStore: AuthUser | null = null;

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setTokenState] = useState<string | null>(tokenStore);
  const [user, setUserState] = useState<AuthUser | null>(userStore);
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
    }
  };

  const logout = () => {
    tokenStore = null;
    userStore = null;
    setApiClientToken(null);
    setTokenState(null);
    setUserState(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("impactbridge:token");
      localStorage.removeItem("impactbridge:user");
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedToken = localStorage.getItem("impactbridge:token");
    const storedUser = localStorage.getItem("impactbridge:user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as AuthUser;
        tokenStore = storedToken;
        userStore = parsedUser;
        setApiClientToken(storedToken);
        setTokenState(storedToken);
        setUserState(parsedUser);
      } catch (error) {
        localStorage.removeItem("impactbridge:token");
        localStorage.removeItem("impactbridge:user");
      }
    } else {
      router.replace("/login");
    }
  }, [router]);

  const value = useMemo(() => ({ token, user, login, logout }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
