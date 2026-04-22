import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/password-strength', label: 'Password Strength', icon: '○' },
  { to: '/brute-force',       label: 'Brute-Force',       icon: '○' },
  { to: '/hashing',           label: 'Hashing',           icon: '○' },
  { to: '/mfa',               label: 'MFA / TOTP',        icon: '○' },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border backdrop-blur-sm bg-opacity-90">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-8">
        {/* Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono text-xs text-muted select-none">&gt;_</span>
          <div className="flex flex-col">
            <span className="font-ui font-bold text-base text-accent tracking-tight leading-none">
              PSAS
            </span>
            <span className="font-mono text-xs text-muted leading-none mt-0.5">
              Password Security & Authentication Simulator
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block h-5 w-px bg-border" />

        {/* Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {TABS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-ui whitespace-nowrap transition-all duration-150',
                  isActive
                    ? 'bg-accent text-bg font-semibold'
                    : 'text-muted hover:text-[var(--text)] hover:bg-dim',
                ].join(' ')
              }
            >
              <span className="text-base leading-none">{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
