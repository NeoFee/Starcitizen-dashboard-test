"use client";

import Link from "next/link";

const NAV = [
  { href: "#news",    label: "News" },
  { href: "#streams", label: "Streams" },
  { href: "#tools",   label: "Tools" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#1a2332] bg-[#020409]/95 backdrop-blur-md">
      {/* Cyan top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-13 items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative flex items-center justify-center w-8 h-8 rounded border border-cyan-500/40 bg-cyan-500/8 group-hover:border-cyan-400/60 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12,2 22,12 12,22 2,12" strokeLinejoin="round"/>
                <polygon points="12,7 17,12 12,17 7,12" fill="currentColor" opacity="0.3" stroke="none"/>
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase" style={{ fontFamily: "Orbitron, monospace" }}>
                UEE News
              </span>
              <span className="text-[9px] tracking-widest text-slate-600 uppercase">Network</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-0.5">
            {NAV.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-cyan-400 rounded hover:bg-cyan-500/8 transition-all tracking-widest uppercase"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Live indicator */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="hidden sm:inline text-[10px] tracking-widest uppercase text-slate-500">Live</span>
          </div>

        </div>
      </div>
    </header>
  );
}
