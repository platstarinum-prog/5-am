import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Каталог', href: '/catalog' },
  { label: 'Відгуки', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/60 bg-black/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-white font-black text-lg tracking-tight">5AM</span>
          <span className="text-zinc-600 font-mono text-xs tracking-widest uppercase">STORE</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                pathname === item.href
                  ? 'text-white bg-zinc-900'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <a
          href="https://t.me/store_5am"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-zinc-400 border border-zinc-800 rounded-md hover:border-zinc-600 hover:text-white transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.069l-2.03 9.561c-.148.667-.54.833-1.092.518l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.16 14.26l-2.96-.924c-.643-.202-.657-.643.136-.953l11.57-4.462c.537-.194 1.006.131.656.148z"/>
          </svg>
          TG
        </a>
      </div>

      <div className="md:hidden flex gap-1 px-6 pb-3 overflow-x-auto">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            to={item.href}
            className={`shrink-0 px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
              pathname === item.href
                ? 'text-black bg-white border-white'
                : 'text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
