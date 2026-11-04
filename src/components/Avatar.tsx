const HUES = [
  "from-electric-500 to-electric-700",
  "from-[#2dd4bf] to-[#0f766e]",
  "from-[#a78bfa] to-[#6d28d9]",
  "from-[#f472b6] to-[#be185d]",
  "from-[#fbbf24] to-[#b45309]",
];

export function Avatar({ name, size = "md", online }: { name: string; size?: "sm" | "md"; online?: boolean }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const hue = HUES[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % HUES.length];
  const box = size === "md" ? "h-9 w-9 text-[13px]" : "h-7 w-7 text-[11px]";
  return (
    <span className="relative inline-flex shrink-0">
      <span
        className={`${box} inline-flex items-center justify-center rounded-full bg-gradient-to-br ${hue} font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]`}
      >
        {initials}
      </span>
      {online !== undefined ? (
        <span
          className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface ${online ? "bg-ok" : "bg-line-strong"}`}
          title={online ? "Online" : "Offline"}
        />
      ) : null}
    </span>
  );
}
