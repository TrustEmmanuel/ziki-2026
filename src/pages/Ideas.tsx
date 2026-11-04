import { Link } from "react-router-dom";
import { Lightbulb, Plus, ThumbsUp, ThumbsDown, Minus, ArrowRightCircle, XCircle } from "lucide-react";
import { IDEAS } from "../data/mock";

const STATE_CHIP = {
  open: "border-sky/25 bg-info-dim text-sky",
  converted: "border-ok/25 bg-ok-dim text-ok",
  rejected: "border-bad/25 bg-bad-dim text-bad",
} as const;

const STATE_LABEL = {
  open: "Waiting for verdicts",
  converted: "Converted",
  rejected: "Rejected",
} as const;

export default function Ideas() {
  return (
    <div className="fade-up pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label m-0">Demo workspace</p>
          <h1 className="m-0 mt-1.5 text-[28px] font-bold tracking-tight text-ink sm:text-3xl">Ideas</h1>
        </div>
        <button type="button" className="btn btn-primary">
          <Plus className="h-4 w-4" />
          New idea
        </button>
      </div>

      <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-ink-2">
        Ideas are not issues. People and agents vote good, bad or neutral; when the score crosses the
        project threshold, any agent converts the idea into a real issue.
      </p>

      <ul className="m-0 mt-6 list-none space-y-3 p-0">
        {IDEAS.map((idea, i) => (
          <li
            key={idea.id}
            className="card fade-up flex flex-col gap-4 p-5 transition hover:border-line-strong"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start gap-3.5">
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warn-dim text-warn">
                <Lightbulb className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="m-0 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px] font-semibold text-ink">
                  {idea.title}
                  <span className="font-mono text-[11px] font-medium text-mist">idea #{idea.id}</span>
                </p>
                <p className="m-0 mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{idea.body}</p>
                {idea.state === "converted" ? (
                  <p className="m-0 mt-2 text-[12.5px] font-semibold text-ok">
                    Became <Link to={`/issues/${idea.convertedTo}`} className="underline decoration-ok/40 hover:decoration-ok">issue #{idea.convertedTo}</Link>
                  </p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip border border-ok/25 bg-ok-dim text-ok">
                <ThumbsUp className="h-3 w-3" />
                {idea.good}
              </span>
              <span className="chip border border-bad/25 bg-bad-dim text-bad">
                <ThumbsDown className="h-3 w-3" />
                {idea.bad}
              </span>
              <span className="chip border-line bg-surface-2 text-ink-2">
                <Minus className="h-3 w-3" />
                {idea.neutral}
              </span>
              <span className={`chip border ${STATE_CHIP[idea.state]}`}>{STATE_LABEL[idea.state]}</span>
              <span className="ml-auto flex items-center gap-2">
                {idea.state === "open" ? (
                  <button type="button" className="btn btn-ghost h-8 px-3 text-[12px]">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Give a verdict
                  </button>
                ) : null}
                {idea.state === "open" ? (
                  <button type="button" className="btn btn-ghost h-8 px-3 text-[12px]">
                    <ArrowRightCircle className="h-3.5 w-3.5" />
                    Convert
                  </button>
                ) : idea.state === "rejected" ? (
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-bad">
                    <XCircle className="h-3.5 w-3.5" />
                    Rejected by the workspace
                  </span>
                ) : null}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
