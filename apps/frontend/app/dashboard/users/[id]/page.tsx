"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  ShieldCheck,
  UserMinus,
  UserX,
} from "lucide-react";
import { toast } from "sonner";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Button } from "@/components/ui/button";
import { SkeletonCard, SkeletonText } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type UserRole = "SUPER_ADMIN" | "NGO" | "COMPANY" | "DONOR";
type UserStatus = "Active" | "Pending" | "Suspended";

interface DirectoryUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin: string;
  assignedActions: string[];
}

const mockUserMap: Record<string, DirectoryUser> = {
  "1": {
    id: "1",
    name: "Aarti Desai",
    email: "aarti.desai@impactbridge.org",
    phone: "+91 99876 54321",
    role: "SUPER_ADMIN",
    status: "Active",
    createdAt: "12 Jan 2023",
    lastLogin: "Today, 09:15 AM",
    assignedActions: ["Platform approvals", "System configuration", "Audit oversight"],
  },
  "2": {
    id: "2",
    name: "GreenFuture Foundation",
    email: "compliance@greenfuture.org",
    phone: "+91 91234 56780",
    role: "NGO",
    status: "Pending",
    createdAt: "04 Mar 2024",
    lastLogin: "Yesterday, 08:20 PM",
    assignedActions: ["Campaign submissions", "Compliance updates"],
  },
  "3": {
    id: "3",
    name: "Acme Industries CSR",
    email: "csr-team@acmeindustries.com",
    phone: "+91 93456 78120",
    role: "COMPANY",
    status: "Active",
    createdAt: "18 Jul 2022",
    lastLogin: "Yesterday, 01:45 PM",
    assignedActions: ["Project funding", "Impact review"],
  },
  "4": {
    id: "4",
    name: "InspireGivers Trust",
    email: "hello@inspiregivers.in",
    phone: "+91 99880 11223",
    role: "DONOR",
    status: "Active",
    createdAt: "05 Nov 2023",
    lastLogin: "2 days ago",
    assignedActions: ["Donation tracking", "Report downloads"],
  },
  "5": {
    id: "5",
    name: "Swasthya Seva NGO",
    email: "care@swasthyaseva.org",
    phone: "+91 90909 11111",
    role: "NGO",
    status: "Suspended",
    createdAt: "23 Aug 2021",
    lastLogin: "5 days ago",
    assignedActions: ["Compliance remediation"],
  },
  "6": {
    id: "6",
    name: "BlueOrbit CSR",
    email: "csr@blueorbit.co",
    phone: "+91 92222 33445",
    role: "COMPANY",
    status: "Active",
    createdAt: "11 Feb 2022",
    lastLogin: "2 hours ago",
    assignedActions: ["Programme approvals", "Budget updates"],
  },
  "7": {
    id: "7",
    name: "Global Donors Collective",
    email: "contact@globaldonors.org",
    phone: "+91 98888 55667",
    role: "DONOR",
    status: "Pending",
    createdAt: "30 Apr 2024",
    lastLogin: "3 days ago",
    assignedActions: ["Contribution review"],
  },
  "8": {
    id: "8",
    name: "ImpactBridge QA",
    email: "qa@impactbridge.org",
    phone: "+91 90000 12345",
    role: "SUPER_ADMIN",
    status: "Active",
    createdAt: "07 Sep 2022",
    lastLogin: "Today, 11:05 AM",
    assignedActions: ["Testing", "Access verification"],
  },
};

const activityTimeline = [
  {
    id: 1,
    title: "Reviewed CSR programme",
    description: "Approved funding for Project Sunshine",
    timestamp: "Today · 09:10 AM",
    icon: CheckCircle2,
  },
  {
    id: 2,
    title: "Updated compliance documents",
    description: "Uploaded quarterly NGO compliance update",
    timestamp: "Yesterday · 05:30 PM",
    icon: BriefcaseBusiness,
  },
  {
    id: 3,
    title: "Logged in from Mumbai, IN",
    description: "Verified via MFA",
    timestamp: "Yesterday · 01:42 PM",
    icon: ShieldCheck,
  },
];

