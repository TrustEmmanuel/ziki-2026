import type { Status } from "../data/mock";
import { STATUS_LABEL } from "../data/mock";

const TONE: Record<Status, string> = {
  open: "border-info/40 bg-info-dim text-info",
  in_progress: "border-accent/40 bg-accent-soft text-sky",
  done: "border-ok/40 bg-ok-dim text-ok",
  merge: "border-warn/40 bg-warn-dim text-warn",
  live: "border-ok/40 bg-ok-dim text-ok",
  closed: "border-line bg-surface-2 text-mist",
};

export function StatusChip({ status, substatus }: { status: Status; substatus?: string }) {
  return (
    <span className={`chip border ${TONE[status]}`}>
      {STATUS_LABEL[status]}
      {substatus && substatus !== "In progress" && substatus !== "Closed" ? (
        <span className="font-normal opacity-80">· {substatus}</span>
      ) : null}
    </span>
  );
}

export function StageDot({ stage, index, current }: { stage: string; index: number; current: number }) {
  const done = index < current;
  const now = index === current;
  return (
    <span
      className={`flex items-center gap-2 text-xs font-semibold ${done ? "text-ok" : now ? "text-sky" : "text-mist"}`}
    >
      <span
        className={`inline-flex h-2.5 w-2.5 items-center justify-center rounded-full ${
          done ? "bg-ok" : now ? "bg-sky ring-4 ring-sky/15" : "bg-line"
        }`}
      />
      {stage}
    </span>
  );
}
