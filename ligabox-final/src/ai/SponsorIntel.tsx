
type Props = { compact?: boolean }
export default function SponsorIntel({ compact=false }: Props){
  // TODO: pull from sponsors analytics (impressions, ctr, cpv) via tRPC
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <Stat label="Impressions" value="1.2M" />
      <Stat label="Engagement" value="4.8%" />
      <Stat label="Avg CPV" value="$0.012" />
      <Stat label="Top Tier" value="Gold" />
      {!compact && <div className="md:col-span-4 text-xs text-zinc-500">Mock analytics. Wire to /sponsors dashboard data.</div>}
    </div>
  )
}
function Stat({label,value}:{label:string,value:string}){
  return <div className="card"><div className="text-xs text-zinc-400">{label}</div><div className="text-2xl font-black text-[var(--gold)]">{value}</div></div>
}
