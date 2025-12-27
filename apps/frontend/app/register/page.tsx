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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiClient } from "@/lib/api-client";
import { Building2, HandCoins, HandHelping, Shield } from "lucide-react";

const schema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["NGO", "COMPANY", "DONOR", "SUPER_ADMIN"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const roleOptions = [
  { value: "NGO", label: "NGO", icon: HandHelping },
  { value: "COMPANY", label: "Company", icon: Building2 },
  { value: "DONOR", label: "Donor", icon: HandCoins },
  { value: "SUPER_ADMIN", label: "Super Admin", icon: Shield },
];

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "NGO",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.post("api/v1/auth/register", {
        json: {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
        },
      });
      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed, please try again.");
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
          <Link href="/login" className="transition hover:text-white">
            Already have an account?
          </Link>
          <Link href="/docs" className="transition hover:text-white">
            Platform guide
          </Link>
        </nav>
      </header>

      <main className="relative z-10 flex w-full flex-1 flex-col gap-10 px-6 pb-12 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <section className="w-full space-y-6 text-center lg:w-1/2 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Join the ImpactBridge Network
          </span>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Onboard your organisation to a regulated CSR ecosystem.
          </h1>
          <p className="text-sm text-white/80 sm:text-base">
            Whether you are an NGO, corporate CSR leader, or donor collective, ImpactBridge streamlines due diligence, disbursement tracking, and impact verification.
          </p>

          <div className="mt-6 grid gap-4 text-left text-sm text-white/75 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4 shadow-lg backdrop-blur">
              <h3 className="text-sm font-semibold text-white">NGO Benefits</h3>
              <p className="mt-2 text-xs text-white/70">
                Auto-generate compliance dossiers, invite donors, and log fund utilisation with evidence-backed audit trails.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 shadow-lg backdrop-blur">
              <h3 className="text-sm font-semibold text-white">Corporate & Donor Benefits</h3>
              <p className="mt-2 text-xs text-white/70">
                Monitor CSR budgets, validate beneficiaries, and generate CSR-2 ready reports on demand.
              </p>
            </div>
          </div>
        </section>

        <section className="flex w-full justify-center lg:w-1/2">
          <Card className="w-full rounded-3xl border border-white/10 bg-white/70 shadow-2xl backdrop-blur-xl lg:w-4/5">
            <CardHeader className="space-y-3 text-center text-slate-900">
              <CardTitle className="text-2xl font-semibold sm:text-3xl">
                Create your ImpactBridge account
              </CardTitle>
              <CardDescription className="text-sm text-slate-600 sm:text-base">
                We’ll tailor the workspace to your role immediately after sign-up.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-6 pb-8 sm:px-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" autoComplete="name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@organisation.org"
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
                          <Input
                            type="password"
                            placeholder="••••••••"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Re-enter password"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roleOptions.map(({ value, label, icon: Icon }) => (
                              <SelectItem key={value} value={value}>
                                <span className="flex items-center gap-2">
                                  <Icon className="h-4 w-4" />
                                  {label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error ? (
                    <div className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600" role="alert">
                      {error}
                    </div>
                  ) : null}

                  <Button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 py-2 font-semibold text-white transition hover:opacity-95"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create account"}
                  </Button>
                </form>
              </Form>

              <p className="text-center text-xs text-slate-500">
                Already onboarded?{' '}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in instead
                </Link>
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
