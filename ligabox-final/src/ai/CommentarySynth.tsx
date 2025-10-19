
import { useEffect, useState } from 'react'
type Props = { eventId:string, language:'en'|'es'|'auto'|string }
export default function CommentarySynth({ eventId, language='auto' }: Props){
  const [text, setText] = useState<string>('')
  useEffect(()=>{
    // TODO: tRPC call: ai.commentary.byEventId
    setTimeout(()=>{
      setText('Technical breakdown: Rodríguez leverages southpaw angles to keep lead foot outside, creating lanes for the left cross. Martínez must jab off‑rhythm and target the body to slow late pressure.')
    }, 500)
  }, [eventId, language])

  return <div className="card"><div className="text-sm text-zinc-400 mb-2">AI Commentary</div><p className="text-zinc-200 text-sm leading-6">{text || 'Generating…'}</p></div>
}
