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

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.info("Password reset with", values.password.length, "characters (placeholder)");
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden text-slate-50">
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
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold sm:text-xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-base font-bold text-white">
            IB
          </span>
          ImpactBridge
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-white/75 md:flex">
          <Link href="/public/login" className="transition hover:text-white">
            Back to login
          </Link>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex w-full flex-1 items-center justify-center px-6 pb-12 pt-4 lg:px-12">
        <Card className="w-full max-w-md rounded-3xl border border-white/10 bg-white/70 shadow-2xl backdrop-blur-xl">
          <CardHeader className="space-y-3 text-center text-slate-900">
            <CardTitle className="text-2xl font-semibold sm:text-3xl">
              Choose a new password
            </CardTitle>
            <CardDescription className="text-sm text-slate-600 sm:text-base">
              Enter and confirm your new password to complete the reset.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-8 sm:px-8">
            {submitted ? (
              <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                Password updated successfully (placeholder). You can now sign in with the new password.
              </div>
            ) : null}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          autoComplete="new-password"
                          {...field}
                          disabled={loading || submitted}
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
                      <FormLabel>Confirm new password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Re-enter password"
                          autoComplete="new-password"
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
                  {loading ? "Updating..." : "Update password"}
                </Button>
              </form>
            </Form>

            <p className="text-center text-xs text-slate-500">
              Return to{' '}
              <Link href="/public/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
