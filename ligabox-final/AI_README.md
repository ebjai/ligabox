
# Liga de Boxeo — 2035 Home & AI Widgets

This pack gives you a futuristic, AI‑forward homepage and modular widgets you can plug into your existing React 19 + Vite + Tailwind + tRPC stack.

## Contents
- `src/pages/Home2035.tsx` — a YouTube‑style, AI‑personalized home.
- `src/ai/*` — AI widgets (prediction, persona feed, shorts rail, commentary, live scorecard, multilingual switch, sponsor intelligence, AI ticker).
- `server/trpc/aiRouters.ts` — tRPC stubs you can merge into your server to power widgets.

## Integration
1. Copy `src/pages/Home2035.tsx` into your app and add a route (e.g., `/`).
2. Copy `src/ai/*` components and import where needed.
3. Merge `server/trpc/aiRouters.ts` into your server router (adjust import paths).
4. Wire the calls to your existing `media.ts`, `interactions`, and database models.
5. Style matches your black/gold brand. Tailwind utilities only.

## Data Model (suggested)
- `videos(id, title, slug, thumb, duration, tags[], language, publishedAt, sponsorId?)`
- `shorts(id, title, thumb, src, tags[], language, publishedAt)`
- `articles(id, title, slug, excerpt, hero, language, publishedAt, entities[], aiSummary?)`
- `fighters(id, name, country, division, record, stance, reach, dob, ratings, images[], aiProfile?)`
- `events(id, title, date, venue, city, country, bouts[], mainEventId, ppv?)`
- `predictions(id, eventId, fighterAId, fighterBId, model, probA, probB, updatedAt)`
- `interactions(userId, contentId, type=view|like|comment|share|watchTime, ts)`
- `sponsors(id, name, tier, logo, link, impressions, ctr, cpv)`

## AI Components at a glance
- `MatchPredictor`: model‑driven win probabilities with confidence bands and rationale.
- `PersonaFeed`: personalized, multilingual media stream with re‑ranked items.
- `ShortsRail`: auto‑playing vertical feed driven by your `ShortsPlayer`.
- `CommentarySynth`: generates human‑style fight breakdowns; can operate in EN/ES.
- `RealtimeScorecard`: live round‑by‑round telemetry with punch stats (mock until wired).
- `AiTicker`: rolling banner of insights/news/predictions.
- `SponsorIntel`: brand analytics panel (impressions, CTR, CPV) suitable for /sponsors.
- `MultilingualSwitch`: language toggle with persisted preference.

## Security & Guardrails
- Rate‑limit AI endpoints (per IP + per user).
- Cache heavy computations (predictions) and store them; don't re‑compute per request.
- Keep SECRET keys server‑side only; only `VITE_*` vars in the client.
- Log model + version on each prediction for auditability.
