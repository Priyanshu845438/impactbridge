import { renderHook } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { useExampleQuery } from '@/lib/hooks/use-example-query';
import { createQueryClient } from '@/lib/query-client';

describe('useExampleQuery', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={createQueryClient()}>
      {children}
    </QueryClientProvider>
  );

  it('returns placeholder data and success status', async () => {
    const { result } = renderHook(() => useExampleQuery(), { wrapper });

    expect(result.current.data).toEqual({ message: 'React Query ready' });
    expect(result.current.isSuccess).toBe(true);
  });
});
