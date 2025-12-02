"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type ForgotFormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotFormValues) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.info("Password reset email simulated for", values.email);
    setSubmitted(true);
    setLoading(false);
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

      <header className="relative z-10 flex w-full items-center justify-between px-6 py-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3 text-heading-3 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-base font-bold text-white">
            IB
          </span>
          ImpactBridge
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-white/75 md:flex">
          <Link href="/login" className="transition hover:text-white">
            Back to login
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex w-full flex-1 items-center justify-center px-6 pb-12 pt-4 lg:px-12">
        <Card className="w-full max-w-md rounded-3xl border border-white/10 bg-white/70 shadow-2xl backdrop-blur-xl">
          <CardHeader className="space-y-3 text-center text-slate-900">
            <CardTitle className="text-2xl font-semibold sm:text-3xl">
              Reset your password
            </CardTitle>
            <CardDescription className="text-sm text-slate-600 sm:text-base">
              Enter your registered email to receive a reset link.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-8 sm:px-8">
            {submitted ? (
              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                If the email exists in our system, a reset link has been sent (demo state).
              </div>
            ) : null}

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
                          disabled={loading || submitted}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 py-2 font-semibold text-white transition hover:opacity-95"
                  disabled={loading || submitted}
                >
                  {loading ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            </Form>

            <p className="text-center text-xs text-slate-500">
              Remembered your password?{' '}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Back to login
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
