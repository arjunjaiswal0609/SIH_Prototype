import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, ShieldCheck, TriangleAlert, Info, CircleAlert, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getSourceById } from "@/services/sourceService";
import { useI18n } from "@/components/ip/jurisdiction";
import type { RiskLevel } from "@/data/referenceData";

/* ---------------------------------- text ---------------------------------- */

export function Eyebrow({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const {
    t
  } = useTranslation();
  return <p className={cn("text-eyebrow", className)}>{children}</p>;
}
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  i18nPrefix
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  actions?: React.ReactNode;
  i18nPrefix?: string;
}) {
  const {
    t
  } = useI18n();
  const translatedEyebrow = i18nPrefix ? t(`${i18nPrefix}.eyebrow`) : eyebrow;
  const translatedTitle = i18nPrefix ? t(`${i18nPrefix}.title`) : title;
  const translatedSubtitle = i18nPrefix && subtitle ? t(`${i18nPrefix}.subtitle`) : subtitle;
  return <header className="workspace-page-header animate-rise border-b border-border pb-8">
      <div className="mb-4 h-1 w-12 rounded-full bg-saffron" />
      <Eyebrow>{translatedEyebrow}</Eyebrow>
      <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.9rem]">
            {translatedTitle}
          </h1>
          {translatedSubtitle ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {translatedSubtitle}
            </p> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
      </div>
    </header>;
}
export function WorkspaceIdentity({
  index,
  code,
  label,
  title,
  signal,
  metric
}: {
  index: string;
  code: string;
  label: string;
  title: string;
  signal: string;
  metric: string;
}) {
  const {
    t
  } = useTranslation();
  return <section className="module-stage animate-rise" aria-label={`${label} workspace`}>
      <div className="module-stage-orbit module-stage-orbit-a" />
      <div className="module-stage-orbit module-stage-orbit-b" />
      <div className="module-stage-lines" />
      <div className="module-stage-left">
        <div className="module-stage-index">{index}</div>
        <div>
          <p className="module-stage-code">{code}</p>
          <p className="module-stage-label">{label}</p>
          <h2 className="module-stage-title">{title}</h2>
          <p className="module-stage-signal">{signal}</p>
        </div>
      </div>
      <div className="module-stage-right">
        <span className="module-stage-live"><span />{t("LIVE WORKSPACE")}</span>
        <strong>{metric}</strong>
        <small>{t("evidence-first workflow")}</small>
      </div>
    </section>;
}
export function SectionTitle({
  title,
  hint,
  className
}: {
  title: string;
  hint?: string;
  className?: string;
}) {
  return <div className={cn("flex items-baseline justify-between gap-4", className)}>
      <h2 className="font-display text-xl text-foreground sm:text-2xl">{title}</h2>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </div>;
}

/* --------------------------------- panels --------------------------------- */

