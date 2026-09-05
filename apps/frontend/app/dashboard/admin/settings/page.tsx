"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Building,
  Cloud,
  CreditCard,
  Eye,
  EyeOff,
  Mail,
  RefreshCw,
  Save,
  Scale,
  Sliders,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useSystemSettings,
  useUpdateSystemSettings,
} from "@/lib/hooks/use-system-settings";

type TabKey =
  | "branding"
  | "storage"
  | "communication"
  | "payments"
  | "csr"
  | "flags";

export default function AdminSettingsPage() {
  const { settings, isLoading, refetch } = useSystemSettings();
  const updateMutation = useUpdateSystemSettings();

  const [activeTab, setActiveTab] = useState<TabKey>("branding");
  const [formState, setFormState] = useState<Record<string, string>>({});
  const [visibleSecrets, setVisibleSecrets] = useState<Record<string, boolean>>({});

  // Sync loaded settings into local form state
  useEffect(() => {
    if (settings && settings.length > 0) {
      const initialMap: Record<string, string> = {};
      settings.forEach((s) => {
        initialMap[s.key] = s.value;
      });
      setFormState(initialMap);
    }
  }, [settings]);

  const handleFieldChange = (key: string, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSecretVisibility = (key: string) => {
    setVisibleSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveCategory = async (category: string) => {
    const categorySettings = settings.filter((s) => s.category === category);
    const updates = categorySettings.map((s) => ({
      key: s.key,
      value: formState[s.key] ?? s.value,
      category: s.category,
      isSecret: s.isSecret,
      description: s.description ?? undefined,
    }));

    try {
      await updateMutation.mutateAsync(updates);
      toast.success(`${category.replace("_", " ")} configuration saved successfully!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save settings. Please ensure you are logged in as Super Admin.");
    }
  };

  const handleSaveAll = async () => {
    const updates = settings.map((s) => ({
      key: s.key,
      value: formState[s.key] ?? s.value,
      category: s.category,
      isSecret: s.isSecret,
      description: s.description ?? undefined,
    }));

    try {
      await updateMutation.mutateAsync(updates);
      toast.success("All platform settings & keys saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update settings.");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8 pb-14">
        <Skeleton className="h-6 w-56 rounded-full" />
        <Skeleton className="h-16 w-full rounded-3xl" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-14">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Platform & Key Configuration" },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionHeader
          title="Platform Keys & System Settings"
          subtitle="Manage cloud storage credentials, notification gateways, payment keys, and CSR statutory parameters."
        />
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={updateMutation.isPending}
            className="gap-1.5"
          >
            <RefreshCw className="h-4 w-4" />
            Reload
          </Button>
          <Button
            size="sm"
            onClick={handleSaveAll}
            disabled={updateMutation.isPending}
            className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Save className="h-4 w-4" />
            {updateMutation.isPending ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <TabButton
          active={activeTab === "branding"}
          onClick={() => setActiveTab("branding")}
          icon={Building}
          label="General & Legal"
        />
        <TabButton
          active={activeTab === "storage"}
          onClick={() => setActiveTab("storage")}
          icon={Cloud}
          label="Cloud Storage (S3 / R2)"
        />
        <TabButton
          active={activeTab === "communication"}
          onClick={() => setActiveTab("communication")}
          icon={Mail}
          label="Email & SMS Gateways"
        />
        <TabButton
          active={activeTab === "payments"}
          onClick={() => setActiveTab("payments")}
          icon={CreditCard}
          label="Payment Gateways"
        />
        <TabButton
          active={activeTab === "csr"}
          onClick={() => setActiveTab("csr")}
          icon={Scale}
          label="CSR Statutory Rules"
        />
        <TabButton
          active={activeTab === "flags"}
          onClick={() => setActiveTab("flags")}
          icon={Sliders}
          label="Feature Flags"
        />
      </div>

      {/* Tab 1: General & Legal */}
      {activeTab === "branding" && (
        <Card className="border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Building className="h-5 w-5 text-indigo-500" />
                  Platform Branding & Legal Jurisdiction
                </CardTitle>
                <CardDescription>
                  Configure the primary naming, legal jurisdiction, and session security parameters.
                </CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() => handleSaveCategory("PLATFORM")}
                disabled={updateMutation.isPending}
              >
                Save General
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <ConfigInput
                label="Platform Name"
                value={formState["PLATFORM_NAME"] ?? ""}
                onChange={(v) => handleFieldChange("PLATFORM_NAME", v)}
                placeholder="e.g. ImpactBridge CSR Platform"
                description="Displayed in top bars, email templates, and audit exports."
              />
              <ConfigInput
                label="Compliance Support Email"
                value={formState["SUPPORT_EMAIL"] ?? ""}
                onChange={(v) => handleFieldChange("SUPPORT_EMAIL", v)}
                placeholder="compliance@impactbridge.org"
                description="Official contact for statutory inquiries and audits."
              />
              <ConfigInput
                label="Primary Jurisdiction"
                value={formState["DEFAULT_COUNTRY"] ?? ""}
                onChange={(v) => handleFieldChange("DEFAULT_COUNTRY", v)}
                placeholder="e.g. India"
                description="Governing statutory laws applied for compliance."
              />
              <ConfigInput
                label="Reporting Currency"
                value={formState["DEFAULT_CURRENCY"] ?? ""}
                onChange={(v) => handleFieldChange("DEFAULT_CURRENCY", v)}
                placeholder="e.g. INR, USD"
                description="Default ISO currency symbol used across dashboards."
              />
              <ConfigInput
                label="Session Timeout (Minutes)"
                value={formState["SESSION_TIMEOUT_MINUTES"] ?? "60"}
                onChange={(v) => handleFieldChange("SESSION_TIMEOUT_MINUTES", v)}
                placeholder="60"
                type="number"
                description="Idle session duration before re-authentication is required."
              />
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Enforce 2FA for Administrators
                  </p>
                  <p className="text-xs text-slate-500">
                    Mandatory TOTP authenticator app verification on login.
                  </p>
                </div>
                <Switch
                  checked={formState["REQUIRE_2FA_ADMINS"] === "true"}
                  onCheckedChange={(c) =>
                    handleFieldChange("REQUIRE_2FA_ADMINS", c ? "true" : "false")
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Cloud Storage Keys (S3 / R2) */}
      {activeTab === "storage" && (
        <Card className="border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-sky-500" />
                  Cloud File Storage Keys (AWS S3 / Cloudflare R2 / MinIO)
                </CardTitle>
                <CardDescription>
                  Credentials used for encrypting and storing NGO compliance proofs (80G, 12A, PAN) and financial audit reports.
                </CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() => handleSaveCategory("STORAGE")}
                disabled={updateMutation.isPending}
              >
                Save Storage Keys
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <ConfigInput
                label="Storage Provider"
                value={formState["STORAGE_PROVIDER"] ?? "AWS_S3"}
                onChange={(v) => handleFieldChange("STORAGE_PROVIDER", v)}
                placeholder="AWS_S3, CLOUDFLARE_R2, or MINIO"
                description="Specifies the object store API protocol."
              />
              <ConfigInput
                label="Bucket Name"
                value={formState["STORAGE_BUCKET"] ?? ""}
                onChange={(v) => handleFieldChange("STORAGE_BUCKET", v)}
                placeholder="e.g. impactbridge-vault"
                description="Target private S3/R2 bucket name."
              />
              <ConfigInput
                label="Region"
                value={formState["STORAGE_REGION"] ?? "ap-south-1"}
                onChange={(v) => handleFieldChange("STORAGE_REGION", v)}
                placeholder="e.g. ap-south-1, auto"
                description="Cloud datacenter geographic region."
              />
              <ConfigInput
                label="Custom Endpoint URL (Optional)"
                value={formState["STORAGE_CUSTOM_ENDPOINT"] ?? ""}
                onChange={(v) => handleFieldChange("STORAGE_CUSTOM_ENDPOINT", v)}
                placeholder="https://<account-id>.r2.cloudflarestorage.com"
                description="Required for Cloudflare R2 or self-hosted MinIO."
              />
              <ConfigInput
                label="Access Key ID"
                value={formState["STORAGE_ACCESS_KEY_ID"] ?? ""}
                onChange={(v) => handleFieldChange("STORAGE_ACCESS_KEY_ID", v)}
                placeholder="AKIAIOSFODNN7EXAMPLE"
                description="IAM Access Key ID."
              />
              <ConfigInput
                label="Secret Access Key"
                value={formState["STORAGE_SECRET_ACCESS_KEY"] ?? ""}
                onChange={(v) => handleFieldChange("STORAGE_SECRET_ACCESS_KEY", v)}
                placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                isSecret
                showSecret={visibleSecrets["STORAGE_SECRET_ACCESS_KEY"]}
                onToggleSecret={() => toggleSecretVisibility("STORAGE_SECRET_ACCESS_KEY")}
                description="IAM Secret Key (masked for protection)."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Email & Communication Gateways */}
      {activeTab === "communication" && (
        <Card className="border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Mail className="h-5 w-5 text-amber-500" />
                  Email & Transactional Alert Gateway Keys
                </CardTitle>
                <CardDescription>
                  Connect Resend, SendGrid, or AWS SES to send milestone alerts, approval requests, and 80G donation receipts.
                </CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() => handleSaveCategory("COMMUNICATION")}
                disabled={updateMutation.isPending}
              >
                Save Communication Keys
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <ConfigInput
                label="Email Service Provider"
                value={formState["NOTIFICATION_PROVIDER"] ?? "RESEND"}
                onChange={(v) => handleFieldChange("NOTIFICATION_PROVIDER", v)}
                placeholder="RESEND, SENDGRID, AWS_SES, or SMTP"
                description="Service used to dispatch transactional emails."
              />
              <ConfigInput
                label="Sender 'From' Address"
                value={formState["NOTIFICATION_FROM_EMAIL"] ?? ""}
                onChange={(v) => handleFieldChange("NOTIFICATION_FROM_EMAIL", v)}
                placeholder="compliance@impactbridge.org"
                description="Verified domain address shown in email client headers."
              />
              <ConfigInput
                label="API Key / Auth Token"
                value={formState["NOTIFICATION_API_KEY"] ?? ""}
                onChange={(v) => handleFieldChange("NOTIFICATION_API_KEY", v)}
                placeholder="re_123456789_abcdefg"
                isSecret
                showSecret={visibleSecrets["NOTIFICATION_API_KEY"]}
                onToggleSecret={() => toggleSecretVisibility("NOTIFICATION_API_KEY")}
                description="Provider API Token (masked for protection)."
              />
              <ConfigInput
                label="Webhook Signing Secret (Optional)"
                value={formState["NOTIFICATION_WEBHOOK_SECRET"] ?? ""}
                onChange={(v) => handleFieldChange("NOTIFICATION_WEBHOOK_SECRET", v)}
                placeholder="whsec_sample123456"
                isSecret
                showSecret={visibleSecrets["NOTIFICATION_WEBHOOK_SECRET"]}
                onToggleSecret={() => toggleSecretVisibility("NOTIFICATION_WEBHOOK_SECRET")}
                description="Secret for validating delivery confirmation callbacks."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: Payment Gateways */}
      {activeTab === "payments" && (
        <Card className="border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-emerald-500" />
                  Payment & Disbursement Gateway Keys
                </CardTitle>
                <CardDescription>
                  Configure Razorpay, Stripe, or Cashfree for public donations and milestone-based NGO disbursements.
                </CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() => handleSaveCategory("PAYMENTS")}
                disabled={updateMutation.isPending}
              >
                Save Payment Keys
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <ConfigInput
                label="Payment Provider"
                value={formState["PAYMENT_PROVIDER"] ?? "RAZORPAY"}
                onChange={(v) => handleFieldChange("PAYMENT_PROVIDER", v)}
                placeholder="RAZORPAY, STRIPE, or CASHFREE"
                description="Processor used for online payments & escrow."
              />
              <ConfigInput
                label="Public Key ID / Publishable Key"
                value={formState["PAYMENT_KEY_ID"] ?? ""}
                onChange={(v) => handleFieldChange("PAYMENT_KEY_ID", v)}
                placeholder="rzp_live_xxxxxxxx or pk_live_xxxx"
                description="Safe client-side identifier for checkout components."
              />
              <ConfigInput
                label="Key Secret"
                value={formState["PAYMENT_KEY_SECRET"] ?? ""}
                onChange={(v) => handleFieldChange("PAYMENT_KEY_SECRET", v)}
                placeholder="Secret Key"
                isSecret
                showSecret={visibleSecrets["PAYMENT_KEY_SECRET"]}
                onToggleSecret={() => toggleSecretVisibility("PAYMENT_KEY_SECRET")}
                description="Private backend secret key for verification."
              />
              <ConfigInput
                label="Webhook Secret"
                value={formState["PAYMENT_WEBHOOK_SECRET"] ?? ""}
                onChange={(v) => handleFieldChange("PAYMENT_WEBHOOK_SECRET", v)}
                placeholder="Webhook secret"
                isSecret
                showSecret={visibleSecrets["PAYMENT_WEBHOOK_SECRET"]}
                onToggleSecret={() => toggleSecretVisibility("PAYMENT_WEBHOOK_SECRET")}
                description="Validates payout capture events."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 5: CSR & Regulatory Rules */}
      {activeTab === "csr" && (
        <Card className="border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Scale className="h-5 w-5 text-purple-500" />
                  Statutory CSR Compliance & Legal Mandate Rules
                </CardTitle>
                <CardDescription>
                  Define statutory thresholds under Indian Companies Act (Section 135) or global equivalents.
                </CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() => handleSaveCategory("CSR_REGULATORY")}
                disabled={updateMutation.isPending}
              >
                Save CSR Rules
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <ConfigInput
                label="Mandatory CSR Rate (%)"
                value={formState["CSR_MANDATE_PERCENTAGE"] ?? "2.0"}
                onChange={(v) => handleFieldChange("CSR_MANDATE_PERCENTAGE", v)}
                placeholder="2.0"
                type="number"
                description="Statutory % of average net profit required (default 2.0%)."
              />
              <ConfigInput
                label="Financial Year Start Month"
                value={formState["CSR_FINANCIAL_YEAR_START_MONTH"] ?? "4"}
                onChange={(v) => handleFieldChange("CSR_FINANCIAL_YEAR_START_MONTH", v)}
                placeholder="4 (April)"
                type="number"
                description="Month starting the fiscal reporting cycle (4 = April)."
              />
              <ConfigInput
                label="Min Net Worth Threshold (INR Crores)"
                value={formState["CSR_MIN_NET_WORTH_INR_CRORES"] ?? "500"}
                onChange={(v) => handleFieldChange("CSR_MIN_NET_WORTH_INR_CRORES", v)}
                placeholder="500"
                type="number"
                description="Companies with Net Worth >= ₹500 Cr must comply."
              />
              <ConfigInput
                label="Min Turnover Threshold (INR Crores)"
                value={formState["CSR_MIN_TURNOVER_INR_CRORES"] ?? "1000"}
                onChange={(v) => handleFieldChange("CSR_MIN_TURNOVER_INR_CRORES", v)}
                placeholder="1000"
                type="number"
                description="Companies with Turnover >= ₹1000 Cr must comply."
              />
              <ConfigInput
                label="Min Net Profit Threshold (INR Crores)"
                value={formState["CSR_MIN_NET_PROFIT_INR_CRORES"] ?? "5"}
                onChange={(v) => handleFieldChange("CSR_MIN_NET_PROFIT_INR_CRORES", v)}
                placeholder="5"
                type="number"
                description="Companies with Net Profit >= ₹5 Cr must comply."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 6: Dynamic Feature Flags */}
      {activeTab === "flags" && (
        <Card className="border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-rose-500" />
                  Dynamic Platform Feature Flags
                </CardTitle>
                <CardDescription>
                  Enable or disable platform features live without code redeployment.
                </CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() => handleSaveCategory("FEATURE_FLAGS")}
                disabled={updateMutation.isPending}
              >
                Save Flags
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FeatureToggleItem
              title="Live API Dashboards (API_DASHBOARD)"
              description="Routes dashboard data fetching through live backend controllers instead of mock fixtures."
              checked={formState["FLAG_API_DASHBOARD"] === "true"}
              onChange={(c) => handleFieldChange("FLAG_API_DASHBOARD", c ? "true" : "false")}
            />
            <FeatureToggleItem
              title="NGO Financial Reports API (API_NGO_FINANCIAL)"
              description="Enables live upload and submission pipeline for NGO financial utilisation reports."
              checked={formState["FLAG_API_NGO_FINANCIAL"] === "true"}
              onChange={(c) => handleFieldChange("FLAG_API_NGO_FINANCIAL", c ? "true" : "false")}
            />
            <FeatureToggleItem
              title="CSR Programme Lifecycle API (API_PROGRAMME)"
              description="Enables corporate CSR managers to create, milestone-track, and assign vetted NGOs."
              checked={formState["FLAG_API_PROGRAMME"] === "true"}
              onChange={(c) => handleFieldChange("FLAG_API_PROGRAMME", c ? "true" : "false")}
            />
            <FeatureToggleItem
              title="Real-time Notification Feeds (REALTIME_NOTIFICATIONS)"
              description="Enables dynamic notification alerts and live status indicator badge."
              checked={formState["FLAG_REALTIME_NOTIFICATIONS"] === "true"}
              onChange={(c) => handleFieldChange("FLAG_REALTIME_NOTIFICATIONS", c ? "true" : "false")}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
        active
          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function ConfigInput({
  label,
  value,
  onChange,
  placeholder,
  description,
  type = "text",
  isSecret = false,
  showSecret = false,
  onToggleSecret,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  description?: string;
  type?: string;
  isSecret?: boolean;
  showSecret?: boolean;
  onToggleSecret?: () => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {label}
        </label>
        {isSecret && onToggleSecret && (
          <button
            type="button"
            onClick={onToggleSecret}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            {showSecret ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {showSecret ? "Hide" : "Show"}
          </button>
        )}
      </div>
      <div className="relative">
        <Input
          type={isSecret && !showSecret ? "password" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="rounded-xl border-slate-200 dark:border-slate-800 font-mono text-xs"
        />
      </div>
      {description && <p className="text-xs text-slate-500">{description}</p>}
    </div>
  );
}

function FeatureToggleItem({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </p>
          <Badge
            variant="outline"
            className={
              checked
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            }
          >
            {checked ? "ACTIVE" : "DISABLED"}
          </Badge>
        </div>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
