
import { Suspense, useMemo } from 'react'
import { Flame, Sparkles, Play, TrendingUp } from 'lucide-react'
import AiTicker from '../ai/AiTicker'
import MatchPredictor from '../ai/MatchPredictor'
import PersonaFeed from '../ai/PersonaFeed'
import ShortsRail from '../ai/ShortsRail'
import CommentarySynth from '../ai/CommentarySynth'
import RealtimeScorecard from '../ai/RealtimeScorecard'
import MultilingualSwitch from '../ai/MultilingualSwitch'
import SponsorIntel from '../ai/SponsorIntel'

export default function Home2035(){
  // Example: language preference could be loaded from user profile or localStorage
  const lang = 'en'

  return (
    <div className="space-y-10">
      {/* Top AI ticker */}
      <AiTicker />

      {/* Hero: Next Big Fight + Prediction */}
      <section className="card relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(212,165,116,0.08),transparent_60%)]" />
        <div className="flex items-center gap-3 text-brand-gold">
          <Flame className="h-6 w-6"/><h2 className="text-2xl font-extrabold tracking-tight">Next Big Fight</h2>
          <div className="ml-auto"><MultilingualSwitch /></div>
        </div>
        <p className="text-zinc-400 mt-2 text-sm">Auto‑populated from Events; model generates preview and odds.</p>

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="rounded-xl overflow-hidden border border-zinc-800">
            <div className="aspect-video bg-zinc-800/60 grid place-items-center">
              <Play className="h-10 w-10 text-zinc-400" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">Rodríguez vs Martínez — Las Vegas</h3>
              <div className="text-sm text-zinc-400">Sat, Dec 14 — T‑Mobile Arena</div>
            </div>
          </div>

          <div className="lg:col-span-2 grid gap-6">
            <MatchPredictor eventId="evt_next" />
            <CommentarySynth eventId="evt_next" language={lang} />
          </div>
        </div>
      </section>

      {/* Personalized AI feed: videos, articles, fighters */}
      <section className="space-y-4">
        <div className="flex items-center gap-2"><Sparkles className="text-brand-gold"/><h3 className="text-xl font-semibold">Your LDB.AI Feed</h3></div>
        <PersonaFeed userId="anon" />
      </section>

      {/* Shorts rail and live score */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ShortsRail />
        </div>
        <div className="card">
          <div className="flex items-center gap-2 text-brand-gold"><TrendingUp className="h-5 w-5"/><h4 className="font-semibold">Live Scorecard</h4></div>
          <RealtimeScorecard eventId="evt_next" />
        </div>
      </section>

      {/* Sponsors analytics teaser */}
      <section className="card">
        <SponsorIntel compact />
      </section>
    </div>
  )
}
