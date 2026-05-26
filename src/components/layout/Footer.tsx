export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#1a2332] bg-[#020409] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
          <p
            className="text-xs tracking-widest text-slate-600 uppercase"
            style={{ fontFamily: "Orbitron, monospace" }}
          >
            UEE News Network
          </p>
          <p className="text-xs text-slate-600">
            Fan-made dashboard. Not affiliated with Cloud Imperium Games.
          </p>
          <div className="flex gap-4 text-xs text-slate-600">
            <a
              href="https://robertsspaceindustries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              RSI
            </a>
            <a
              href="https://status.robertsspaceindustries.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Status
            </a>
            <a
              href="https://reddit.com/r/starcitizen"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Reddit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
