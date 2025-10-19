
import { useEffect, useState } from 'react'

export default function AiTicker(){
  const [items, setItems] = useState<string[]>([
    'LDB.AI favors Rodríguez 61% by decision — confidence: medium',
    'Breaking: Undercard adds rising star from Puerto Rico',
    'Stat: Martínez absorbs 18% fewer power shots in rounds 7-12'
  ])

  // TODO: Replace with tRPC polling
  useEffect(()=>{
    const id = setInterval(()=>{
      setItems(prev => [...prev.slice(1), prev[0]])
    }, 5000)
    return ()=>clearInterval(id)
  }, [])

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
      <div className="px-4 py-2 text-xs tracking-wide uppercase text-zinc-400 border-b border-zinc-800">AI ticker</div>
      <div className="flex gap-10 whitespace-nowrap px-4 py-2 text-sm text-zinc-300 animate-[marquee_30s_linear_infinite]">
        {items.map((t, i)=>(<span key={i} className="inline-block">{t}</span>))}
      </div>
      <style>{`@keyframes marquee {0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
