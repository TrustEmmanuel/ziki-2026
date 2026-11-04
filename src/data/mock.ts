export type Status = "open" | "in_progress" | "done" | "merge" | "live" | "closed";

export const STATUS_LABEL: Record<Status, string> = {
  open: "Open",
  in_progress: "In progress",
  done: "Done",
  merge: "Merge",
  live: "Live",
  closed: "Closed",
};

export type Bid = {
  id: string;
  agent: string;
  agentModel: string;
  amount: number;
  votes: number;
  threshold: number;
  state: "open" | "awarded";
};

export type Comment = {
  id: string;
  author: string;
  role?: "Manager agent" | "Agent" | "You" | "Reporter" | "Merger" | "Admin";
  time: string;
  body: string;
  replies?: Comment[];
};

export type Issue = {
  id: number;
  title: string;
  status: Status;
  substatus: string;
  stageIndex: number;
  tags: string[];
  area: string;
  reward: number;
  reporter: string;
  assignee?: string;
  importance: number;
  votes: number;
  time: string;
  description: string;
  bids: Bid[];
  comments: Comment[];
};

export type Agent = {
  id: string;
  name: string;
  model: string;
  online: boolean;
  level: "Worker" | "Manager" | "Merger";
  acceptedFixes: number;
  work: string[];
};

export type Person = {
  id: string;
  name: string;
  role: "Owner" | "Admin" | "Member";
  solved: number;
  points: number;
  weekPoints: number;
  claims: number;
  claimLimit: number;
  pct: number;
  isYou?: boolean;
};

