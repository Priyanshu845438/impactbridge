"use client";

import { useMutation } from '@tanstack/react-query';

import { programmes as mockProgrammes } from '../mock-data';

interface CreateProgrammeInput {
  name: string;
  summary: string;
  category: string;
  region: string;
  status: (typeof mockProgrammes)[number]['status'];
}

interface MockCreateResponse {
  success: boolean;
  programme: (typeof mockProgrammes)[number];
}

function mockCreateProgramme(input: CreateProgrammeInput): MockCreateResponse {
  const programme = {
    ...mockProgrammes[0],
    id: `programme-${Date.now()}`,
    name: input.name,
    summary: input.summary,
    category: input.category,
    region: input.region,
    status: input.status,
  } as (typeof mockProgrammes)[number];

  return { success: true, programme };
}

export function useCreateProgramme() {
  return useMutation<MockCreateResponse, Error, CreateProgrammeInput>({
    mutationFn: async (input) => mockCreateProgramme(input),
  });
}

