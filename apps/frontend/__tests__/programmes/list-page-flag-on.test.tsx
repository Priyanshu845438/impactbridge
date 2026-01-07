import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import CompanyProgrammeDirectoryPage from "@/app/dashboard/company/programmes/page";
import { programmes as mockProgrammes } from "@/app/dashboard/company/programmes/mock-data";

const mockGetFeatureFlags = jest.fn(() => ({
  API_DASHBOARD: false,
  REALTIME_NOTIFICATIONS: false,
  SERVER_NAVIGATION: false,
  API_AUTH: false,
  API_PROGRAMME: true,
}));

const mockUseCompanyProgrammes = jest.fn(() => ({
  data: [],
  isLoading: false,
  isError: false,
}));

jest.mock("@/lib/feature-flags", () => ({
  getFeatureFlags: () => mockGetFeatureFlags(),
}));

jest.mock("@/lib/hooks/use-company-programmes", () => ({
  useCompanyProgrammes: (options: { enabled: boolean }) => mockUseCompanyProgrammes(options),
}));

jest.mock("@/hooks/use-debounced-value", () => ({
  useDebouncedValue: <T,>(value: T) => value,
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

describe("CSR programme list page – API flag on", () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockUseCompanyProgrammes.mockReturnValue({ data: [], isLoading: false, isError: false });
  });

  it("renders API results when hook returns payload", async () => {
    const apiProgrammes = [
      {
        id: "api-1",
        title: "API Programme",
        description: "Programme from backend",
        ownerCompanyId: "company-1",
        ngoId: undefined,
        state: "ACTIVE",
        startDate: undefined,
        endDate: undefined,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-02T00:00:00.000Z",
      },
    ];

    mockUseCompanyProgrammes.mockReturnValueOnce({
      data: apiProgrammes,
      isLoading: false,
      isError: false,
    });

    renderWithQuery(<CompanyProgrammeDirectoryPage />);

    await waitFor(() => {
      expect(screen.getByText("API Programme")).toBeInTheDocument();
    });

    expect(mockUseCompanyProgrammes).toHaveBeenCalledWith({ enabled: true });
    expect(screen.queryByText(mockProgrammes[0].name)).not.toBeInTheDocument();
  });

  it("falls back to mock grid when API returns empty", async () => {
    mockUseCompanyProgrammes.mockReturnValueOnce({
      data: [],
      isLoading: false,
      isError: false,
    });

    renderWithQuery(<CompanyProgrammeDirectoryPage />);

    await waitFor(() => {
      expect(screen.getByText(mockProgrammes[0].name)).toBeInTheDocument();
    });

    expect(mockUseCompanyProgrammes).toHaveBeenCalledWith({ enabled: true });
  });

  it("shows skeleton while loading", async () => {
    mockUseCompanyProgrammes.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderWithQuery(<CompanyProgrammeDirectoryPage />);

    expect(await screen.findAllByTestId("programme-skeleton-card")).toHaveLength(6);
  });

it("shows error banner when API errors", async () => {
  mockUseCompanyProgrammes.mockReturnValueOnce({
    data: undefined,
    isLoading: false,
    isError: true,
  });

  renderWithQuery(<CompanyProgrammeDirectoryPage />);

  await waitFor(() => {
    expect(screen.getByText(/Programme data unavailable/i)).toBeInTheDocument();
  });
});
});
