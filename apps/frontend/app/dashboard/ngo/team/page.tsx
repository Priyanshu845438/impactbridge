"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  CircleCheck,
  CircleDashed,
  Mail,
  Pencil,
  Plus,
  Trash2,
  UserCircle,
} from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { SectionHeader } from "@/components/dashboard/section-header";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type TeamRole = "Viewer" | "Editor" | "Manager";
type MemberStatus = "Active" | "Pending";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: MemberStatus;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "tm-01",
    name: "Riya Sharma",
    email: "riya.sharma@impactngo.org",
    role: "Manager",
    status: "Active",
  },
  {
    id: "tm-02",
    name: "Aakash Patel",
    email: "aakash.patel@impactngo.org",
    role: "Editor",
    status: "Active",
  },
  {
    id: "tm-03",
    name: "Lavanya Iyer",
    email: "lavanya.iyer@impactngo.org",
    role: "Viewer",
    status: "Pending",
  },
];

const roleDescriptions: Record<TeamRole, string> = {
  Viewer: "Can view dashboards and reports",
  Editor: "Can manage campaigns and documents",
  Manager: "Full access to invite and manage members",
};

const roleTone: Record<TeamRole, string> = {
  Viewer: "bg-slate-100 text-slate-700 dark:bg-slate-800/40 dark:text-slate-200",
  Editor: "bg-sky-100 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200",
  Manager: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200",
};

const statusTone: Record<MemberStatus, string> = {
  Active: "text-emerald-600 dark:text-emerald-300",
  Pending: "text-amber-500 dark:text-amber-200",
};

export default function NGOTeamPage() {
  const [members, setMembers] = useState(mockTeamMembers);
  const [isLoading] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard/ngo" },
      { label: "Team Members" },
    ],
    [],
  );

  function handleInviteSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("fullName")?.toString() ?? "New teammate";
    setInviteOpen(false);
    toast.success(`${name} has been invited`, { description: "Once they accept, their status will switch to Active." });
  }

  function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editMember) return;
    const form = new FormData(event.currentTarget);
    const role = form.get("role")?.toString() as TeamRole;
    toast.success(`Updated ${editMember.name}`, { description: `Role changed to ${role}` });
    setMembers((previous) => previous.map((member) => (member.id === editMember.id ? { ...member, role } : member)));
    setEditMember(null);
  }

  return (
    <div className="space-y-8 pb-12">
      <Breadcrumb items={breadcrumbItems} />

      <SectionHeader
        title="Team Members"
        subtitle="Manage access and roles within your organisation."
        action={
          <Button className="gap-2" onClick={() => setInviteOpen(true)}>
            <Plus className="h-4 w-4" />
            Invite Member
          </Button>
        }
      />

      <section className="rounded-4xl border border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="space-y-6 p-6">
          {isLoading ? (
            <TeamTableSkeleton />
          ) : members.length === 0 ? (
            <EmptyState />
          ) : (
            <TeamTable members={members} onEdit={setEditMember} onRemove={(member) => toast.info(`Remove ${member.name}`, { description: "Removal flow coming soon" })} />
          )}
        </div>
      </section>

      <InviteMemberModal open={inviteOpen} onClose={() => setInviteOpen(false)} onSubmit={handleInviteSubmit} />

      <EditMemberModal member={editMember} onClose={() => setEditMember(null)} onSubmit={handleEditSubmit} />
    </div>
  );
}

