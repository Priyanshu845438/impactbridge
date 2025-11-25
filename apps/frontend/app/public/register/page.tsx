'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('NGO');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await apiClient.post<unknown, { name: string; email: string; password: string; role: string }>('/auth/register', {
        name,
        email,
        password,
        role,
      });
      router.push('/(public)/login');
    } catch {
      setError('Registration failed.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
        >
          <option value="NGO">NGO</option>
          <option value="COMPANY">Company</option>
          <option value="DONOR">Donor</option>
        </select>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        className="w-full rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
      >
        Create Account
      </button>
    </form>
  );
}
