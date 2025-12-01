"use client";

import { useEffect, useMemo, useState } from "react";
import { Camera, CheckCircle2, Clock4, Palette, Phone, ShieldCheck } from "lucide-react";

import { SectionHeader } from "@/components/dashboard/section-header";
import { useAuth, type AuthUser } from "@/providers/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SkeletonCard, SkeletonText } from "@/components/ui/skeleton";
import { toast } from "sonner";

const timezones = [
  "Asia/Kolkata",
  "Asia/Dubai",
  "Europe/London",
  "America/New_York",
  "Australia/Sydney",
];

const themes = [
  { value: "system", label: "System default" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "high-contrast", label: "High contrast" },
];

type ProfileFormState = {
  name: string;
  email: string;
  phone: string;
  timezone: string;
  theme: string;
};

function createInitialState(user: AuthUser | null): ProfileFormState {
  if (!user) {
    return {
      name: "",
      email: "",
      phone: "",
      timezone: "Asia/Kolkata",
      theme: "system",
    };
  }

  return {
    name: user.name ?? "",
    email: user.email ?? "",
    phone: "+91 98765 43210",
    timezone: "Asia/Kolkata",
    theme: "system",
  };
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const baseProfile = useMemo(() => createInitialState(user), [user]);
  const [form, setForm] = useState<ProfileFormState>(baseProfile);

  useEffect(() => {
    setForm(baseProfile);
  }, [baseProfile]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const isDirty = useMemo(() => {
    return (
      form.name !== baseProfile.name ||
      form.email !== baseProfile.email ||
      form.phone !== baseProfile.phone ||
      form.timezone !== baseProfile.timezone ||
      form.theme !== baseProfile.theme
    );
  }, [form, baseProfile]);

  const handleChange = <K extends keyof ProfileFormState>(key: K, value: ProfileFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    window.setTimeout(() => {
      toast.success("Profile updated successfully");
      setSaving(false);
    }, 700);
  };

  if (loading || !user) {
    return (
      <div className="space-y-8">
        <SkeletonText lines={2} className="w-64" />
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <SkeletonCard className="h-72" />
          <SkeletonCard className="h-[480px]" />
        </div>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-8">
      <SectionHeader
        title="My profile"
        subtitle="Manage your ImpactBridge identity, preferences, and contact details."
        action={
          <Button
            size="sm"
            className="gap-2"
            disabled={!isDirty || saving}
            onClick={handleSave}
          >
            {saving ? "Saving…" : "Save changes"}
          </Button>
        }
      />

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-600/10 text-2xl font-semibold text-emerald-700">
                {initials}
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="absolute -bottom-2 right-0 gap-2 rounded-full border-emerald-200 bg-white px-3 text-xs font-medium text-emerald-700 shadow-sm hover:bg-emerald-50"
              >
                <Camera className="h-3.5 w-3.5" />
                Upload
              </Button>
            </div>
            <div className="mt-4 space-y-1">
              <h2 className="text-xl font-semibold text-slate-900">{user.name}</h2>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                {user.role.replace("_", " ")}
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Clock4 className="h-4 w-4 text-slate-400" />
              <span>Last login</span>
              <span className="font-medium text-slate-800">Today at 4:21 PM IST</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Phone className="h-4 w-4 text-slate-400" />
              <span>Primary contact</span>
              <span className="font-medium text-slate-800">{form.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Palette className="h-4 w-4 text-slate-400" />
              <span>Preferred theme</span>
              <span className="font-medium text-slate-800">
                {themes.find((theme) => theme.value === form.theme)?.label ?? "System default"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-xs text-emerald-800">
            <p className="font-semibold">Security tip</p>
            <p className="mt-1 leading-relaxed">
              Update your contact information regularly so ImpactBridge can notify you about compliance alerts
              without delay.
            </p>
          </div>
        </aside>

        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Field
              label="Full name"
              value={form.name}
              onChange={(value) => handleChange("name", value)}
              placeholder="Enter your name"
            />
            <Field
              label="Email address"
              value={form.email}
              onChange={(value) => handleChange("email", value)}
              type="email"
              placeholder="name@impactbridge.org"
            />
            <Field
              label="Phone"
              value={form.phone}
              onChange={(value) => handleChange("phone", value)}
              placeholder="+91 98765 43210"
            />
            <SelectField
              label="Timezone"
              value={form.timezone}
              onChange={(value) => handleChange("timezone", value)}
              options={timezones.map((zone) => ({ value: zone, label: zone }))}
            />
            <SelectField
              label="Dashboard theme"
              value={form.theme}
              onChange={(value) => handleChange("theme", value)}
              options={themes}
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Changes are saved securely and apply across all ImpactBridge dashboards.
          </div>
        </section>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
};

function Field({ label, value, onChange, type = "text", placeholder }: FieldProps) {
  return (
    <label className="space-y-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-xl border-slate-200 bg-white focus-visible:ring-emerald-500"
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
};

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="space-y-2 text-sm font-medium text-slate-700">
      <span>{label}</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-left">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="rounded-xl border border-slate-200 bg-white shadow-lg">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
