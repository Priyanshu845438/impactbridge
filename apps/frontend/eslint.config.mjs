// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...storybook.configs.flat,
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      storybook,
    },
    rules: {
      ...storybook.configs[0].rules,
    },
  },
]);

eslintConfig.push({
  rules: {
    "no-restricted-imports": ['error', {
      name: "@percy/storybook",
      message: "Percy imports are disabled until Chromium libs are installed. See docs/README.visual-regression.md."
    }]
  }
});

export default eslintConfig;
