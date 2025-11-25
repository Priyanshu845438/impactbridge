'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/providers/auth-context';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: LoginForm) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.post<
        { accessToken: string; user: { id: string; role: 'SUPER_ADMIN' | 'NGO' | 'COMPANY' | 'DONOR'; name: string; email: string } },
        LoginForm
      >('/auth/login', values);

      login(data.accessToken, data.user);

      const routeMap = {
        SUPER_ADMIN: '/dashboard/admin',
        NGO: '/dashboard/ngo',
        COMPANY: '/dashboard/company',
        DONOR: '/dashboard/donor',
      } as const;

      router.push(routeMap[data.user.role]);
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="space-y-1 text-center">
        <h1 className="text-2xl font-semibold">Sign in to ImpactBridge</h1>
        <p className="text-sm text-muted-foreground">Access your CSR workspace</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input type="email" placeholder="you@example.com" {...register('email')} />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <Input type="password" placeholder="••••••••" {...register('password')} />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}
