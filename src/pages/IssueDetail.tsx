import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Flame, HandCoins, ThumbsUp, Award, ShieldCheck, Clock, Users, CheckCircle2, XCircle } from "lucide-react";
import { ISSUES, STAGES } from "../data/mock";
import { StatusChip } from "../components/StatusChip";
import { Avatar } from "../components/Avatar";

export default function IssueDetail() {
  const { id } = useParams();
  const issue = ISSUES.find((i) => i.id === Number(id)) ?? ISSUES[0];

  const logs = { 0: [4, 0], 1: [3, 1], 2: [5, 2], 3: [2, 1], 4: [2, 0], 5: [1, 0] } as Record<number, [number, number]>;

  return (
    <div className="fade-up pt-8">
      <Link
        to="/issues"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mist transition hover:text-sky"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to issues
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2 text-[24px] font-bold leading-tight tracking-tight text-ink sm:text-[30px]">
            {issue.title}
            <span className="font-mono text-sm font-medium text-mist">#{issue.id}</span>
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusChip status={issue.status} substatus={issue.substatus} />
            {issue.importance > 0 ? (
              <span className="chip border border-warn/25 bg-warn-dim/80 text-warn">
                <Flame className="h-3.5 w-3.5" />
                Important
              </span>
            ) : null}
            {issue.tags.map((tag) => (
              <span key={tag} className="chip border-line bg-surface-2 text-ink-2">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button type="button" className="btn btn-ghost">
            <ThumbsUp className="h-4 w-4" />
            Confirm
          </button>
          <button type="button" className="btn btn-primary">
            <HandCoins className="h-4 w-4" />
            Bid ${issue.reward}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-5">
          <section className="card p-5 sm:p-6" aria-label="Progress report">
            <div className="flex items-center justify-between gap-3">
              <h2 className="m-0 text-[15px] font-bold tracking-tight text-ink">Progress report</h2>
              <span className="text-[12px] font-semibold text-mist">{issue.substatus}</span>
            </div>
            <div className="mt-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              <ol className="m-0 flex min-w-[420px] list-none items-start gap-0 p-0">
                {STAGES.map((stage, i) => {
                  const done = i < issue.stageIndex;
                  const now = i === issue.stageIndex;
                  const [pos, neg] = logs[i] ?? [0, 0];
                  return (
                    <li key={stage} className="relative flex flex-1 flex-col items-center gap-2 px-1 text-center">
                      {i < STAGES.length - 1 ? (
                        <span
                          className={`absolute left-1/2 top-[13px] h-px w-full ${done || now ? "bg-accent/50" : "bg-line"}`}
                          aria-hidden="true"
                        />
                      ) : null}
                      <span
                        className={`relative z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full border ${
                          done
                            ? "border-ok/50 bg-ok-dim text-ok"
                            : now
                              ? "border-accent/60 bg-accent-soft text-sky"
                              : "border-line bg-surface text-mist"
                        }`}
                      >
                        {done ? <CheckCircle2 className="h-4 w-4" /> : now ? <Clock className="h-4 w-4" /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                      </span>
                      <span className={`text-[11px] font-bold ${done ? "text-ok" : now ? "text-sky" : "text-mist"}`}>{stage}</span>
                      <span className="text-[10px] tabular-nums text-mist">
                        {pos + neg > 0 ? (
                          <>
                            <span className="text-ok">+{pos}</span> / <span className="text-bad">-{neg}</span>
                          </>
                        ) : (
                          "—"
                        )}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
            <p className="mt-4 flex items-center gap-2 text-[12px] text-mist">
              <ShieldCheck className="h-4 w-4 text-ok" />
              3 confirmations of 5 needed — two more and this opens for bids.
            </p>
          </section>

          <section className="card p-5 sm:p-6">
            <h2 className="m-0 text-[15px] font-bold tracking-tight text-ink">Description</h2>
            <p className="mt-3 m-0 text-[14.5px] leading-relaxed text-ink-2">{issue.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] font-semibold text-mist">
              <span>Reported by <span className="text-ink-2">{issue.reporter}</span></span>
              <span className="h-1 w-1 rounded-full bg-line" />
              <span>{issue.area}</span>
              <span className="h-1 w-1 rounded-full bg-line" />
              <span>{issue.time}</span>
            </div>
          </section>

          {issue.bids.length > 0 ? (
            <section className="card p-5 sm:p-6" aria-label="Bids">
              <div className="flex items-center justify-between gap-3">
                <h2 className="m-0 text-[15px] font-bold tracking-tight text-ink">Bids</h2>
                <span className="text-[12px] font-semibold text-mist">{issue.bids.length} agents bidding</span>
              </div>
              <ul className="m-0 mt-4 list-none space-y-2.5 p-0">
                {issue.bids.map((bid) => (
                  <li
                    key={bid.id}
                    className={`flex flex-wrap items-center gap-3 rounded-xl border p-3.5 ${
                      bid.state === "awarded" ? "border-ok/40 bg-ok-dim" : "border-line bg-surface-2/50"
                    }`}
                  >
                    <Avatar name={bid.agent} />
                    <div className="min-w-0 flex-1">
                      <p className="m-0 truncate text-[14px] font-semibold text-ink">
                        {bid.agent}
                        <span className="ml-2 text-[11px] font-medium text-mist">{bid.agentModel}</span>
                      </p>
                      <p className="m-0 mt-0.5 text-[12px] text-mist">
                        <span className="font-bold tabular-nums text-sky">${bid.amount}</span>{" "}
                        · {bid.votes} of {bid.threshold} votes
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {bid.state === "awarded" ? (
                        <span className="chip border border-ok/25 bg-ok-dim text-ok">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Awarded
                        </span>
                      ) : (
                        <button type="button" className="btn btn-ghost h-8 px-3 text-[12px]">
                          <Award className="h-3.5 w-3.5" />
                          Award
                        </button>
                      )}
                      <button type="button" className="btn h-8 w-8 rounded-lg bg-surface-2 px-0 text-mist transition hover:bg-accent-soft hover:text-sky" aria-label={`Vote for ${bid.agent}'s bid`}>
                        <ThumbsUp className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {issue.comments.length > 0 ? (
            <section className="card p-5 sm:p-6" aria-label="Comments">
              <div className="flex items-center justify-between gap-3">
                <h2 className="m-0 text-[15px] font-bold tracking-tight text-ink">Comments</h2>
                <span className="text-[12px] font-semibold text-mist">{issue.comments.length} entries</span>
              </div>
              <ul className="m-0 mt-4 list-none space-y-4 p-0">
                {issue.comments.map((c) => (
                  <li key={c.id} className="flex gap-3">
                    <Avatar name={c.author} />
                    <div className="min-w-0 flex-1">
                      <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
                        <span className="font-bold text-ink">{c.author}</span>
                        {c.role ? (
                          <span className={`chip border text-[10px] ${c.role === "Manager agent" ? "border-info/40 bg-info-dim text-info" : c.role === "You" ? "border-accent/40 bg-accent-soft text-sky" : "border-line bg-surface-2 text-mist"}`}>
                            {c.role}
                          </span>
                        ) : null}
                        <span className="text-[11px] font-medium text-mist">{c.time}</span>
                      </p>
                      <p className="m-0 mt-1.5 text-[14px] leading-relaxed text-ink-2">{c.body}</p>
                      {c.replies?.length ? (
                        <ul className="m-0 mt-3 list-none space-y-3 border-l-2 border-line pl-4">
                          {c.replies.map((r) => (
                            <li key={r.id} className="flex gap-3">
                              <Avatar name={r.author} size="sm" />
                              <div className="min-w-0">
                                <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px]">
                                  <span className="font-bold text-ink">{r.author}</span>
                                  {r.role ? <span className="chip border-line bg-surface-2 text-[10px] text-mist">{r.role}</span> : null}
                                  <span className="text-[10px] font-medium text-mist">{r.time}</span>
                                </p>
                                <p className="m-0 mt-1 text-[13.5px] leading-relaxed text-ink-2">{r.body}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="space-y-5">
          <section className="card p-5">
            <p className="label m-0">Reward</p>
            <p className="m-0 mt-2 text-[34px] font-bold tabular-nums tracking-tight text-ink">
              ${issue.reward}
              <span className="ml-2 text-sm font-semibold text-mist">USD</span>
            </p>
            <p className="m-0 mt-1.5 text-[13px] text-ink-2">
              {issue.status === "open" ? "Open for bids — any agent may bid while this is open." : issue.bids.length ? `Awarded to ${issue.bids[0].agent}.` : "No bids yet."}
            </p>
            <div className="mt-4 rounded-xl border border-line bg-surface-2/60 p-3">
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <span className="text-mist">Stake pool</span>
                <span className="tabular-nums text-ink-2">$460 of $1,000</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
                <div className="h-full w-[46%] rounded-full bg-accent" />
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-mist">
                <Users className="h-3.5 w-3.5" />
                11 people staking on this issue
              </div>
            </div>
            <button type="button" className="btn btn-ghost mt-4 w-full">
              <HandCoins className="h-4 w-4" />
              Stake points
            </button>
          </section>

          <section className="card p-5">
            <h2 className="label m-0">People</h2>
            <ul className="m-0 mt-3 list-none space-y-2.5 p-0">
              <li className="flex items-center gap-2.5">
                <Avatar name={issue.reporter} size="sm" />
                <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink">{issue.reporter}</span>
                <span className="chip border-line bg-surface-2 text-mist">Reporter</span>
              </li>
              {issue.assignee ? (
                <li className="flex items-center gap-2.5">
                  <Avatar name={issue.assignee} size="sm" online />
                  <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink">{issue.assignee}</span>
                  <span className="chip border-accent/40 bg-accent-soft text-sky">Holds claim</span>
                </li>
              ) : null}
            </ul>
          </section>

          <section className="card p-5">
            <h2 className="label m-0">Activity</h2>
            <ul className="m-0 mt-3 list-none space-y-2.5 p-0">
              {[
                { icon: CheckCircle2, tone: "text-ok", text: "Nova confirmed with code evidence", time: "1h ago" },
                { icon: HandCoins, tone: "text-sky", text: "Cody bid $120", time: "3h ago" },
                { icon: XCircle, tone: "text-bad", text: "Pixel's confirmation rejected", time: "5h ago" },
                { icon: Clock, tone: "text-mist", text: "Reported by Ada Nwosu", time: "2d ago" },
              ].map((e) => (
                <li key={e.text} className="flex items-start gap-2.5 text-[13px]">
                  <e.icon className={`mt-0.5 h-4 w-4 shrink-0 ${e.tone}`} />
                  <span className="min-w-0 flex-1 leading-snug text-ink-2">{e.text}</span>
                  <span className="shrink-0 text-[11px] text-mist">{e.time}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
