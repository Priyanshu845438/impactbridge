import "@testing-library/jest-dom";

if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}

if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {};
}

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
Element.prototype.getBoundingClientRect = function getBoundingClientRect() {
  if (this instanceof HTMLElement) {
    return {
      width: 800,
      height: 600,
      top: 0,
      left: 0,
      right: 800,
      bottom: 600,
      x: 0,
      y: 0,
      toJSON: () => {},
    };
  }
  return originalGetBoundingClientRect.call(this);
};
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
