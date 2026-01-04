"use client";

import { FormEvent, useState } from 'react';
import Link from 'next/link';

import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateProgramme } from '../hooks/useCreateProgramme';
import { programmes } from '../mock-data';

const statusOptions = [
  { value: 'Active', label: 'Active' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Upcoming', label: 'Upcoming' },
];

const categoryOptions = ['Education', 'Healthcare', 'Environment', 'Livelihood', 'Infrastructure', 'Agriculture'];
const regionOptions = ['Maharashtra', 'Uttarakhand', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'Madhya Pradesh'];

export default function CreateProgrammePage() {
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState(categoryOptions[0]);
  const [region, setRegion] = useState(regionOptions[0]);
  const [status, setStatus] = useState(statusOptions[0].value);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createProgramme = useCreateProgramme();

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Company', href: '/dashboard/company' },
    { label: 'CSR Programmes', href: '/dashboard/company/programmes' },
    { label: 'Create Programme' },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim() || !summary.trim()) {
      setError('Name and summary are required.');
      return;
    }

    createProgramme.mutate(
      {
        name,
        summary,
        category,
        region,
        status: status as (typeof programmes)[number]['status'],
      },
      {
        onSuccess: () => {
          setSuccess(true);
        },
        onError: () => {
          setError('Something went wrong while creating the programme.');
        },
      },
    );
  };

  return (
    <div className="space-y-8 pb-16">
      <Breadcrumb items={breadcrumbItems} />
      <Card className="space-y-6 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Create CSR Programme</h1>
          <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            Outline the programme basics to begin collaborating with NGOs and capturing impact insights.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="programme-name">Programme name</Label>
              <Input
                id="programme-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Rural STEM Labs Expansion"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="programme-status">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="programme-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="programme-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="programme-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="programme-region">Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger id="programme-region">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regionOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="programme-summary">Summary</Label>
            <Textarea
              id="programme-summary"
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              placeholder="Briefly describe the programme goals, beneficiaries, and expected impact."
              rows={4}
            />
          </div>

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          {success ? (
            <div className="space-y-2 rounded-3xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-700">
              <p className="font-medium">Programme created successfully.</p>
              <p>
                You can now
                <Link href="/dashboard/company/programmes" className="ml-1 underline">
                  return to the programme directory
                </Link>
                to manage the new entry.
              </p>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button type="submit" className="rounded-2xl" disabled={createProgramme.isPending}>
              {createProgramme.isPending ? 'Creating…' : 'Create programme'}
            </Button>
            <Button type="button" variant="ghost" className="rounded-2xl" onClick={() => window.history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

