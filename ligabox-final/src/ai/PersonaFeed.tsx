
import { useEffect, useState } from 'react'

type Item = { id:string, type:'video'|'article'|'fighter'|'event', title:string, thumb?:string, excerpt?:string }
export default function PersonaFeed({ userId }:{userId:string}){
  const [items,setItems] = useState<Item[]>([])

  useEffect(()=>{
    // TODO: tRPC call: ai.feed.forUser
    setTimeout(()=>{
      setItems([
        {id:'v1', type:'video', title:'Top 10 Counter‑Punches This Year', thumb:''},
        {id:'a1', type:'article', title:'Why southpaws dominate late rounds', excerpt:'Footwork and angle discipline lead to higher xImpact in R9‑12…'},
        {id:'f1', type:'fighter', title:'Prospect: El Tormenta (8‑0, 6 KOs)'},
        {id:'e1', type:'event', title:'Undercard spotlight: explosive bantamweight tilt'}
      ])
    }, 300)
  }, [userId])

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map((it)=>(
        <article key={it.id} className="card hover:shadow-glow transition">
          <div className="h-40 rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 mb-3" />
          <h4 className="font-bold">{it.title}</h4>
          {it.excerpt && <p className="text-sm text-zinc-400 mt-1">{it.excerpt}</p>}
          <a className="btn mt-4">Open →</a>
        </article>
      ))}
    </div>
  )
}
