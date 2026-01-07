import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProgrammeDetailPage from "@/app/dashboard/company/programmes/[id]/page";
import { programmes as mockProgrammes } from "@/app/dashboard/company/programmes/mock-data";

const apiFlags = {
  API_DASHBOARD: false,
  REALTIME_NOTIFICATIONS: false,
  SERVER_NAVIGATION: false,
  API_AUTH: false,
  API_PROGRAMME: true,
};

const mockGetFeatureFlags = jest.fn(() => apiFlags);

const mockUseProgrammeDetail = jest.fn(() => ({
  data: null,
  isLoading: false,
  isError: false,
}));

const mockNotFound = jest.fn();

jest.mock("@/lib/feature-flags", () => ({
  getFeatureFlags: () => mockGetFeatureFlags(),
}));

jest.mock("@/lib/hooks/use-company-programmes", () => ({
  useProgrammeDetail: (options: { programmeId: string; enabled: boolean }) =>
    mockUseProgrammeDetail(options),
}));

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: mockProgrammes[0].id }),
  notFound: () => mockNotFound(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentPropsWithoutRef<"img">) => <img {...props} alt={props.alt ?? ""} />,
}));

function renderWithQuery(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe("CSR programme detail page – API flag on", () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockUseProgrammeDetail.mockReturnValue({ data: null, isLoading: false, isError: false });
  });

  it("renders API detail payload when hook succeeds", async () => {
    const apiDetail = {
      id: "api-programme",
      title: "API Programme",
      description: "API description",
      status: "ACTIVE",
      budget: 1400000,
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      companyId: "company-1",
      milestones: [],
      assignments: [],
      createdAt: "2026-01-01",
      updatedAt: "2026-01-02",
    } as const;

    mockUseProgrammeDetail.mockReturnValueOnce({
      data: apiDetail,
      isLoading: false,
      isError: false,
    });

    renderWithQuery(<ProgrammeDetailPage />);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /API Programme/i })).toBeInTheDocument();
    });

    expect(mockUseProgrammeDetail).toHaveBeenCalledWith({
      programmeId: mockProgrammes[0].id,
      enabled: true,
    });
    expect(screen.queryByText(mockProgrammes[0].summary)).not.toBeInTheDocument();
    expect(mockNotFound).not.toHaveBeenCalled();
  });

  it("falls back to mock detail when API gives empty data", async () => {
    mockUseProgrammeDetail.mockReturnValueOnce({
      data: null,
      isLoading: false,
      isError: false,
    });

    renderWithQuery(<ProgrammeDetailPage />);

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: mockProgrammes[0].name })).toBeInTheDocument();
    });

    expect(mockUseProgrammeDetail).toHaveBeenCalledWith({
      programmeId: mockProgrammes[0].id,
      enabled: true,
    });
    expect(mockNotFound).not.toHaveBeenCalled();
  });

  it("shows skeleton while loading", async () => {
    mockUseProgrammeDetail.mockReturnValueOnce({
      data: null,
      isLoading: true,
      isError: false,
    });

    renderWithQuery(<ProgrammeDetailPage />);

    await waitFor(() => {
      expect(screen.getByTestId("programme-detail-skeleton")).toBeInTheDocument();
    });
  });

  it("renders error state if API errors", async () => {
    mockUseProgrammeDetail.mockReturnValueOnce({
      data: null,
      isLoading: false,
      isError: true,
    });

    renderWithQuery(<ProgrammeDetailPage />);

    await waitFor(() => {
      expect(screen.getByText(/Unable to load programme details/i)).toBeInTheDocument();
    });
  });
});
