# Visual Regression Prep

Percy is configured but intentionally **disabled** until the container has the required headless Chromium libraries.

## Why it is disabled
- Percy Storybook runs require OS packages like `libgtk-3`, `libx11`, `libdrm`, and others.
- The current environment lacks these dependencies, so running Percy would fail with missing `.so` errors.

## Re-enabling Percy later
1. Install the necessary libraries (Ubuntu example):
   ```bash
   sudo apt-get update
   sudo apt-get install -y libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 xvfb
   ```
2. Start Storybook: `npm run storybook`
3. Execute snapshots: `npm run snapshot:ui:run`

## Guard Rails
- `npm run snapshot:ui` prints a warning instead of launching Percy.
- ESLint forbids importing `@percy/storybook` in app code until ready.
- Jest guard test ensures `snapshots/analytics/` stays empty to avoid accidental commits.

Track progress in `docs/FRONTEND_TODO.md` under the Storybook/Percy section.
