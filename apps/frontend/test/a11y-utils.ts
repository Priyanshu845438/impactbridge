import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import type { AxeResults } from "jest-axe";
import { axe } from "jest-axe";

export async function runAxe(ui: ReactElement): Promise<AxeResults> {
  const { container } = render(ui);
  return axe(container);
}

export function logViolations(results: AxeResults) {
  if (!results.violations.length) {
    return;
  }

  results.violations.forEach((violation) => {
    const nodes = violation.nodes.map((node) => node.target).join(", ");
    // eslint-disable-next-line no-console
    console.warn(`A11y violation: ${violation.id} (${violation.impact ?? 'unknown'})`, nodes);
  });
}
