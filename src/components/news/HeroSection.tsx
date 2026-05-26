export default function HeroSection() {
  return (
    <div className="relative overflow-hidden border-b border-[#1a2332] bg-[#020409]">
      {/* Star field background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 15%, #fff 0, transparent 100%),
            radial-gradient(1px 1px at 30% 40%, #fff 0, transparent 100%),
            radial-gradient(1.5px 1.5px at 50% 20%, #fff 0, transparent 100%),
            radial-gradient(1px 1px at 70% 60%, #fff 0, transparent 100%),
            radial-gradient(1px 1px at 90% 10%, #fff 0, transparent 100%),
            radial-gradient(1px 1px at 20% 80%, #fff 0, transparent 100%),
            radial-gradient(1px 1px at 60% 90%, #fff 0, transparent 100%),
            radial-gradient(1.5px 1.5px at 80% 35%, #fff 0, transparent 100%),
            radial-gradient(1px 1px at 45% 70%, #fff 0, transparent 100%),
            radial-gradient(1px 1px at 5% 55%, #fff 0, transparent 100%)
          `,
        }}
      />

      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 sm:py-14">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 rounded border border-cyan-800/40 bg-cyan-950/30 px-3 py-1 text-xs text-cyan-400 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Live Nachrichten
          </div>

          <h1
            className="text-3xl sm:text-5xl font-black tracking-widest uppercase text-white"
            style={{
              fontFamily: "Orbitron, monospace",
              textShadow: "0 0 30px rgba(0,212,255,0.3)",
            }}
          >
            UEE News Network
          </h1>

          <p className="max-w-lg text-sm sm:text-base text-slate-400 leading-relaxed">
            Echtzeit-Nachrichten aus dem Star Citizen Universum — offizielle Comm-Links,
            Community-Posts, Wikis und Videos.
          </p>

          <div className="flex items-center gap-6 mt-2 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              RSI Comm-Link
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Reddit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              SC Wiki
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              YouTube
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
