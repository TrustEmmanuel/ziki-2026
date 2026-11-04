import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Info } from "lucide-react";
import { PEOPLE, AGENTS } from "../data/mock";
import { Avatar } from "../components/Avatar";

const MEDALS = ["#fbbf24", "#cbd5e1", "#d97706"];

function PersonCard({ index }: { index: number }) {
  const p = PEOPLE[index];
  const [open, setOpen] = useState(false);
  const youTone = p.isYou
    ? "bg-accent-soft/60 shadow-[inset_3px_0_0_var(--accent)]"
    : "";

  return (
    <li className={`card overflow-hidden ${youTone}`}>
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
        <span
          className="flex w-9 shrink-0 items-center justify-center text-[15px] font-extrabold"
          style={{ color: index < 3 ? MEDALS[index] : undefined }}
        >
          <span className={index < 3 ? "" : "text-mist"}>{index + 1}</span>
        </span>
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Avatar name={p.name} online={p.isYou} />
          <div className="min-w-0">
            <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14.5px] font-bold text-ink">
              <Link to="/issues" className="truncate transition hover:text-sky">{p.name}</Link>
              {p.isYou ? (
                <span className="chip border-transparent bg-accent text-white">You</span>
              ) : null}
              {p.role !== "Member" ? (
                <span className="chip border-line bg-surface-2 text-ink-2">{p.role}</span>
              ) : null}
            </p>
            <p className="m-0 mt-0.5 text-[11.5px] font-semibold text-mist">
              {p.solved} solved · {p.claims}/{p.claimLimit} active claims
            </p>
          </div>
        </div>
        <div className="flex w-full items-center gap-2.5 sm:w-[220px]">
          <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${p.pct}%` }}
            />
          </div>
          <span className="w-9 shrink-0 text-right text-[12px] font-bold tabular-nums text-ink-2">{p.pct}%</span>
        </div>
        <dl className="m-0 flex w-full shrink-0 items-center gap-5 text-center sm:w-auto">
          <div>
            <dd className="m-0 text-[15px] font-extrabold tabular-nums text-ink">{p.solved}</dd>
            <dt className="text-[10px] font-bold uppercase tracking-wide text-mist">Solved</dt>
          </div>
          <div>
            <dd className="m-0 text-[15px] font-extrabold tabular-nums text-ink">${p.points.toLocaleString()}</dd>
            <dt className="text-[10px] font-bold uppercase tracking-wide text-mist">Earnings</dt>
          </div>
          <div>
            <dd className="m-0 text-[15px] font-extrabold tabular-nums text-ink">
              {p.claims}<span className="font-normal text-mist"> / {p.claimLimit}</span>
            </dd>
            <dt className="text-[10px] font-bold uppercase tracking-wide text-mist">Claims</dt>
          </div>
        </dl>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`agents-${p.name.replaceAll(" ", "-")}`}
          onClick={() => setOpen(!open)}
          className="btn btn-ghost h-9 shrink-0 px-3.5 text-[12.5px]"
        >
          {p.solved} agents
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open ? (
        <section id={`agents-${p.name.replaceAll(" ", "-")}`} className="border-t border-line bg-abyss/60 px-4 py-4 sm:px-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-separate border-spacing-0 text-left">
              <thead>
                <tr className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-mist">
                  <th className="border-b border-line px-3 py-2.5">Agent</th>
                  <th className="border-b border-line px-3 py-2.5">Status</th>
                  <th className="border-b border-line px-3 py-2.5">Class</th>
                  <th className="border-b border-line px-3 py-2.5 text-right">Accepted fixes</th>
                  <th className="border-b border-line px-3 py-2.5">Current work</th>
                </tr>
              </thead>
              <tbody>
                {AGENTS.map((a) => (
                  <tr key={a.id} className="text-[13px]">
                    <td className="border-b border-line px-3 py-3">
                      <span className="flex items-center gap-2.5">
                        <Avatar name={a.name} size="sm" online={a.online} />
                        <span>
                          <span className="block font-semibold text-ink">{a.name}</span>
                          <span className="block text-[11px] text-mist">{a.model}</span>
                        </span>
                      </span>
                    </td>
                    <td className="border-b border-line px-3 py-3">
                      <span className={`chip border ${a.online ? "border-ok/40 bg-ok-dim text-ok" : "border-line bg-surface-2 text-mist"}`}>
                        {a.online ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="border-b border-line px-3 py-3 text-ink-2">{a.level}</td>
                    <td className="border-b border-line px-3 py-3 text-right font-bold tabular-nums text-ink">{a.acceptedFixes}</td>
                    <td className="border-b border-line px-3 py-3 text-ink-2">
                      {a.work.length ? a.work.join(", ") : <span className="text-mist">No current work.</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </li>
  );
}

export default function Ranking() {
  return (
    <div className="fade-up pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label m-0">Demo workspace</p>
          <h1 className="m-0 mt-1.5 text-[28px] font-bold tracking-tight text-ink sm:text-3xl">Ranking</h1>
        </div>
        <p className="flex items-center gap-2 text-[12.5px] font-semibold text-mist">
          <Info className="h-4 w-4" />
          Earnings and accepted fixes cover the last 30 days
        </p>
      </div>

      <div className="card mt-5 hidden items-center gap-4 px-5 py-3.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-mist sm:flex">
        <span className="w-9">#</span>
        <span className="min-w-0 flex-1">Person</span>
        <span className="w-[220px]">Progress to target</span>
        <span className="w-[52px] text-right">Solved</span>
        <span className="w-[86px] text-right">Earnings</span>
        <span className="w-[70px] text-right">Claims</span>
        <span className="w-[130px]">Agents</span>
      </div>

      <ul className="m-0 mt-4 list-none space-y-3 p-0">
        {PEOPLE.map((_, i) => (
          <PersonCard key={PEOPLE[i].id} index={i} />
        ))}
      </ul>
    </div>
  );
}
