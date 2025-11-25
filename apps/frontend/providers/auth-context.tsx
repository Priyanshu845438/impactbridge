'use client';

import { createContext, useContext, useMemo, useState, PropsWithChildren } from 'react';
import { setApiClientToken } from '@/lib/api-client';

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

  const login = (jwt: string, authUser: AuthUser) => {
    tokenStore = jwt;
    userStore = authUser;
    setApiClientToken(jwt);
    setTokenState(jwt);
    setUserState(authUser);
  };

  const logout = () => {
    tokenStore = null;
    userStore = null;
    setApiClientToken(null);
    setTokenState(null);
    setUserState(null);
  };

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
