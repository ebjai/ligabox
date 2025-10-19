
import { useEffect, useState } from 'react'

type Short = { id:string, title:string, thumb?:string }
export default function ShortsRail(){
  const [shorts, setShorts] = useState<Short[]>([])
  useEffect(()=>{
    // TODO: tRPC call: media.getShorts
    setShorts(Array.from({length:8}).map((_,i)=>({id:'s'+i, title:'Short #'+(i+1)})))
  }, [])
  return (
    <div className="card">
      <div className="text-sm text-zinc-400 mb-3">Shorts</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {shorts.map(s=> (
          <div key={s.id} className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/60 aspect-[9/16] grid place-items-center text-zinc-300">
            {s.title}
          </div>
        ))}
      </div>
    </div>
  )
}
