# ImpactBridge Frontend Setup

## Summary
- Next.js 14 (App Router + TypeScript)
- TailwindCSS + Tailwind Merge + Radix utilities
- React Query provider (`providers/query-provider.tsx`)
- Auth context storing JWT in memory
- API wrapper in `lib/api-client.ts`
- Route groups for `(public)` and `(dashboard)` flows.

## Directory Layout
```
app/
  layout.tsx
  page.tsx
  (public)/login/page.tsx
  (public)/register/page.tsx
  (dashboard)/layout.tsx
  (dashboard)/page.tsx
components/ui/navbar.tsx
providers/
  auth-context.tsx
  query-provider.tsx
lib/
  api-client.ts
  fetcher.ts
styles/globals.css
```

## Configuration
- `tailwind.config.js` (dark mode + content globs)
- `postcss.config.js`
- `tsconfig.json` alias `@/*`
- `.env.local` should include `NEXT_PUBLIC_API_BASE_URL`

## Scripts
- `npm run dev`
- `npm run lint`
- `npm run build`

## Next Steps
- Wire login/register to real backend endpoints
- Expand dashboard routes with actual content
- Add shadcn/ui components as needed
- Persist auth token via cookies/local storage if required