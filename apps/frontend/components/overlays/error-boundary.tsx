"use client";

import { Component, ErrorInfo, type ReactNode } from "react";

import { FallbackPanel } from "@/components/overlays/fallback-panel";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary caught an error", error, info);
    }
  }

  override render() {
    if (this.state.hasError) {
      return <FallbackPanel />;
    }

    return this.props.children;
  }
}
