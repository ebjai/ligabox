
import { useEffect, useState } from 'react'

type Props = { eventId: string }
type Prediction = { model:string, probA:number, probB:number, rationale:string }

export default function MatchPredictor({ eventId }: Props){
  const [p, setP] = useState<Prediction | null>(null)

  useEffect(()=>{
    // TODO: replace with tRPC call: ai.predictions.byEventId
    setTimeout(()=>{
      setP({ model:'ldb-ensemble-v1', probA:0.61, probB:0.39, rationale:'Reach and cardio advantage late into the fight; southpaw counters land at above‑avg accuracy.' })
    }, 400)
  }, [eventId])

  if(!p) return <div className="card">Loading prediction…</div>
  return (
    <div className="card">
      <div className="text-sm text-zinc-400">Model: {p.model}</div>
      <div className="mt-2 grid grid-cols-2 gap-4 items-end">
        <div>
          <div className="text-3xl font-black text-[var(--gold)]">{Math.round(p.probA*100)}%</div>
          <div className="text-xs text-zinc-400">Rodríguez</div>
        </div>
        <div>
          <div className="text-3xl font-black text-zinc-300">{Math.round(p.probB*100)}%</div>
          <div className="text-xs text-zinc-400">Martínez</div>
        </div>
      </div>
      <div className="mt-3 text-sm text-zinc-300">{p.rationale}</div>
    </div>
  )
}