function TeamTable({ members, onEdit, onRemove }: { members: TeamMember[]; onEdit: (member: TeamMember) => void; onRemove: (member: TeamMember) => void }) {
  return (
    <div className="space-y-4">
      <div className="hidden rounded-3xl border border-slate-200 dark:border-slate-800 lg:block">
        <Table>
          <TableHeader>
            <TableRow className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              <TableHead className="w-[40px]">Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[140px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id} className="text-sm text-slate-600 dark:text-slate-300">
                <TableCell>
                  <AvatarBubble name={member.name} />
                </TableCell>
                <TableCell className="font-medium text-slate-900 dark:text-slate-50">{member.name}</TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400">{member.email}</TableCell>
                <TableCell>
                  <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold", roleTone[member.role])}>
                    {member.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={cn("inline-flex items-center gap-2 text-sm font-medium", statusTone[member.status])}>
                    {member.status === "Active" ? <CircleCheck className="h-4 w-4" /> : <CircleDashed className="h-4 w-4" />}
                    {member.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => onEdit(member)}>
                      <Pencil className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600" onClick={() => onRemove(member)}>
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid gap-3 lg:hidden">
        {members.map((member) => (
          <Card key={member.id} className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center gap-3">
              <AvatarBubble name={member.name} />
              <div>
                <p className="text-base font-semibold text-slate-900 dark:text-slate-50">{member.name}</p>
                <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                  <Mail className="h-4 w-4" aria-hidden />
                  {member.email}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold", roleTone[member.role])}>
                {member.role}
              </span>
              <span className={cn("inline-flex items-center gap-2 text-sm font-medium", statusTone[member.status])}>
                {member.status === "Active" ? <CircleCheck className="h-4 w-4" /> : <CircleDashed className="h-4 w-4" />}
                {member.status}
              </span>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="gap-2" onClick={() => onEdit(member)}>
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="ghost" className="text-rose-500 hover:text-rose-600" onClick={() => onRemove(member)}>
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function InviteMemberModal({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Invite team member" description="Send an invite email with role-based access.">
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400" htmlFor="fullName">
            Full name
          </label>
          <Input id="fullName" name="fullName" placeholder="e.g. Priya Kapoor" required />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400" htmlFor="email">
            Email address
          </label>
          <Input id="email" name="email" type="email" placeholder="name@impactngo.org" required />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Role</label>
          <Select name="role" defaultValue="Viewer">
            <SelectTrigger>
              <SelectValue placeholder="Choose a role" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(roleDescriptions).map(([role, description]) => (
                <SelectItem key={role} value={role}>
                  <div className="flex flex-col">
                    <span className="font-medium">{role}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Textarea placeholder="Include a personal note (optional)" className="min-h-[90px]" />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="gap-2">
            <BadgeCheck className="h-4 w-4" />
            Send invitation
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function EditMemberModal({ member, onClose, onSubmit }: { member: TeamMember | null; onClose: () => void; onSubmit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <Modal
      open={Boolean(member)}
      onClose={onClose}
      title={member ? `Edit ${member.name}` : "Edit member"}
      description="Adjust access levels anytime."
    >
      {member ? (
        <form className="space-y-4" onSubmit={onSubmit}>
          <input type="hidden" name="memberId" value={member.id} />
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400" htmlFor="role">
              Role
            </label>
            <Select name="role" defaultValue={member.role}>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(roleDescriptions).map(([role, description]) => (
                  <SelectItem key={role} value={role}>
                    <div className="flex flex-col">
                      <span className="font-medium">{role}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900/60">
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-50">Account is active</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Toggle to disable or reactivate member access</p>
            </div>
            <Switch checked={member.status === "Active"} onCheckedChange={() => {}} disabled />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              Save changes
            </Button>
          </div>
        </form>
      ) : (
        <TeamTableSkeleton />
      )}
    </Modal>
  );
}

function TeamTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="hidden rounded-3xl border border-slate-200 p-4 dark:border-slate-800 lg:block">
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-14 w-full rounded-2xl" />
          ))}
        </div>
      </div>
      <div className="grid gap-3 lg:hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
            <Skeleton className="h-8 w-full rounded-2xl" />
            <Skeleton className="h-10 w-full rounded-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white/80 p-12 text-center dark:border-slate-700 dark:bg-slate-900/60">
      <UserCircle className="h-12 w-12 text-slate-400" aria-hidden />
      <div className="space-y-1">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">No team members yet</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">Invite someone to collaborate with your NGO workspace.</p>
      </div>
      <Button className="gap-2">
        <Plus className="h-4 w-4" />
        Invite member
      </Button>
    </div>
  );
}

function AvatarBubble({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
      {initials}
    </span>
  );
}
