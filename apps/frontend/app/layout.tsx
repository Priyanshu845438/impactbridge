import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { QueryProvider } from '@/providers/query-provider';
import { AuthProvider } from '@/providers/auth-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'ImpactBridge',
  description: 'CSR compliance, impact tracking, and reporting portal',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={cn('w-full min-h-screen flex flex-col bg-neutral-50 overflow-hidden font-sans antialiased')}>
        <AuthProvider>
          <QueryProvider>
            <main className="flex-1 w-full">{children}</main>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
