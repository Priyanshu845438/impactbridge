"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
import { useTranslations } from "next-intl";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const highlights = [
  "Regulation-ready CSR compliance",
  "Real-time impact dashboards",
  "Secure donor + NGO collaboration",
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient
        .post("auth/login", { json: values })
        .json<{
          accessToken: string;
          user: {
            id: string;
            role: "SUPER_ADMIN" | "NGO" | "COMPANY" | "DONOR";
            name: string;
            email: string;
          };
        }>();

      login(response.accessToken, response.user);

      const nextRoute = {
        SUPER_ADMIN: "/dashboard/admin",
        NGO: "/dashboard/ngo",
        COMPANY: "/dashboard/company",
        DONOR: "/dashboard/donor",
      }[response.user.role];

      router.push(nextRoute ?? "/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden overflow-y-auto text-slate-50">
      <Image
        src="/images/login_signup_bg.webp"
        alt="ImpactBridge backdrop"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-slate-900/40" />

      <header className="relative z-10 flex w-full items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3 text-heading-3 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-base font-bold text-white">
            IB
          </span>
          ImpactBridge
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-white/75 md:flex">
          <Link href="/register" className="transition hover:text-white">
            Become a partner
          </Link>
          <Link href="/docs" className="transition hover:text-white">
            Platform guide
          </Link>
        </nav>
      </header>

      <main className="relative z-10 flex w-full flex-1 flex-col gap-10 px-6 pb-12 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <section className="w-full space-y-6 text-center lg:w-1/2 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Unified CSR network
          </span>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Coordinate every CSR initiative with clarity, confidence, and compliance.
          </h1>
          <p className="text-sm text-white/80 sm:text-base">
            ImpactBridge centralises NGO onboarding, compliance, and impact measurement so teams make faster, more transparent decisions.
          </p>
          <ul className="mt-6 grid gap-3 text-left text-sm text-white/75 sm:grid-cols-2 sm:gap-4">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/90 text-slate-950">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex w-full justify-center lg:w-1/2">
          <Card className="w-full rounded-3xl border border-white/10 bg-white/70 shadow-2xl backdrop-blur-xl lg:w-4/5">
            <CardHeader className="space-y-3 text-center text-slate-900">
              <CardTitle className="text-2xl font-semibold sm:text-3xl">
                {t("login")}
              </CardTitle>
              <CardDescription className="text-sm text-slate-600 sm:text-base">
                Manage programmes, donors, and partners seamlessly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-6 pb-8 sm:px-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@impactbridge.org"
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
                              className="absolute inset-y-0 right-3 flex items-center text-slate-500 transition hover:text-slate-800"
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

                  <div className="flex items-center justify-between text-xs text-slate-600 sm:text-sm">
                    <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                    <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Create account
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
                    className="w-full rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 py-2 font-semibold text-white transition hover:opacity-95"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </Button>
                </form>
              </Form>

              <p className="text-center text-xs text-slate-500">
                By signing in you agree to our{' '}
                <Link href="/legal/terms" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/legal/privacy" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
