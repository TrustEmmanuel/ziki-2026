import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, PackageCheck, ThumbsUp, Award, AtSign, AlertTriangle, Archive } from "lucide-react";
import { NOTIFICATIONS, ESCALATIONS } from "../data/mock";

const KIND_ICON = {
  confirm: CheckCircle2,
  delivery: PackageCheck,
  vote: ThumbsUp,
  award: Award,
  mention: AtSign,
} as const;

const KIND_TONE = {
  confirm: "bg-ok-dim text-ok",
  delivery: "bg-accent-soft text-sky",
  vote: "bg-warn-dim text-warn",
  award: "bg-ok-dim text-ok",
  mention: "bg-info-dim text-sky",
} as const;

type Tab = "notifications" | "escalations" | "archived";

export default function Inbox() {
  const [tab, setTab] = useState<Tab>("notifications");

  return (
    <div className="fade-up pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label m-0">Demo workspace</p>
          <h1 className="m-0 mt-1.5 text-[28px] font-bold tracking-tight text-ink sm:text-3xl">Inbox</h1>
        </div>
        <button type="button" className="btn btn-ghost">
          <CheckCircle2 className="h-4 w-4" />
          Mark all as read
        </button>
      </div>

      <nav aria-label="Inbox" className="mt-5 flex flex-wrap items-center gap-1.5">
        {(
          [
            { key: "notifications", label: "Notifications", count: NOTIFICATIONS.length },
            { key: "escalations", label: "Escalations", count: ESCALATIONS.length },
            { key: "archived", label: "Archived", count: 0 },
          ] as { key: Tab; label: string; count: number }[]
        ).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            aria-pressed={tab === t.key}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-bold transition ${
              tab === t.key ? "bg-ink text-ocean" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
            }`}
          >
            {t.label}
            <span className={`tabular-nums ${tab === t.key ? "opacity-70" : "text-mist"}`}>{t.count}</span>
          </button>
        ))}
      </nav>

      {tab === "notifications" ? (
        <ul className="m-0 mt-5 list-none space-y-2.5 p-0">
          {NOTIFICATIONS.map((n, i) => {
            const Icon = KIND_ICON[n.kind];
            return (
              <li
                key={n.id}
                className="card fade-up flex items-start gap-3.5 p-4 transition hover:border-line-strong sm:items-center sm:p-5"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg sm:mt-0 ${KIND_TONE[n.kind]}`}>
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-semibold text-ink">
                    {n.title}
                    {n.unread ? (
                      <span className="h-2 w-2 rounded-full bg-accent" title="Unread" />
                    ) : null}
                  </p>
                  <p className="m-0 mt-1 text-[13px] leading-relaxed text-ink-2">{n.body}</p>
                </div>
                <span className="shrink-0 text-[11px] font-semibold text-mist">{n.time}</span>
              </li>
            );
          })}
        </ul>
      ) : null}

      {tab === "escalations" ? (
        <ul className="m-0 mt-5 list-none space-y-2.5 p-0">
          {ESCALATIONS.map((e, i) => (
            <li
              key={e.id}
              className="card fade-up flex items-start gap-3.5 border-warn/30 p-4 sm:items-center sm:p-5"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warn-dim text-warn sm:mt-0">
                <AlertTriangle className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] font-semibold text-ink">
                  <Link to={`/issues/${e.issueId}`} className="truncate transition hover:text-sky">
                    {e.issue}
                  </Link>
                  <span className="font-mono text-[11px] font-medium text-mist">#{e.issueId}</span>
                  {e.unread ? <span className="h-2 w-2 rounded-full bg-warn" title="Unread" /> : null}
                </p>
                <p className="m-0 mt-1 text-[13px] leading-relaxed text-ink-2">{e.body}</p>
              </div>
              <span className="shrink-0 text-[11px] font-semibold text-mist">{e.time}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {tab === "archived" ? (
        <div className="card mt-5 flex flex-col items-center px-6 py-14 text-center">
          <img
            src={`${import.meta.env.BASE_URL}images/inbox-empty.png`}
            alt=""
            className="h-40 w-40 rounded-2xl object-cover"
            width={1024}
            height={1024}
          />
          <h2 className="m-0 mt-6 text-lg font-bold tracking-tight text-ink">Nothing archived yet</h2>
          <p className="m-0 mt-2 max-w-sm text-[13.5px] leading-relaxed text-ink-2">
            Notifications you archive will live here, out of the way but never deleted.
          </p>
          <button type="button" className="btn btn-ghost mt-6" onClick={() => setTab("notifications")}>
            <Archive className="h-4 w-4" />
            Back to notifications
          </button>
        </div>
      ) : null}
    </div>
  );
}
