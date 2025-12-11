"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, MessageCircle, MessageSquare, Send, Users } from "lucide-react";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UpdateItem {
  id: string;
  entity: string;
  title: string;
  description: string;
  timestamp: string;
  tag: "Milestone" | "Document" | "Alert";
}

interface ConversationContact {
  id: string;
  name: string;
  role: string;
  badge: "NGO" | "Team" | "Donor";
  unread?: number;
}

interface MessageItem {
  id: string;
  author: string;
  timestamp: string;
  body: string;
  tone: "outbound" | "inbound";
}

interface OutreachTemplate {
  id: string;
  title: string;
  description: string;
  category: "Awareness" | "CSR" | "Reporting";
}

const UPDATES: UpdateItem[] = [
  {
    id: "update-1",
    entity: "Project Udaan",
    title: "Quarterly milestone achieved",
    description: "STEM lab #120 went live in Ahmednagar with 540 students onboarded.",
    timestamp: "2 hours ago",
    tag: "Milestone",
  },
  {
    id: "update-2",
    entity: "HealTrust",
    title: "Compliance document uploaded",
    description: "FY25 mobile clinics consent forms available for board review.",
    timestamp: "Yesterday • 5:42 PM",
    tag: "Document",
  },
  {
    id: "update-3",
    entity: "Internal CSR Team",
    title: "Risk alert",
    description: "Vendor onboarding pending 80G verification for two field partners.",
    timestamp: "Oct 16, 2025",
    tag: "Alert",
  },
];

const CONTACTS: ConversationContact[] = [
  { id: "contact-1", name: "Anika Rao", role: "Director • Project Udaan", badge: "NGO", unread: 2 },
  { id: "contact-2", name: "CSR Strategy Team", role: "Internal channel", badge: "Team" },
  { id: "contact-3", name: "HealTrust Ops", role: "Operations lead", badge: "NGO" },
  { id: "contact-4", name: "Board Liaison", role: "Monthly reporting", badge: "Team" },
];

const MESSAGES: MessageItem[] = [
  {
    id: "message-1",
    author: "You",
    timestamp: "Today • 10:12 AM",
    body: "Thanks for sharing the milestone deck. The board meets on Friday — can you attach the learner testimonials as well?",
    tone: "outbound",
  },
  {
    id: "message-2",
    author: "Anika Rao",
    timestamp: "Today • 10:18 AM",
    body: "Absolutely, uploading them in 15 minutes. We also have STEM lab video clips if useful for the presentation.",
    tone: "inbound",
  },
  {
    id: "message-3",
    author: "You",
    timestamp: "Today • 10:26 AM",
    body: "Video clips would be great — please drop them in this thread and tag media so they can edit.",
    tone: "outbound",
  },
];

const TEMPLATES: OutreachTemplate[] = [
  {
    id: "template-1",
    title: "Awareness email",
    description: "Introduce our CSR partnership impact with latest beneficiary stories.",
    category: "Awareness",
  },
  {
    id: "template-2",
    title: "CSR funding request",
    description: "Formal request for next tranche release with utilisation summary.",
    category: "CSR",
  },
  {
    id: "template-3",
    title: "Reporting reminder",
    description: "Gentle reminder for quarterly impact report submissions.",
    category: "Reporting",
  },
];

