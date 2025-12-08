"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock3,
  FileText,
  Mail,
  MapPin,
  NotebookPen,
  Phone,
  ReceiptIndianRupee,
  UserRound,
} from "lucide-react";

import Link from "next/link";

import { SectionHeader } from "@/components/dashboard/section-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

const DONORS = [
  {
    id: "donor-001",
    name: "Aarav Mehta",
    email: "aarav.mehta@email.com",
    phone: "+91 98989 12345",
    status: "Active" as const,
    city: "Mumbai",
    state: "Maharashtra",
    address: "703 Nariman Point, Mumbai, Maharashtra - 400021",
    donationsCount: 18,
    totalAmount: "₹12,50,000",
    lastDonationDate: "24 Jan 2025",
    notes: [
      {
        id: "note-1",
        author: "Maya Sen",
        content: "Prefers quarterly donation updates. Responds quickly on email.",
        timestamp: "added 12 Feb 2025",
      },
      {
        id: "note-2",
        author: "Aditya Patel",
        content: "Invited to Mumbai CSR dinner. RSVP pending confirmation.",
        timestamp: "added 30 Jan 2025",
      },
    ],
    donations: [
      {
        id: "txn-1101",
        programme: "Urban Shelter Expansion",
        amount: "₹1,50,000",
        date: "24 Jan 2025",
        status: "Successful",
      },
      {
        id: "txn-1086",
        programme: "STEM Learning Labs",
        amount: "₹2,00,000",
        date: "08 Dec 2024",
        status: "Successful",
      },
      {
        id: "txn-1024",
        programme: "Rural Health Camps",
        amount: "₹95,000",
        date: "18 Sep 2024",
        status: "Successful",
      },
    ],
  },
  {
    id: "donor-002",
    name: "Ishita Sharma",
    email: "ishita.sharma@email.com",
    phone: "+91 99221 98760",
    status: "Invited" as const,
    city: "Delhi",
    state: "Delhi",
    address: "4 Barakhamba Road, Connaught Place, New Delhi - 110001",
    donationsCount: 6,
    totalAmount: "₹6,80,000",
    lastDonationDate: "12 Feb 2025",
    notes: [
      {
        id: "note-3",
        author: "Priya Menon",
        content: "Interested in impact reports focusing on education outcomes.",
        timestamp: "added 10 Feb 2025",
      },
    ],
    donations: [
      {
        id: "txn-2041",
        programme: "Clean Water Initiative",
        amount: "₹1,25,000",
        date: "12 Feb 2025",
        status: "Successful",
      },
      {
        id: "txn-1932",
        programme: "Girl Child Scholarship",
        amount: "₹1,55,000",
        date: "15 Nov 2024",
        status: "Successful",
      },
    ],
  },
];

function findDonorById(id: string | undefined) {
  if (!id) return undefined;
  return DONORS.find((donor) => donor.id === id);
}

