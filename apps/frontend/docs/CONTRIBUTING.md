# Contributing Guide

## Getting Started
1. Install dependencies: `npm install`
2. Create `.env.local` with `NEXT_PUBLIC_API_URL`
3. Run dev server: `npm run dev -- --port 3400`
4. Lint before pushing: `npm run lint`
5. For production check: `npm run build`

## Branch & Commit Guidelines
- Follow feature branches (`feature/<name>`), fix branches (`fix/<name>`)
- Write descriptive commit messages (e.g., `feat: add admin module placeholders`)
- Keep commits focused; avoid bundling unrelated changes

## Code Style
- TypeScript strictness enabled; avoid `any`
- Use existing shadcn components before creating new UI primitives
- Maintain responsive design (test mobile view)
- Keep dashboard updates modular – prefer components over page-level Tailwind blocks

## Docs & Changelog
- Update docs in `docs/` when new modules or patterns are added
- Append a concise entry to `agents.md` describing your work

## Testing & QA
- Run `npm run lint` after changes
- When API hooks added, include React Query tests or Playwright/E2E scripts (future)
- Manual smoke test: login, nav to each dashboard route, ensure no console errors

## Review Checklist
- [ ] Lint passes without warnings
- [ ] No unused files/assets
- [ ] Docs updated
- [ ] `agents.md` entry added
- [ ] Screenshots or Loom if UI change (recommended)

## Contact
- Frontend Lead: (assign)
- Slack/Teams channel: (link when available)

Thanks for contributing to ImpactBridge!
