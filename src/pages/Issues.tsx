import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Flame, MessageSquare, HandCoins, ChevronDown, Plus, Filter } from "lucide-react";
import { ISSUES, TABS, type Issue } from "../data/mock";
import { StatusChip } from "../components/StatusChip";
import { Avatar } from "../components/Avatar";

const PRESETS = [
  { label: "My open", count: 17, active: false },
  { label: "Needs my review", count: 12, active: false },
  { label: "Awaiting confirmation", count: 30, active: false },
];

function Select({ label, value }: { label: string; value: string }) {
  return (
    <label className="flex h-9 items-center gap-2 rounded-lg border border-line-strong bg-surface px-3 text-[13px] text-ink-2 transition hover:bg-surface-2">
      <span className="hidden font-semibold text-mist lg:inline">{label}</span>
      <select className="cursor-pointer appearance-none bg-transparent font-semibold text-ink outline-none [&>option]:bg-surface">
        <option>{value}</option>
      </select>
      <ChevronDown className="h-3.5 w-3.5 text-mist" />
    </label>
  );
}

function IssueRow({ issue, index }: { issue: Issue; index: number }) {
  return (
    <li
      className="fade-up group relative flex flex-col gap-2.5 border-b border-line px-4 py-4 transition last:border-b-0 hover:bg-surface-2/50 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
          {issue.importance > 0 ? (
            <span className="inline-flex items-center gap-1 text-[12px] font-bold text-warn" title="Marked important">
              <Flame className="h-3.5 w-3.5" />
              {issue.importance}
            </span>
          ) : null}
          <Link
            to={`/issues/${issue.id}`}
            className="truncate text-[15px] font-semibold text-ink transition group-hover:text-sky"
          >
            {issue.title}
          </Link>
          <span className="font-mono text-[11px] text-mist">#{issue.id}</span>
        </div>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-mist">
          {issue.tags.map((tag) => (
            <span key={tag} className="chip border-line bg-surface-2 text-ink-2">{tag}</span>
          ))}
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-line-strong" />
            {issue.area} · {issue.time}
          </span>
          {issue.assignee ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-line-strong" />
              <Avatar name={issue.assignee} size="sm" /> {issue.assignee}
            </span>
          ) : null}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3 text-[12px] font-semibold text-ink-2 sm:gap-4">
        <span className="inline-flex items-center gap-1" title="Reward">
          <HandCoins className="h-3.5 w-3.5 text-sky" />
          <span className="tabular-nums text-ink">${issue.reward}</span>
        </span>
        <span className="hidden items-center gap-1 sm:inline-flex" title="Bids">
          <span className="tabular-nums">{issue.bids.length}</span> bid{issue.bids.length === 1 ? "" : "s"}
        </span>
        <span className="hidden items-center gap-1 lg:inline-flex" title="Votes">
          <span className="tabular-nums">{issue.votes}</span> votes
        </span>
        <span className="hidden items-center gap-1 lg:inline-flex" title="Comments">
          <MessageSquare className="h-3.5 w-3.5" />
          <span className="tabular-nums">{issue.comments.length}</span>
        </span>
        <StatusChip status={issue.status} substatus={issue.substatus} />
      </div>
    </li>
  );
}

export default function Issues() {
  const [tab, setTab] = useState("all");
  const activeTab = TABS.find((t) => t.key === tab) ?? TABS[0];
  const shown = tab === "all" ? ISSUES : ISSUES.filter((i) => i.status === tab);

  return (
    <div className="fade-up pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label m-0">Demo workspace</p>
          <h1 className="m-0 mt-1.5 text-[28px] font-bold tracking-tight text-ink sm:text-3xl">Issues</h1>
        </div>
        <div className="flex items-center gap-2.5">
          <button type="button" className="btn btn-ghost">
            <Plus className="h-4 w-4" />
            New idea
          </button>
          <button type="button" className="btn btn-primary">
            <Plus className="h-4 w-4" />
            New issue
          </button>
        </div>
      </div>

      <nav aria-label="Preset views" className="mt-5 flex flex-wrap items-center gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            className={`chip h-8 border px-3.5 text-[13px] font-bold transition ${
              p.active
                ? "border-transparent bg-ink text-ocean"
                : "border-line-strong bg-surface text-ink-2 hover:bg-surface-2 hover:text-ink"
            }`}
          >
            {p.label}
            <span className="font-normal opacity-70 tabular-nums">{p.count}</span>
          </button>
        ))}
      </nav>

      <div className="card mt-4 flex flex-wrap items-center gap-2 p-3">
        <label className="flex h-9 min-w-[200px] flex-1 items-center gap-2 rounded-lg border border-line-strong bg-surface px-3 text-ink-2 transition focus-within:border-accent sm:min-w-[240px]">
          <Search className="h-3.5 w-3.5 text-mist" />
          <input
            type="search"
            placeholder="Search issues, tags, numbers…"
            className="w-full bg-transparent text-[13px] text-ink outline-none placeholder:text-mist"
          />
          <span className="kbd">/</span>
        </label>
        <Select label="Show" value="All" />
        <Select label="Stage" value="Any" />
        <Select label="Platform" value="All" />
        <Select label="Tags" value="Any" />
        <button type="button" className="btn btn-ghost h-9 px-3" aria-label="More filters">
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      <nav aria-label="Issue status tabs" className="mt-5 flex flex-wrap items-center gap-1.5">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-bold transition ${
              tab === t.key
                ? "bg-ink text-ocean"
                : "text-ink-2 hover:bg-surface-2 hover:text-ink"
            }`}
          >
            {t.label}
            <span className={`tabular-nums ${tab === t.key ? "opacity-70" : "text-mist"}`}>{t.count}</span>
          </button>
        ))}
      </nav>

      <div className="card mt-4 overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-3 text-[12px] font-semibold text-mist">
          <span className="inline-flex items-center gap-2">
            <Filter className="h-3.5 w-3.5" />
            {shown.length} of {activeTab.count} issues
          </span>
          <span className="hidden sm:inline">Sorted by reward · newest first</span>
        </div>
        <ul className="m-0 list-none p-0">
          {shown.map((issue, i) => (
            <IssueRow key={issue.id} issue={issue} index={i} />
          ))}
        </ul>
      </div>
    </div>
  );
}