const roleCopy: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  NGO: "NGO",
  COMPANY: "Company",
  DONOR: "Donor",
};

const statusTone: Record<UserStatus, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Suspended: "bg-rose-100 text-rose-700",
};

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const user = useMemo(() => (userId ? mockUserMap[userId] : undefined), [userId]);

  useEffect(() => {
    if (!userId || !user) {
      return;
    }
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, [user, userId]);

  useEffect(() => {
    if (userId && !user) {
      notFound();
    }
  }, [user, userId]);

  if (!userId || !user) {
    return null;
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <SkeletonText lines={2} className="w-64" />
        <SkeletonCard className="h-24" />
        <SkeletonCard className="h-[420px]" />
      </div>
    );
  }

  const handleResetPassword = () => {
    toast.success(`Password reset link sent to ${user.email}`);
  };

  const handleDeactivateUser = () => {
    toast.warning(`${user.name} marked for deactivation (mock action)`);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="User Directory"
        subtitle="Search and manage platform users."
        action={
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              Back to directory
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleResetPassword}>
              <UserMinus className="h-4 w-4" />
              Reset Password
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-rose-200 text-rose-600 hover:bg-rose-50"
              onClick={handleDeactivateUser}
            >
              <UserX className="h-4 w-4" />
              Deactivate User
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900/10 text-lg font-semibold text-slate-700">
                  {user.name
                    .split(" ")
                    .map((part) => part.charAt(0))
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
                <div>
                  <h1 className="text-heading-2 text-slate-700">{user.name}</h1>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                      {roleCopy[user.role]}
                    </span>
                    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusTone[user.status])}>
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
            <TabsList className="grid w-full gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-1 text-xs font-semibold text-slate-500 sm:w-auto sm:grid-cols-3">
              <TabsTrigger value="overview" className="rounded-2xl px-4 py-2">
                Overview
              </TabsTrigger>
              <TabsTrigger value="activity" className="rounded-2xl px-4 py-2">
                Activity
              </TabsTrigger>
              <TabsTrigger value="permissions" className="rounded-2xl px-4 py-2">
                Permissions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoItem icon={Mail} label="Email" value={user.email} />
                <InfoItem icon={Phone} label="Phone" value={user.phone} />
                <InfoItem icon={Clock} label="Created" value={user.createdAt} />
                <InfoItem icon={Clock} label="Last login" value={user.lastLogin} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800">Assigned actions</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {user.assignedActions.map((action) => (
                    <li key={action} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="mt-6 space-y-4">
              <div className="space-y-4">
                {activityTimeline.map((event) => (
                  <div key={event.id} className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                    <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <event.icon className="h-4 w-4" />
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900">{event.title}</p>
                      <p className="text-sm text-slate-600">{event.description}</p>
                      <span className="text-xs font-medium text-slate-400">{event.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 text-sm text-slate-600">
                <p className="font-semibold text-slate-800">Role-based access</p>
                <p className="mt-2 leading-relaxed">
                  {roleCopy[user.role]} users inherit platform permissions tailored to their responsibilities. Future updates will
                  allow fine-grained overrides for data access, approval steps, integrations, and custom workflows.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <PermissionItem title="Current role" value={roleCopy[user.role]} />
                <PermissionItem title="Status" value={user.status} />
                <PermissionItem title="Approvals" value="Pending upgrades" />
                <PermissionItem title="Feature flags" value="Preview access" />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-sm">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">Quick actions</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <Button variant="outline" className="w-full justify-start gap-2" onClick={handleResetPassword}>
                <UserMinus className="h-4 w-4" />
                Send reset email
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-rose-600" onClick={handleDeactivateUser}>
                <UserX className="h-4 w-4" />
                Suspend account
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-xs text-slate-600">
            <p className="font-semibold text-slate-800">Notes</p>
            <p className="mt-2 leading-relaxed">
              Use this panel to capture key status updates or compliance notes. Audit trail will soon capture automatic
              snapshots for regulated changes.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-2 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}

interface PermissionItemProps {
  title: string;
  value: string;
}

function PermissionItem({ title, value }: PermissionItemProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{title}</p>
      <p className="mt-2 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}