export default function DonorDetailPage() {
  const params = useParams();
  const donorId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [addingNote, setAddingNote] = useState(false);
  const [noteDraft, setNoteDraft] = useState("");

  const donor = useMemo(() => findDonorById(donorId), [donorId]);

  if (!donorId) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="h-24 w-full rounded-3xl" />
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="space-y-6 text-center">
        <Skeleton className="mx-auto h-20 w-20 rounded-full" />
        <p className="text-lg font-semibold text-slate-600">Donor profile not found</p>
        <p className="text-sm text-slate-500">
          The donor record you are trying to access does not exist or has been archived.
        </p>
        <Button asChild>
          <Link href="/dashboard/admin/donors">Go back to Donor Management</Link>
        </Button>
      </div>
    );
  }

  const handleAddNote = () => {
    if (!noteDraft.trim()) return;
    setAddingNote(true);
    setTimeout(() => {
      setNoteDraft("");
      setAddingNote(false);
    }, 500);
  };

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard/admin" },
          { label: "Donor Management", href: "/dashboard/admin/donors" },
          { label: donor.name },
        ]}
      />

      <SectionHeader
        title="Donor profile"
        subtitle="Snapshot of donor engagement, contribution trends, and notes from relationship managers."
        action={
          <Button type="button" variant="outline" className="gap-2">
            <NotebookPen className="h-4 w-4" />
            Edit
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200">
                <UserRound className="h-7 w-7" />
              </span>
              <div>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">{donor.name}</CardTitle>
                <div className="mt-2 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${donor.email}`} className="font-medium text-brand-600 transition hover:text-brand-700">
                    {donor.email}
                  </a>
                </div>
                <div className="mt-2 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${donor.phone.replace(/\s+/g, "")}`} className="font-medium text-brand-600 transition hover:text-brand-700">
                    {donor.phone}
                  </a>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
              {donor.status}
            </Badge>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Mailing address</p>
                <p className="mt-1 leading-relaxed">{donor.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ReceiptIndianRupee className="mt-1 h-4 w-4 text-slate-400" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Total contributions</p>
                <p className="mt-1 text-base font-semibold text-slate-900 dark:text-slate-100">{donor.totalAmount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Contribution summary
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Donations count</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{donor.donationsCount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Total amount</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{donor.totalAmount}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Last donation</p>
              <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">{donor.lastDonationDate}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="flex w-full flex-wrap items-center justify-start gap-3 rounded-2xl border border-slate-200 bg-white/70 p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <TabsTrigger value="profile">Profile info</TabsTrigger>
          <TabsTrigger value="donations">Donation history</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Contact details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Full name</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{donor.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Email</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{donor.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Phone</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">{donor.phone}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">City & State</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
                  {donor.city}, {donor.state}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Address</p>
                <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-300">{donor.address}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Donation history
                </CardTitle>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Track donations made across programmes.
                </p>
              </div>
              <Button type="button" variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Export report
              </Button>
            </CardHeader>
            <CardContent>
              <div className="hidden min-w-[680px] lg:block">
                <Table>
                  <TableHeader className="bg-slate-50/80 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 dark:bg-slate-900/40">
                    <TableRow>
                      <TableHead>Programme</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donor.donations.map((donation) => (
                      <TableRow key={donation.id} className="text-sm text-slate-600 dark:text-slate-300">
                        <TableCell>{donation.programme}</TableCell>
                        <TableCell>{donation.amount}</TableCell>
                        <TableCell>{donation.date}</TableCell>
                        <TableCell>{donation.status}</TableCell>
                      </TableRow>
                    ))}
                    {!donor.donations.length ? (
                      <TableRow>
                        <TableCell colSpan={4} className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                          No donations recorded yet.
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-3 lg:hidden">
                {donor.donations.length ? (
                  donor.donations.map((donation) => (
                    <div key={donation.id} className="rounded-2xl border border-slate-200 p-4 shadow-sm dark:border-slate-800">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{donation.programme}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{donation.amount}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="h-4 w-4" />
                        {donation.date}
                      </div>
                      <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-400">{donation.status}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    No donation records yet.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-100">Relationship notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Textarea
                  value={noteDraft}
                  onChange={(event) => setNoteDraft(event.target.value)}
                  placeholder="Record key interactions, preferences, or commitments. Visible to partnership teams."
                  className="min-h-[140px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900/40"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    Notes will be timestamped automatically and visible to admin collaborators.
                  </p>
                  <Button type="button" onClick={handleAddNote} disabled={addingNote || !noteDraft.trim()} className="gap-2">
                    {addingNote ? <Clock3 className="h-4 w-4 animate-spin" /> : <NotebookPen className="h-4 w-4" />}
                    {addingNote ? "Saving..." : "Save note"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {donor.notes.length ? (
                  donor.notes.map((note) => (
                    <div key={note.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{note.author}</span>
                        <span>{note.timestamp}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{note.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    No notes yet. Record donor interactions to keep your team aligned.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
