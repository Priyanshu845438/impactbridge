declare module "jest-axe" {
  import type { AxeResults } from "axe-core";
  export function axe(node: HTMLElement, options?: unknown): Promise<AxeResults>;
  export type { AxeResults } from "axe-core";
}