export default function EngagementHubPage() {
  const [activeTab, setActiveTab] = useState("updates");
  const [selectedContact, setSelectedContact] = useState(CONTACTS[0]?.id ?? "");

  const breadcrumbItems = useMemo(
    () => [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Company", href: "/dashboard/company" },
      { label: "Stakeholder Engagement Hub" },
    ],
    [],
  );

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={breadcrumbItems} />

      <header className="space-y-3">
        <Badge className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-200">
          Engagement
        </Badge>
        <div className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Stakeholder Engagement Hub</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Centralize updates, conversations, and outreach actions.
          </p>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="sticky top-0 z-10 -mx-4 bg-gradient-to-b from-white via-white to-white/70 px-4 py-2 shadow-[0_12px_20px_-16px_rgba(15,23,42,0.4)] dark:from-slate-950 dark:via-slate-950 dark:to-slate-950/80 md:-mx-6 md:px-6">
          <TabsList className="w-full justify-start gap-2 overflow-x-auto rounded-2xl bg-slate-100/80 p-1 dark:bg-slate-900/60">
            <TabsTrigger value="updates" className="rounded-xl px-4 py-2 text-sm">Updates</TabsTrigger>
            <TabsTrigger value="conversations" className="rounded-xl px-4 py-2 text-sm">Conversations</TabsTrigger>
            <TabsTrigger value="outreach" className="rounded-xl px-4 py-2 text-sm">Outreach</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="updates" className="space-y-4">
          {UPDATES.length === 0 ? (
            <EmptyState icon={<MessageSquare className="h-10 w-10 text-slate-400" />} title="No updates yet" description="Updates from partners and internal teams will appear here once shared." />
          ) : (
            <div className="space-y-4">
              {UPDATES.map((item) => (
                <Card key={item.id} className="space-y-3 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.entity}</span>
                    <Badge className={getTagTone(item.tag)}>{item.tag}</Badge>
                    <span className="text-xs text-slate-400">{item.timestamp}</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="conversations">
          {CONTACTS.length === 0 ? (
            <EmptyState icon={<Users className="h-10 w-10 text-slate-400" />} title="No conversations" description="Reach out to partners or teammates to start collaborating." />
          ) : (
            <Card className="grid gap-6 rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70 md:grid-cols-[300px,1fr]">
              <div className="space-y-3 border-b border-slate-100 pb-4 dark:border-slate-800 md:border-b-0 md:border-r md:pb-0 md:pr-4">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Contacts</h2>
                <div className="space-y-2">
                  {CONTACTS.map((contact) => (
                    <button
                      key={contact.id}
                      type="button"
                      onClick={() => setSelectedContact(contact.id)}
                      className={`w-full rounded-2xl border px-3 py-2 text-left text-sm transition ${selectedContact === contact.id ? "border-emerald-400 bg-emerald-50/60 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-200" : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{contact.name}</span>
                        {contact.unread ? <Badge className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold text-white">{contact.unread}</Badge> : null}
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>{contact.role}</span>
                        <Badge className={`rounded-full px-2 py-[1px] text-[10px] font-semibold ${getBadgeTone(contact.badge)}`}>{contact.badge}</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <header>
                  <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{CONTACTS.find((c) => c.id === selectedContact)?.name ?? "Select a contact"}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Shared thread visible to authorised team members.</p>
                </header>
                <div className="flex-1 space-y-3 overflow-y-auto">
                  {MESSAGES.length === 0 ? (
                    <EmptyState icon={<MessageCircle className="h-10 w-10 text-slate-400" />} title="No messages" description="Start a conversation to coordinate next steps." />
                  ) : (
                    MESSAGES.map((message) => (
                      <div key={message.id} className={`max-w-xl space-y-1 rounded-3xl border px-4 py-3 text-sm shadow-sm ${message.tone === "outbound" ? "ml-auto border-emerald-200 bg-emerald-50/70 text-emerald-800 dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-100" : "border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200"}`}>
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>{message.author}</span>
                          <span>{message.timestamp}</span>
                        </div>
                        <p>{message.body}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/60">
                  <div className="flex items-center gap-2">
                    <Input placeholder="Type a message" className="flex-1 border-0 bg-transparent focus-visible:ring-0" />
                    <Button className="rounded-2xl" size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="outreach">
          {TEMPLATES.length === 0 ? (
            <EmptyState icon={<ArrowUpRight className="h-10 w-10 text-slate-400" />} title="No outreach templates" description="Create templates to streamline announcements and requests." />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {TEMPLATES.map((template) => (
                <Card key={template.id} className="space-y-3 rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70">
                  <Badge className={getTemplateTone(template.category)}>{template.category}</Badge>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{template.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{template.description}</p>
                  <Button variant="outline" className="w-full gap-2 rounded-2xl">
                    Open editor
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 rounded-4xl border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center dark:border-slate-800 dark:bg-slate-900/40">
      {icon}
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </Card>
  );
}

function getTagTone(tag: UpdateItem["tag"]) {
  switch (tag) {
    case "Milestone":
      return "rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200";
    case "Document":
      return "rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-900/40 dark:text-sky-200";
    case "Alert":
      return "rounded-full bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-600 dark:bg-rose-900/40 dark:text-rose-200";
    default:
      return "rounded-full bg-slate-500/15 px-3 py-1 text-xs font-semibold text-slate-600";
  }
}

function getBadgeTone(badge: ConversationContact["badge"]) {
  switch (badge) {
    case "NGO":
      return "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200";
    case "Team":
      return "bg-sky-500/15 text-sky-600 dark:bg-sky-900/40 dark:text-sky-200";
    case "Donor":
      return "bg-amber-500/15 text-amber-600 dark:bg-amber-900/40 dark:text-amber-200";
    default:
      return "bg-slate-500/15 text-slate-600";
  }
}

function getTemplateTone(category: OutreachTemplate["category"]) {
  switch (category) {
    case "Awareness":
      return "rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200";
    case "CSR":
      return "rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-600 dark:bg-sky-900/40 dark:text-sky-200";
    case "Reporting":
      return "rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-600 dark:bg-violet-900/40 dark:text-violet-200";
    default:
      return "rounded-full bg-slate-500/15 px-3 py-1 text-xs font-semibold text-slate-600";
  }
}

