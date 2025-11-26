"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/providers/auth-context";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.post<
        {
          accessToken: string;
          user: {
            id: string;
            role: "SUPER_ADMIN" | "NGO" | "COMPANY" | "DONOR";
            name: string;
            email: string;
          };
        },
        LoginFormValues
      >("/auth/login", values);

      login(data.accessToken, data.user);

      const routeMap = {
        SUPER_ADMIN: "/dashboard/admin",
        NGO: "/dashboard/ngo",
        COMPANY: "/dashboard/company",
        DONOR: "/dashboard/donor",
      } as const;

      router.push(routeMap[data.user.role]);
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center px-4 py-12"
      style={{
        backgroundImage: 'url(/assets/login_signup_bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Card className="glass-surface w-full max-w-md border border-border shadow-brand">
        <CardHeader className="space-y-3 text-center">
          <CardTitle className="text-3xl font-semibold text-foreground">
            Sign in to ImpactBridge
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Connect with your CSR projects, partners, and reports in one place.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="csr.manager@company.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-3 flex items-center text-muted-foreground/80 transition hover:text-foreground"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end text-sm">
                <Link
                  href="/public/forgot-password"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Forgot password?
                </Link>
              </div>
              {error ? (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600" role="alert">
                  <ShieldAlert className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              ) : null}
              <Button
                type="submit"
                className="w-full rounded-xl bg-accent-gradient py-2 text-base font-semibold text-white shadow-soft transition hover:opacity-90"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
              <div className="space-y-2 text-center text-sm text-muted-foreground">
                <p>
                  Need an account?{" "}
                  <Link href="/public/register" className="font-semibold text-primary hover:text-primary/80">
                    Create an account
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
