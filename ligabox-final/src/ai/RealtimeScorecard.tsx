
import { useEffect, useState } from 'react'
type Props = { eventId:string }
type Round = { r:number, a:number, b:number, note?:string }
export default function RealtimeScorecard({ eventId }: Props){
  const [rounds,setRounds] = useState<Round[]>([{r:1,a:10,b:9},{r:2,a:9,b:10},{r:3,a:10,b:9}])
  // TODO: live updates via tRPC subscription or polling
  return (
    <div className="text-sm space-y-2">
      {rounds.map(rd => (
        <div key={rd.r} className="flex items-center justify-between border-b border-zinc-800 pb-1">
          <div>Round {rd.r}</div>
          <div className="text-zinc-300">{rd.a}-{rd.b}</div>
        </div>
      ))}
      <div className="mt-2 text-xs text-zinc-500">Mock data. Wire to telemetry provider or manual judge inputs.</div>
    </div>
  )
}
