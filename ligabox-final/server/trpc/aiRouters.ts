
/**
 * Merge these stubs into your existing tRPC server.
 * Replace mock returns with real DB/model calls.
 */
import { z } from 'zod'
// import { router, publicProcedure } from './trpcCore'

// export const aiRouter = router({
//   predictions: router({
//     byEventId: publicProcedure.input(z.object({ eventId: z.string() })).query(async ({ input, ctx }) => {
//       // pull latest cached prediction from DB
//       return { model: 'ldb-ensemble-v1', probA: 0.61, probB: 0.39, rationale: '...' }
//     })
//   }),
//   feed: router({
//     forUser: publicProcedure.input(z.object({ userId: z.string().default('anon') })).query(async ({ input, ctx }) => {
//       return [{ id:'v1', type:'video', title:'Top 10 Counter‑Punches This Year' }]
//     })
//   }),
//   commentary: router({
//     byEventId: publicProcedure.input(z.object({ eventId: z.string(), language: z.string().default('en') })).query(async ({ input, ctx }) => {
//       return { text: 'Technical breakdown...' }
//     })
//   }),
//   shorts: router({
//     list: publicProcedure.query(async ({ ctx }) => {
//       return Array.from({ length: 12 }).map((_, i) => ({ id: 's' + i, title: 'Short #' + (i + 1) }))
//     })
//   })
// })
