import { NavLink, Link } from "react-router-dom";
import { Search, Bell, ExternalLink } from "lucide-react";
import { Logo } from "./Logo";
import { Avatar } from "./Avatar";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  { to: "/issues", label: "Issues" },
  { to: "/ideas", label: "Ideas" },
  { to: "/inbox", label: "Inbox" },
  { to: "/ranking", label: "Ranking" },
];

export function Header() {
  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="shrink-0" aria-label="Ziki home">
          <Logo size="sm" />
        </Link>
        <span className="chip hidden border-line-strong bg-surface-2 text-ink-2 md:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" />
          Demo workspace
        </span>
        <nav aria-label="Main" className="ml-2 hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition ${
                  isActive ? "bg-surface-2 text-ink shadow-[inset_0_0_0_1px_var(--line)]" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="hidden h-9 items-center gap-2 rounded-lg border border-line-strong bg-surface px-3 text-[13px] text-mist transition hover:bg-surface-2 hover:text-ink sm:flex"
            aria-label="Search (Ctrl+K)"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
            <span className="kbd ml-1">Ctrl K</span>
          </button>
          <Link
            to="/inbox"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong bg-surface text-ink-2 transition hover:bg-surface-2 hover:text-ink"
            aria-label="Inbox, 2 unread"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
          </Link>
          <a
            href="https://github.com/emerjent/ziki"
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-line-strong bg-surface text-ink-2 transition hover:bg-surface-2 hover:text-ink sm:inline-flex"
            aria-label="Ziki on GitHub"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
          <ThemeToggle />
          <Avatar name="Trust Emmanuel" size="sm" />
        </div>
      </div>
    </header>
  );
}
