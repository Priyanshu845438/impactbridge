import { render } from '@testing-library/react';
import { ReactNode } from 'react';

import { ErrorBoundary } from '@/components/overlays/error-boundary';

function Thrower({ children }: { children?: ReactNode }) {
  if (!children) {
    throw new Error('boom');
  }
  return <>{children}</>;
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <p>hello world</p>
      </ErrorBoundary>,
    );

    expect(getByText('hello world')).toBeInTheDocument();
  });

  it('renders fallback when child throws', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>,
    );

    expect(getByText('Something went wrong')).toBeInTheDocument();
    expect(
      getByText("We're having trouble loading this section right now. Please refresh or try again in a few minutes."),
    ).toBeInTheDocument();
  });
});
