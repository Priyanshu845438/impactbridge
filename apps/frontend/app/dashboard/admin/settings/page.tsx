"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

const countries = ["India", "United States", "United Kingdom", "Singapore", "Australia"] as const;
const sessionTimeouts = ["15 minutes", "30 minutes", "1 hour", "2 hours", "8 hours"] as const;

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [platformName, setPlatformName] = useState("ImpactBridge Platform");
  const [supportEmail, setSupportEmail] = useState("support@impactbridge.org");
  const [defaultCountry, setDefaultCountry] = useState<(typeof countries)[number]>("India");
  const [require2fa, setRequire2fa] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState<(typeof sessionTimeouts)[number]>("1 hour");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 500);
    return () => window.clearTimeout(timeout);
  }, []);

  const hasChanges = useMemo(() => {
    return (
      platformName !== "ImpactBridge Platform" ||
      supportEmail !== "support@impactbridge.org" ||
      defaultCountry !== "India" ||
      require2fa !== true ||
      sessionTimeout !== "1 hour" ||
      emailNotifications !== true ||
      smsNotifications !== false ||
      weeklyDigest !== true
    );
  }, [
    defaultCountry,
    emailNotifications,
    platformName,
    require2fa,
    sessionTimeout,
    smsNotifications,
    supportEmail,
    weeklyDigest,
  ]);

  const handleSave = () => {
    toast.success("Changes saved");
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-6 w-56 rounded-full" />
        <Skeleton className="h-16 w-full rounded-3xl" />
        <Skeleton className="h-52 w-full rounded-3xl" />
        <Skeleton className="h-52 w-full rounded-3xl" />
        <Skeleton className="h-52 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "System Settings" },
        ]}
      />

      <SectionHeader
        title="System settings"
        subtitle="Configure platform defaults, security posture, notifications, and branding."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card className="border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <CardHeader>
              <CardTitle>General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FieldGroup
                label="Platform name"
                description="Shown across the app and outgoing communications."
              >
                <Input
                  id="platform-name"
                  value={platformName}
                  onChange={(event) => setPlatformName(event.target.value)}
                  placeholder="Enter platform name"
                  className="h-10 rounded-xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                />
              </FieldGroup>

              <FieldGroup label="Support email" description="Used for support links and notifications.">
                <Input
                  id="support-email"
                  type="email"
                  value={supportEmail}
                  onChange={(event) => setSupportEmail(event.target.value)}
                  placeholder="support@example.com"
                  className="h-10 rounded-xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                />
              </FieldGroup>

              <FieldGroup label="Default country" description="Influences locale defaults and currency formatting.">
                <Select value={defaultCountry} onValueChange={(value) => setDefaultCountry(value as typeof defaultCountry)}>
                  <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ToggleRow
                title="Require two-factor authentication"
                description="Mandate OTP or authenticator app at login for all admin accounts."
                checked={require2fa}
                onCheckedChange={setRequire2fa}
              />

              <FieldGroup label="Session timeout" description="Users will be signed out after inactivity.">
                <Select value={sessionTimeout} onValueChange={(value) => setSessionTimeout(value as typeof sessionTimeout)}>
                  <SelectTrigger className="h-10 rounded-xl border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionTimeouts.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldGroup>

              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Allowed IP ranges</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Define CIDR ranges to restrict admin access. API integration coming soon.
                </p>
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-4 text-sm text-slate-500 dark:border-slate-600 dark:bg-slate-900/30 dark:text-slate-400">
                  Placeholder for IP whitelist table
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ToggleRow
                title="Email notifications"
                description="Send transactional emails for approvals, assignments, and security notices."
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
              <ToggleRow
                title="SMS notifications"
                description="Send SMS alerts for urgent system announcements."
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
              <ToggleRow
                title="Weekly digest"
                description="Deliver summary digest of activity, compliance status, and pending actions every Friday."
                checked={weeklyDigest}
                onCheckedChange={setWeeklyDigest}
              />
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <CardHeader>
              <CardTitle>Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="grid gap-3 sm:grid-cols-2">
                <UploadPlaceholder title="Logo upload" />
                <UploadPlaceholder title="Favicon upload" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Preferred formats: SVG, PNG. Favicon requires 64×64 transparent background.
              </p>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <SummaryRow label="Platform name" value={platformName || "—"} />
              <SummaryRow label="Support email" value={supportEmail || "—"} />
              <SummaryRow label="Default country" value={defaultCountry} />
              <SummaryRow label="Session timeout" value={sessionTimeout} />
              <SummaryRow label="2FA required" value={require2fa ? "Enabled" : "Disabled"} />
              <SummaryRow
                label="Notifications"
                value={[
                  emailNotifications ? "Email" : null,
                  smsNotifications ? "SMS" : null,
                  weeklyDigest ? "Weekly digest" : null,
                ]
                  .filter(Boolean)
                  .join(", ") || "None"}
              />
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white/80 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">Remember</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                These preferences will apply across all admin workspaces. Coordinate with compliance teams before adjusting security options.
              </p>
              <Button type="button" variant="outline" className="w-full rounded-full border-slate-200 dark:border-slate-700">
                View change log
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
        <div className="space-y-1 text-sm text-slate-500 dark:text-slate-400">
          <p>Changes propagate instantly for all administrators.</p>
          <p className="text-xs">Future integrations will sync these settings with backend configuration.</p>
        </div>
        <Button type="button" disabled={!hasChanges} onClick={handleSave} className="rounded-full px-6">
          Save changes
        </Button>
      </div>
    </div>
  );
}

function FieldGroup({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>
        {description ? <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onCheckedChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900/50">
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function UploadPlaceholder({ title }: { title: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{title}</p>
      <div className="flex h-24 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/60 text-xs text-slate-500 transition hover:border-slate-400 dark:border-slate-600 dark:bg-slate-900/30 dark:text-slate-400">
        Drop file or browse
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50/70 px-3 py-2 text-xs text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
      <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
      <span className="text-right text-slate-600 dark:text-slate-300">{value}</span>
    </div>
  );
}