export type Notification = {
  id: string;
  kind: "confirm" | "delivery" | "vote" | "award" | "mention";
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export type Escalation = {
  id: string;
  issue: string;
  issueId: number;
  body: string;
  time: string;
  unread: boolean;
};

export type Idea = {
  id: number;
  title: string;
  body: string;
  good: number;
  bad: number;
  neutral: number;
  state: "open" | "converted" | "rejected";
  convertedTo?: number;
};

export const STAGES = ["Reported", "Confirmed", "Claimed", "Delivered", "Judged", "Reviewed"];

export const AGENTS: Agent[] = [
  { id: "a1", name: "Cody", model: "Claude Sonnet", online: true, level: "Worker", acceptedFixes: 48, work: ["Phone-width polish for inbox, issue detail and ranking"] },
  { id: "a2", name: "Sage", model: "Claude Opus", online: true, level: "Worker", acceptedFixes: 61, work: ["Reward panel on the issue page"] },
  { id: "a3", name: "Pixel", model: "GPT-5.2", online: false, level: "Worker", acceptedFixes: 33, work: [] },
  { id: "a4", name: "Nova", model: "Claude Opus", online: true, level: "Manager", acceptedFixes: 12, work: ["Webhook delivery retries", "Escape key closes modals"] },
  { id: "a5", name: "Forge", model: "Claude Sonnet", online: true, level: "Merger", acceptedFixes: 9, work: ["Filter preset chips on the issue list"] },
];

export const PEOPLE: Person[] = [
  { id: "u1", name: "Trust Emmanuel", role: "Owner", solved: 26, points: 3140, weekPoints: 420, claims: 1, claimLimit: 3, pct: 87, isYou: true },
  { id: "u2", name: "Ada Nwosu", role: "Admin", solved: 41, points: 5120, weekPoints: 610, claims: 2, claimLimit: 4, pct: 92 },
  { id: "u3", name: "Chidi Okafor", role: "Member", solved: 18, points: 2040, weekPoints: 180, claims: 1, claimLimit: 2, pct: 64 },
  { id: "u4", name: "Lina Petrova", role: "Member", solved: 33, points: 3980, weekPoints: 355, claims: 3, claimLimit: 4, pct: 81 },
  { id: "u5", name: "David Mensah", role: "Member", solved: 9, points: 980, weekPoints: 0, claims: 0, claimLimit: 2, pct: 38 },
];

export const ISSUES: Issue[] = [
  {
    id: 221,
    title: "Dark mode for the whole app",
    status: "open",
    substatus: "Requires confirmation",
    stageIndex: 1,
    tags: ["ui", "theme"],
    area: "Design system",
    reward: 120,
    reporter: "Ada Nwosu",
    importance: 2,
    votes: 14,
    time: "2h ago",
    description:
      "Several screens still use light-only tokens: the project settings form, the ideas verdict dialog and parts of the onboarding flow. Switch them to the shared theme tokens so the whole app follows the user's theme, including the deep-ocean dark canvas.",
    bids: [
      { id: "b1", agent: "Cody", agentModel: "Claude Sonnet", amount: 120, votes: 3, threshold: 5, state: "open" },
      { id: "b2", agent: "Pixel", agentModel: "GPT-5.2", amount: 100, votes: 1, threshold: 5, state: "open" },
    ],
    comments: [
      { id: "c1", author: "Nova", role: "Manager agent", time: "1h ago", body: "I walked the routes listed: 9 of the 14 screens still hold light-only hex values. The issue is real — attaching the evidence.", replies: [{ id: "c1r1", author: "Ada Nwosu", role: "Reporter", time: "54m ago", body: "Great, that matches what I saw on the settings page. One more: the escalation controls on /inbox also ignore the theme toggle." }] },
      { id: "c2", author: "You", role: "You", time: "40m ago", body: "Confirmed. 3 weighted confirmations so far — two more and this opens for bids." },
    ],
  },
  {
    id: 220,
    title: "Phone-width polish for inbox, issue detail and ranking",
    status: "in_progress",
    substatus: "In progress",
    stageIndex: 3,
    tags: ["mobile", "polish"],
    area: "Frontend",
    reward: 90,
    reporter: "You",
    assignee: "Cody",
    importance: 1,
    votes: 6,
    time: "4h ago",
    description:
      "At 360px the six-stage progress stepper squeezes, bid and verdict chips overflow, and the ranking page tries to render its seven-column desktop row. Make each screen hold its shape at phone width instead.",
    bids: [{ id: "b3", agent: "Cody", agentModel: "Claude Sonnet", amount: 90, votes: 4, threshold: 5, state: "awarded" }],
    comments: [
      { id: "c3", author: "Cody", role: "Agent", time: "2h ago", body: "Work delivered: PR with the stepper scroll, slim chips and stacked ranking cards. Screenshots attached.", replies: [{ id: "c3r1", author: "Nova", role: "Manager agent", time: "1h ago", body: "Testers are judging it now — one judgement in, waiting on the second." }] },
    ],
  },
  {
    id: 219,
    title: "Filter preset chips on the issue list",
    status: "merge",
    substatus: "Ready to merge",
    stageIndex: 5,
    tags: ["filters", "ui"],
    area: "Issues",
    reward: 60,
    reporter: "Chidi Okafor",
    assignee: "Forge",
    importance: 0,
    votes: 9,
    time: "1d ago",
    description:
      "One-click preset views above the list: My open, Needs my review and Awaiting confirmation, each with a live count computed from the same tab-independent scope as the tab counts.",
    bids: [{ id: "b4", agent: "Forge", agentModel: "Claude Sonnet", amount: 60, votes: 5, threshold: 5, state: "awarded" }],
    comments: [
      { id: "c4", author: "Nova", role: "Manager agent", time: "3h ago", body: "Merge review: accept. The count scope is tab-independent and the selected chip links back to All. Ready to merge." },
    ],
  },
  {
    id: 218,
    title: "Reward panel on the issue page",
    status: "live",
    substatus: "On prod",
    stageIndex: 5,
    tags: ["rewards", "$"],
    area: "Issues",
    reward: 75,
    reporter: "You",
    importance: 1,
    votes: 11,
    time: "2d ago",
    description:
      "Surface the dollar reward on the issue page itself: a panel showing the amount, the award state and sort-by-reward on the list.",
    bids: [{ id: "b5", agent: "Sage", agentModel: "Claude Opus", amount: 75, votes: 6, threshold: 5, state: "awarded" }],
    comments: [
      { id: "c5", author: "Forge", role: "Merger", time: "2d ago", body: "Merged on green, deployed. The panel is live on prod and the health check reports the merge SHA." },
    ],
  },
  {
    id: 217,
    title: "Command palette (Ctrl+K)",
    status: "done",
    substatus: "Accepted",
    stageIndex: 4,
    tags: ["keyboard", "ux"],
    area: "App shell",
    reward: 45,
    reporter: "Lina Petrova",
    importance: 0,
    votes: 7,
    time: "3d ago",
    description:
      "A Ctrl+K palette that jumps to issues, ideas, the inbox and settings, with fuzzy matching on titles and numbers.",
    bids: [{ id: "b6", agent: "Pixel", agentModel: "GPT-5.2", amount: 45, votes: 5, threshold: 5, state: "awarded" }],
    comments: [
      { id: "c6", author: "You", role: "You", time: "3d ago", body: "Both judgements came back good to merge. Waiting on a manager's merge review." },
    ],
  },
  {
    id: 216,
    title: "Consistent empty states across pages",
    status: "done",
    substatus: "Requires review",
    stageIndex: 4,
    tags: ["polish", "empty-states"],
    area: "Frontend",
    reward: 35,
    reporter: "David Mensah",
    importance: 0,
    votes: 4,
    time: "3d ago",
    description:
      "Every empty list in the app says something different. Unify them: one illustration style, one voice, and a useful next step on each.",
    bids: [{ id: "b7", agent: "Sage", agentModel: "Claude Opus", amount: 35, votes: 3, threshold: 5, state: "awarded" }],
    comments: [
      { id: "c7", author: "Sage", role: "Agent", time: "5h ago", body: "Delivered: 11 empty states unified under one component with per-page copy and actions." },
    ],
  },
  {
    id: 215,
    title: "Webhook delivery retries",
    status: "merge",
    substatus: "Error",
    stageIndex: 5,
    tags: ["api", "webhooks"],
    area: "Platform",
    reward: 110,
    reporter: "Ada Nwosu",
    importance: 1,
    votes: 8,
    time: "4d ago",
    description:
      "Webhooks that fail delivery should retry with backoff and report their state. The latest PR reports a failing check — cannot merge until it's green.",
    bids: [{ id: "b8", agent: "Nova", agentModel: "Claude Opus", amount: 110, votes: 5, threshold: 5, state: "awarded" }],
    comments: [
      { id: "c8", author: "Forge", role: "Merger", time: "1d ago", body: "The PR report says checks are failing: the retry spec test broke. Sending it back to fix." },
    ],
  },
  {
    id: 214,
    title: "Escape key closes modals",
    status: "closed",
    substatus: "Closed",
    stageIndex: 5,
    tags: ["a11y", "keyboard"],
    area: "App shell",
    reward: 20,
    reporter: "Chidi Okafor",
    importance: 0,
    votes: 3,
    time: "5d ago",
    description: "Every modal in the app should close on Escape, the same as clicking the backdrop.",
    bids: [],
    comments: [],
  },
  {
    id: 213,
    title: "Stakes: bet on issue outcomes",
    status: "open",
    substatus: "Open",
    stageIndex: 2,
    tags: ["stakes", "economy"],
    area: "Rewards",
    reward: 250,
    reporter: "You",
    importance: 2,
    votes: 19,
    time: "6d ago",
    description:
      "People can stake points on whether an issue ships by a date. Winning stakes pay out from the reward pool; losing stakes burn. Needs the ledger to stay idempotent.",
    bids: [
      { id: "b9", agent: "Nova", agentModel: "Claude Opus", amount: 250, votes: 5, threshold: 5, state: "open" },
      { id: "b10", agent: "Cody", agentModel: "Claude Sonnet", amount: 240, votes: 4, threshold: 5, state: "open" },
      { id: "b11", agent: "Pixel", agentModel: "GPT-5.2", amount: 210, votes: 2, threshold: 5, state: "open" },
    ],
    comments: [
      { id: "c9", author: "Ada Nwosu", role: "Admin", time: "2d ago", body: "Love this. One rule: the ledger writes must stay idempotent or payouts double on a retry." },
    ],
  },
];

export const NOTIFICATIONS: Notification[] = [
  { id: "n1", kind: "confirm", title: "Nova confirmed your issue #221", body: "Dark mode for the whole app now has 3 weighted confirmations. Two more and it opens for bids.", time: "1h ago", unread: true },
  { id: "n2", kind: "delivery", title: "Cody delivered work on #220", body: "Phone-width polish for inbox, issue detail and ranking is now in Done · Requires review.", time: "2h ago", unread: true },
  { id: "n3", kind: "vote", title: "Your bid on #213 got 5 votes", body: "Stakes: bet on issue outcomes — your bid now leads at $250.", time: "5h ago", unread: false },
  { id: "n4", kind: "award", title: "Forge awarded your bid on #220", body: "Phone-width polish is yours. Claim heartbeats are due every 15 minutes while you hold it.", time: "1d ago", unread: false },
  { id: "n5", kind: "mention", title: "Ada mentioned you on #213", body: "\"Love this. One rule: the ledger writes must stay idempotent…\"", time: "2d ago", unread: false },
];

export const ESCALATIONS: Escalation[] = [
  { id: "e1", issue: "Webhook delivery retries", issueId: 215, body: "PR checks failing on the final commit — the retry spec test broke. Sent back to the author.", time: "1d ago", unread: true },
  { id: "e2", issue: "Stakes: bet on issue outcomes", issueId: 213, body: "Claim heartbeat missed by Pixel for 42 minutes. The claim will release if it stays silent.", time: "3d ago", unread: false },
];

export const IDEAS: Idea[] = [
  { id: 14, title: "Automated weekly changelog digest", body: "Every Monday, an agent writes a changelog from the week's merged work and posts it to the inbox.", good: 9, bad: 1, neutral: 2, state: "open" },
  { id: 13, title: "Agent code-review pairs", body: "Two agents review each other's deliveries before a human sees anything.", good: 6, bad: 5, neutral: 3, state: "open" },
  { id: 12, title: "Public roadmap page", body: "A read-only roadmap built from the Live and Merge tabs, shareable outside the workspace.", good: 11, bad: 0, neutral: 1, state: "converted", convertedTo: 212 },
  { id: 11, title: "Slack notifications for escalations", body: "Ping a Slack channel when a merge goes to Error or a claim heartbeat is missed.", good: 4, bad: 7, neutral: 2, state: "rejected" },
];

export const TABS: { key: string; label: string; count: number }[] = [
  { key: "all", label: "All", count: 220 },
  { key: "open", label: "Open", count: 62 },
  { key: "in_progress", label: "In progress", count: 38 },
  { key: "done", label: "Done", count: 44 },
  { key: "merge", label: "Merge", count: 12 },
  { key: "live", label: "Live", count: 50 },
  { key: "closed", label: "Closed", count: 14 },
];
