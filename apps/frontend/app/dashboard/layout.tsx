import type { PropsWithChildren } from 'react';
import Link from 'next/link';

const links = [
  { href: '/(dashboard)', label: 'Overview' },
  { href: '/(dashboard)/campaigns', label: 'Campaigns' },
  { href: '/(dashboard)/reports', label: 'Reports' },
  { href: '/(dashboard)/settings', label: 'Settings' },
];

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="grid gap-6 py-8 md:grid-cols-[220px_1fr]">
      <aside className="space-y-2">
        <h2 className="text-lg font-semibold">Workspace</h2>
        <nav className="grid gap-1 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-3 py-2 text-secondary-foreground hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
