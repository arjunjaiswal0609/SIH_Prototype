import { useTranslation } from "react-i18next";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Disclaimer, Eyebrow, EvidenceChip, JurisdictionPill, PageHeader, WorkspaceIdentity, Panel, DataStatusBadge } from "@/components/ip/primitives";
import { getEvidenceGraph, fetchPriorArtGraph } from "@/services/priorArtService";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { EmptyState } from "@/components/ip/primitives";
import { getSourceById } from "@/services/sourceService";
import type { EvidenceNode } from "@/data/referenceData";
export const Route = createFileRoute("/prior-art")({
  validateSearch: (search: Record<string, unknown>): {
    query?: string;
  } => {
    const q = search["query"];
    return typeof q === "string" ? {
      query: q
    } : {};
  },
  head: () => ({
    meta: [{
      title: "Evidence Explorer — Prior Art | IP-SAKTI Sahayak"
    }, {
      name: "description",
      content: "Trace a formulation through detected ingredients, TKDL records, patent cases and international records in one interactive evidence graph."
    }, {
      property: "og:title",
      content: "Evidence Explorer — IP-SAKTI Sahayak"
    }, {
      property: "og:description",
      content: "Interactive prior-art evidence graph with official sources on every node."
    }]
  }),
  component: PriorArt
});
const layers: Array<{
  key: EvidenceNode["layer"];
  label: string;
  tone: string;
}> = [{
  key: "formulation",
  label: "Your formulation",
  tone: "border-saffron/50 bg-saffron/10 text-saffron"
}, {
  key: "ingredient",
  label: "Detected ingredients",
  tone: "border-botanical/50 bg-botanical/10 text-botanical"
}, {
  key: "tkdl",
  label: "TKDL records",
  tone: "border-verified/50 bg-verified/10 text-verified"
}, {
  key: "patent",
  label: "Patent cases",
  tone: "border-review/50 bg-review/10 text-review"
}, {
  key: "international",
  label: "International records",
  tone: "border-info/50 bg-info/10 text-info"
}];
const columnX = 90;
const colGap = 150;
function positions(nodesData: EvidenceNode[]) {
  const map = new Map<string, {
    x: number;
    y: number;
  }>();
  layers.forEach((layer, li) => {
    const nodes = nodesData.filter(n => n.layer === layer.key);
    nodes.forEach((n, ni) => {
      map.set(n.id, {
        x: columnX + li * colGap,
        y: 60 + ni * 78 + (nodes.length === 1 ? 78 : 0)
      });
    });
  });
  return map;
}
function PriorArt() {
  const {
    t
  } = useTranslation();
  const search = Route.useSearch();
  const [data, setData] = useState<{
    nodes: EvidenceNode[];
    edges: Array<[string, string]>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Fallback to localStorage if accessed via navbar without a query param
    const activeQuery = search.query || localStorage.getItem('last_prior_art_query') || undefined;
    
    if (activeQuery) {
      localStorage.setItem('last_prior_art_query', activeQuery);
    }
    
    fetchPriorArtGraph(activeQuery).then(res => {
      setData(res as any);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setError("Failed to fetch graph data");
      setLoading(false);
    });
  }, [search.query]);
  const pos = data ? positions(data.nodes) : new Map();
  const [selected, setSelected] = useState<EvidenceNode | null>(null);

  useEffect(() => {
    if (data && data.nodes && data.nodes.length > 0 && !selected) {
      setSelected(data.nodes[3] ?? data.nodes[0]);
    }
  }, [data, selected]);

  const source = selected?.source ? getSourceById(selected.source) : undefined;
  return <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 workspace-page workspace-page-prior-art">
      <WorkspaceIdentity index="03" code="EV-03" label={t("PRIOR-ART TRACE")} title={t("Connect claims to evidence")} signal="Connect claims to evidence · TRACE / PROVE" metric="TRACE / PROVE" />

      <PageHeader eyebrow={t("Evidence explorer")} title={t("Prior-art trace")} subtitle={t("Formulation → detected ingredients → TKDL records → patent cases → international records. Select any node to inspect the underlying record.")} i18nPrefix="pg.priorArt"
    // actions={<DataStatusBadge />}
    />

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {loading ? <div className="col-span-2 flex h-64 items-center justify-center">
             <Loader2 className="size-8 animate-spin text-saffron" />
           </div> : error ? <div className="col-span-2 flex h-64 items-center justify-center text-red-500">
             {error}
           </div> : !data || data.nodes.length === 0 ? <div className="col-span-2">
             <EmptyState title={t("No prior art found")} body={t("No prior art graph can be constructed for this query.")} action={<span />} />
           </div> : <>
        <Panel className="overflow-hidden p-5">
          <div className="flex flex-wrap gap-2">
            {layers.map(l => <span key={l.key} className={`rounded-full border px-2.5 py-1 text-[0.65rem] font-medium ${l.tone}`}>
                {l.label}
              </span>)}
          </div>

          <div className="mt-5 overflow-x-auto">
            <svg viewBox="0 0 780 400" className="min-w-[720px]" role="img" aria-label={t("Prior art evidence graph")}>
              {(data?.edges || []).map(([from, to]) => {
                const a = pos.get(from);
                const b = pos.get(to);
                if (!a || !b) return null;
                const active = selected && (selected.id === from || selected.id === to);
                return <path key={`${from}-${to}`} d={`M ${a.x + 52} ${a.y} C ${a.x + 110} ${a.y}, ${b.x - 110} ${b.y}, ${b.x - 52} ${b.y}`} fill="none" stroke={active ? "oklch(0.68 0.14 72)" : "oklch(0.78 0.025 150)"} strokeWidth={active ? 1.8 : 1} opacity={active ? 1 : 0.6} />;
              })}
              {(data?.nodes || []).map(n => {
                const p = pos.get(n.id);
                if (!p) return null;
                const active = selected?.id === n.id;
                return <g key={n.id} transform={`translate(${p.x - 52} ${p.y - 22})`} onClick={() => setSelected(n)} className="cursor-pointer">
                    <rect width="104" height="44" rx="8" fill={active ? "oklch(0.975 0.025 90)" : "oklch(1 0 0)"} stroke={active ? "oklch(0.68 0.14 72)" : "oklch(0.78 0.025 150)"} />
                    <text x="52" y="26" textAnchor="middle" style={{
                    fontSize: 9.5,
                    fill: "oklch(0.25 0.035 155)"
                  }}>
                      {n.label.length > 20 ? `${n.label.slice(0, 19)}…` : n.label}
                    </text>
                  </g>;
              })}
            </svg>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t("Graph edges show documented relationships in the reference dataset. They do not assert any legal conclusion.")}</p>
        </Panel>

        <div className="space-y-6">
          {selected ? <Panel className="animate-rise p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Eyebrow className="mr-auto">{t("Evidence node")}</Eyebrow>
                {selected.jurisdiction ? <JurisdictionPill jurisdiction={selected.jurisdiction} /> : null}
              </div>
              <h2 className="mt-3 font-display text-xl text-foreground">{selected.label}</h2>
              {selected.passage ? <blockquote className="mt-4 border-l-2 border-saffron/60 pl-4 text-sm leading-relaxed text-muted-foreground">
                  {selected.passage}
                </blockquote> : null}

              <Separator className="my-5" />

              <dl className="grid gap-4 sm:grid-cols-2">
                <Field label={t("Source")} value={source?.name ?? "User submission"} />
                <Field label={t("Case / record number")} value={selected.caseNumber ?? "—"} />
                <Field label={t("Outcome")} value={selected.outcome ?? "Not applicable"} />
                <Field label={t("Source date")} value={selected.sourceDate ?? "—"} />
                <Field label={t("Verification")} value={selected.verification} />
                <Field label={t("Authority")} value={source?.authority ?? "—"} />
              </dl>

              {source ? <Button asChild variant="evidence" size="sm" className="mt-5">
                  <a href={source.url} target="_blank" rel="noreferrer">{t("Open official source")}<ExternalLink className="size-3.5" aria-hidden />
                  </a>
                </Button> : null}
            </Panel> : null}

          <Panel className="p-5">
            <Eyebrow>{t("Trace summary")}</Eyebrow>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>{t("· 2 ingredients detected from the described formulation.")}</li>
              <li>{t("· 2 documented traditional knowledge records located.")}</li>
              <li>{t("· 1 granted Indian claim in the same concept space.")}</li>
              <li>{t("· 2 international records requiring review.")}</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <EvidenceChip>{t("Preliminary assessment")}</EvidenceChip>
              <EvidenceChip>{t("Further verification required")}</EvidenceChip>
            </div>
          </Panel>

          <Disclaimer>{t("Documented prior art does not automatically invalidate any patent. Invalidity and infringement questions require formal legal analysis by a qualified professional.")}</Disclaimer>
        </div>
        </>}
      </div>
    </div>;
}
function Field({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return <div>
      <dt className="text-eyebrow">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>;
}