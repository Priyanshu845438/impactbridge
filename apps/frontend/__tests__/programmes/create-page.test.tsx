import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import CreateProgrammePage from '@/app/dashboard/company/programmes/new/page';

const mutateMock = jest.fn();

jest.mock('@/app/dashboard/company/programmes/hooks/useCreateProgramme', () => ({
  useCreateProgramme: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
}));

describe('Create Programme Page (mock baseline)', () => {
  function renderWithProviders() {
    const queryClient = new QueryClient();
    return render(
      <QueryClientProvider client={queryClient}>
        <CreateProgrammePage />
      </QueryClientProvider>,
    );
  }

  beforeEach(() => {
    mutateMock.mockReset();
  });

  it('shows validation error when required fields missing', async () => {
    const user = userEvent.setup();
    renderWithProviders();

    await user.click(screen.getByRole('button', { name: /create programme/i }));

    expect(screen.getByText(/name and summary are required/i)).toBeInTheDocument();
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it('submits form via mock mutation and shows success message', async () => {
    const user = userEvent.setup();
    mutateMock.mockImplementation((input, options) => {
      options?.onSuccess?.({ success: true, programme: { id: 'mock-id' } } as any);
    });

    renderWithProviders();

    await user.type(screen.getByLabelText(/programme name/i), 'New Programme');
    await user.type(screen.getByLabelText(/summary/i), 'Brief summary');

    await user.click(screen.getByRole('button', { name: /create programme/i }));

    expect(mutateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'New Programme',
        summary: 'Brief summary',
      }),
      expect.any(Object),
    );

    expect(await screen.findByText(/programme created successfully/i)).toBeInTheDocument();
  });
});
