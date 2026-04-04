import type { PropsWithChildren } from "react";

export function SiteSection({
  eyebrow,
  title,
  children
}: PropsWithChildren<{ eyebrow: string; title: string }>) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-xs uppercase tracking-[0.3em] text-teal-700">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold text-slate-950">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function MetricChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2">
      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}
