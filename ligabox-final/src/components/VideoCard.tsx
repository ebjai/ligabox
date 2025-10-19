type Video = {
  id: string;
  title: string;
  tag?: string;
  views?: string;
  thumb?: string; // you can drop images in /public and reference "/ring-smoke.jpg"
};

export default function VideoCard({ v }: { v: Video }) {
  return (
    <a
      href={`/watch/${v.id}`}
      className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
    >
      <div className="aspect-video overflow-hidden bg-black/40">
        <img
          src={v.thumb ?? "/ring-smoke.jpg"}
          alt={v.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        {v.tag && (
          <span className="mb-1 inline-flex items-center rounded bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
            {v.tag}
          </span>
        )}
        <h3 className="line-clamp-2 text-sm font-medium text-amber-100">{v.title}</h3>
        {v.views && <p className="mt-1 text-xs text-amber-100/60">{v.views} • 2h ago</p>}
      </div>
    </a>
  );
}

