import React from "react";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";

import CompanyProgrammeDirectoryPage from "@/app/dashboard/company/programmes/page";
import ProgrammeDetailPage from "@/app/dashboard/company/programmes/[id]/page";
import type { FeatureFlags } from "@/lib/feature-flags";

const baseFlags: FeatureFlags = {
  API_DASHBOARD: false,
  REALTIME_NOTIFICATIONS: false,
  SERVER_NAVIGATION: false,
  API_AUTH: false,
  API_PROGRAMME: false,
};

const mockGetFeatureFlags = jest.fn(() => baseFlags);

jest.mock("@/lib/feature-flags", () => ({
  getFeatureFlags: () => mockGetFeatureFlags(),
}));

jest.mock("@/lib/hooks/use-company-programmes", () => ({
  useCompanyProgrammes: jest.fn(() => ({
    data: undefined,
    isLoading: false,
    isError: false,
  })),
  useProgrammeDetail: jest.fn(() => ({
    data: null,
    isLoading: false,
    isError: false,
  })),
}));

jest.mock("@/hooks/use-debounced-value", () => ({
  useDebouncedValue: <T,>(value: T) => value,
}));

const mockPush = jest.fn();
let mockParams = { id: "programme-1" } as { id?: string };
const mockNotFound = jest.fn(() => undefined);

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useParams: () => mockParams,
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

function QueryClientTestProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

function renderWithProviders(ui: React.ReactElement) {
  return render(ui, { wrapper: QueryClientTestProvider });
}

describe("Company CSR programme directory", () => {
  it("renders filters and programme cards", () => {
    mockGetFeatureFlags.mockReturnValueOnce(baseFlags);
    renderWithProviders(<CompanyProgrammeDirectoryPage />);

    expect(screen.getByRole("heading", { name: /CSR Programmes/i })).toBeInTheDocument();
    expect(screen.getAllByRole("combobox")).toHaveLength(3);
    expect(screen.getByPlaceholderText(/Search programme/i)).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 }).length).toBeGreaterThan(0);
  });

  it("filters programmes by search and status", async () => {
    const user = userEvent.setup();
    mockGetFeatureFlags.mockReturnValueOnce(baseFlags);
    renderWithProviders(<CompanyProgrammeDirectoryPage />);

    const searchInput = screen.getByPlaceholderText(/Search programme/i);
    await user.type(searchInput, "mobile health");

    expect(await screen.findByText(/Mobile Health Clinics/i)).toBeInTheDocument();

    const statusSelect = screen.getAllByRole("combobox")[1];
    await user.click(statusSelect);
    await user.click(screen.getByRole("option", { name: /Completed/i }));

    expect(screen.getByText(/No programmes match your filters/i)).toBeInTheDocument();
  });

  it("shows skeleton while loading", () => {
    mockGetFeatureFlags.mockReturnValueOnce({ ...baseFlags, API_PROGRAMME: true });
    const { useCompanyProgrammes } = require("@/lib/hooks/use-company-programmes");
    (useCompanyProgrammes as jest.Mock).mockReturnValueOnce({ data: undefined, isLoading: true, isError: false });

    renderWithProviders(<CompanyProgrammeDirectoryPage />);

    expect(screen.getAllByTestId("programme-skeleton-card")).toHaveLength(6);
  });
});

describe("Company CSR programme detail", () => {
  it("renders programme information and tabs", () => {
    mockGetFeatureFlags.mockReturnValueOnce(baseFlags);
    const { useProgrammeDetail } = require("@/lib/hooks/use-company-programmes");
    (useProgrammeDetail as jest.Mock).mockReturnValueOnce({ data: null, isLoading: false, isError: false });
    renderWithProviders(<ProgrammeDetailPage />);

    expect(screen.getByRole("heading", { name: /Rural STEM Labs/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /banner/i })).toBeInTheDocument();
    expect(screen.getByText(/Programme overview/i)).toBeInTheDocument();
    expect(screen.getByText(/NGO profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Milestones/i)).toBeInTheDocument();
    expect(screen.getByText(/Documents/i)).toBeInTheDocument();
    expect(screen.getByText(/Updates/i)).toBeInTheDocument();
    expect(mockNotFound).not.toHaveBeenCalled();
  });

  it("handles invalid programme id with notFound", () => {
    mockParams = { id: "missing" };
    const notFoundError = new Error("notFound");
    mockNotFound.mockImplementation(() => {
      throw notFoundError;
    });

    mockGetFeatureFlags.mockReturnValueOnce(baseFlags);
    const { useProgrammeDetail } = require("@/lib/hooks/use-company-programmes");
    (useProgrammeDetail as jest.Mock).mockReturnValueOnce({ data: null, isLoading: false, isError: false });
    expect(() => renderWithProviders(<ProgrammeDetailPage />)).toThrow(notFoundError);
    expect(mockNotFound).toHaveBeenCalled();

    mockParams = { id: "programme-1" };
    mockNotFound.mockImplementation(() => undefined);
  });
});

afterEach(() => {
  jest.clearAllMocks();
  mockGetFeatureFlags.mockReset();
  mockGetFeatureFlags.mockReturnValue(baseFlags);

  const moduleMocks = require("@/lib/hooks/use-company-programmes");
  (moduleMocks.useCompanyProgrammes as jest.Mock).mockReset();
  (moduleMocks.useCompanyProgrammes as jest.Mock).mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: false,
  });

  (moduleMocks.useProgrammeDetail as jest.Mock).mockReset();
  (moduleMocks.useProgrammeDetail as jest.Mock).mockReturnValue({
    data: null,
    isLoading: false,
    isError: false,
  });

  mockParams = { id: "programme-1" };
});