export function Panel({
  children,
  className,
  as: As = "section"
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return <As className={cn("surface-panel rounded-2xl", className)}>{children}</As>;
}

/* ---------------------------------- chips --------------------------------- */

const riskCopy: Record<RiskLevel, {
  label: string;
  icon: React.ElementType;
  className: string;
}> = {
  verified: {
    label: "Documented evidence",
    icon: ShieldCheck,
    className: "border-verified/40 bg-verified/10 text-verified"
  },
  review: {
    label: "Review required",
    icon: TriangleAlert,
    className: "border-review/40 bg-review/10 text-review"
  },
  risk: {
    label: "Potential prior-art signal",
    icon: CircleAlert,
    className: "border-risk/40 bg-risk/10 text-risk"
  },
  info: {
    label: "Informational",
    icon: Info,
    className: "border-info/40 bg-info/10 text-info"
  }
};
export function RiskChip({
  level,
  label,
  className
}: {
  level: RiskLevel;
  label?: string;
  className?: string;
}) {
  const {
    t
  } = useTranslation();
  const cfg = riskCopy[level];
  const Icon = cfg.icon;
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.7rem] font-medium", cfg.className, className)}>
      <Icon className="size-3.5" aria-hidden />
      {label ? t(label) : t(cfg.label)}
    </span>;
}
export function AnalysisChip({
  children
}: {
  children: React.ReactNode;
}) {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-analysis/40 bg-analysis/10 px-2.5 py-1 text-[0.7rem] font-medium text-analysis">
      <Sparkles className="size-3.5" aria-hidden />
      {children}
    </span>;
}
export function JurisdictionPill({
  jurisdiction,
  className
}: {
  jurisdiction: string;
  className?: string;
}) {
  const isIndia = jurisdiction.toLowerCase().includes("india");
  return <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[0.7rem] tracking-tight", isIndia ? "border-saffron/40 bg-saffron/10 text-saffron" : "border-info/40 bg-info/10 text-info", className)}>
      <span aria-hidden>{isIndia ? "🇮🇳" : "🌍"}</span>
      {jurisdiction}
    </span>;
}
export function EvidenceChip({
  children
}: {
  children: React.ReactNode;
}) {
  return <span className="inline-flex items-center rounded-md border border-border bg-accent/50 px-2 py-0.5 text-[0.7rem] text-muted-foreground">
      {children}
    </span>;
}
export function SourceBadge({
  id
}: {
  id: string;
}) {
  const {
    t
  } = useTranslation();
  const source = getSourceById(id);
  if (!source) return null;
  return <Tooltip>
      <TooltipTrigger asChild>
        <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-info/30 bg-info/10 px-2 py-0.5 text-[0.7rem] font-medium text-info transition-colors hover:border-info/60 hover:bg-info/15">
          {t(source.name.split("(")[0]?.trim() || "")}
          <ExternalLink className="size-3" aria-hidden />
        </a>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="font-medium">{t(source.authority)}</p>
        <p className="text-muted-foreground">
          {t(source.jurisdiction)} · {t(source.type)} · {t("last verified")} {source.lastVerified}
        </p>
      </TooltipContent>
    </Tooltip>;
}
export function DataStatusBadge({
  className
}: {
  className?: string;
}) {
  const {
    t
  } = useTranslation();
  return <Badge variant="outline" className={cn("border-botanical/25 bg-botanical/5 font-mono text-[0.63rem] tracking-wide text-botanical", className)}>{t("Reference data")}</Badge>;
}

/* ------------------------------ measurements ------------------------------ */

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && setSeen(true)), {
      threshold: 0.3
    });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return {
    ref,
    seen
  };
}
export function ConfidenceMeter({
  value,
  label = "Confidence",
  className
}: {
  value: number;
  label?: string;
  className?: string;
}) {
  const {
    ref,
    seen
  } = useInView<HTMLDivElement>();
  const tone = value >= 80 ? "bg-verified" : value >= 60 ? "bg-review" : "bg-risk";
  return <div ref={ref} className={cn("w-full", className)}>
      <div className="flex items-baseline justify-between">
        <Eyebrow>{label}</Eyebrow>
        <span className="font-mono text-lg text-foreground">{value}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className={cn("h-full rounded-full transition-[width] duration-1000 ease-out", tone)} style={{
        width: seen ? `${value}%` : "0%"
      }} />
      </div>
    </div>;
}
export function Counter({
  to,
  suffix = "",
  className
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const {
    ref,
    seen
  } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let frame = 0;
    const total = 42;
    const id = window.setInterval(() => {
      frame += 1;
      const p = 1 - Math.pow(1 - frame / total, 3);
      setN(Math.round(to * p));
      if (frame >= total) window.clearInterval(id);
    }, 16);
    return () => window.clearInterval(id);
  }, [seen, to]);
  return <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      {n.toLocaleString("en-IN")}
      {suffix}
    </span>;
}
export function StatTile({
  label,
  value,
  note
}: {
  label: string;
  value: React.ReactNode;
  note?: string;
}) {
  return <div className="dashboard-stat-tile rounded-xl border border-border bg-card p-4 shadow-sm">
      <Eyebrow>{label}</Eyebrow>
      <p className="mt-2 font-display text-2xl text-foreground">{value}</p>
      {note ? <p className="mt-1 text-xs text-muted-foreground">{note}</p> : null}
    </div>;
}
export function Disclaimer({
  children
}: {
  children: React.ReactNode;
}) {
  return <p className="flex items-start gap-2 rounded-lg border border-review/30 bg-review/5 p-3 text-xs leading-relaxed text-review">
      <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
      <span>{children}</span>
    </p>;
}
export function EmptyState({
  title,
  body,
  action
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return <div className="hairline-grid rounded-xl border border-dashed border-border-strong px-6 py-14 text-center">
      <h3 className="font-display text-lg text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{body}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>;
}