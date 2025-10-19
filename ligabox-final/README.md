
# Wired Home2035 (tRPC)
A direct replacement Home page that **calls your real tRPC endpoints**.
- Replace your Home with `src/pages/Home2035.wired.tsx`.
- Ensure your server exposes: `ai.ticker`, `events.next`, `ai.predictionByEvent`, `media.getFeed`, `media.getShorts`.

## Env
- `VITE_TRPC_URL=/api/trpc`

## Notes
- If types are available, replace `AppRouter = any` in `trpcClient.ts` with your real router type.
- This page gracefully degrades to placeholders if endpoints are missing.
