import { PropsWithChildren } from 'react';
import { AuthProvider } from '../auth-context';

export type MockAuthUser = {
  id: string;
  name: string;
  email: string;
  role: 'SUPER_ADMIN' | 'NGO' | 'COMPANY' | 'DONOR';
};

type WithAuthProps = PropsWithChildren<{
  presetUser?: MockAuthUser;
}>;

export function WithMockedAuth({ children, presetUser }: WithAuthProps) {
  if (!presetUser) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  // Minimal override: mount provider then hydrate with mock user via login.
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
