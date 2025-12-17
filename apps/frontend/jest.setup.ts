import "@testing-library/jest-dom";

global.ResizeObserver = class ResizeObserver {
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }
  observe(target: Element) {
    this.callback([{
      target,
      contentRect: target.getBoundingClientRect(),
      borderBoxSize: [],
      contentBoxSize: [],
      devicePixelContentBoxSize: [],
    }], this);
  }
  unobserve() {
    // no-op
  }
  disconnect() {
    // no-op
  }
};

// Silence noisy Recharts warnings during jsdom-based tests
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("The width")) {
    return;
  }
  originalWarn(...(args as [unknown, ...unknown[]]));
};
