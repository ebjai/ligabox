
export default function MultilingualSwitch(){
  // TODO: connect to i18n store + persist preference
  return (
    <div className="inline-flex items-center gap-2 text-xs text-zinc-300">
      <button className="px-2 py-1 rounded-lg border border-zinc-800 hover:bg-zinc-800">EN</button>
      <button className="px-2 py-1 rounded-lg border border-zinc-800 hover:bg-zinc-800">ES</button>
    </div>
  )
}
