import { useTranslation } from "react-i18next";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Disclaimer, EvidenceChip, Eyebrow, PageHeader, WorkspaceIdentity, Panel, DataStatusBadge, SourceBadge } from "@/components/ip/primitives";
import { getPatentRecords } from "@/services/patentService";
import { listPlants } from "@/services/plantService";
import type { PlantRecord } from "@/data/referenceData";
export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [{
      title: "Traditional Knowledge Family Explorer — IP-SAKTI Sahayak"
    }, {
      name: "description",
      content: "Explore botanical families, genera, TKDL evidence and related research candidates around an Ayurvedic plant."
    }, {
      property: "og:title",
      content: "Traditional Knowledge Family Explorer"
    }, {
      property: "og:description",
      content: "Botanical family, TKDL evidence and related candidates in one knowledge graph."
    }]
  }),
  component: Knowledge
});
function GraphView({
  plant
}: {
  plant: PlantRecord;
}) {
  const {
    t
  } = useTranslation();
  const related = plant.relatedIds.map(id => listPlants().find(p => p.id === id)).filter((p): p is PlantRecord => Boolean(p));
  const cases = getPatentRecords().filter(r => r.plants.includes(plant.common));
  const rings = [{
    label: plant.genus,
    tone: "oklch(0.66 0.09 155)"
  }, {
    label: plant.family,
    tone: "oklch(0.7 0.12 235)"
  }, {
    label: `${plant.tkdlRecords} TKDL records`,
    tone: "oklch(0.7 0.13 155)"
  }, {
    label: `${cases.length} examination cases`,
    tone: "oklch(0.79 0.145 72)"
  }];
  return <svg viewBox="0 0 620 340" className="w-full" role="img" aria-label={`Knowledge graph for ${plant.common}`}>
      <circle cx="150" cy="170" r="46" fill="oklch(0.975 0.02 90)" stroke="oklch(0.68 0.14 72)" />
      <text x="150" y="167" textAnchor="middle" style={{
      fontSize: 12,
      fill: "oklch(0.25 0.035 155)"
    }}>
        {plant.common}
      </text>
      <text x="150" y="183" textAnchor="middle" style={{
      fontSize: 8.5,
      fill: "oklch(0.49 0.025 150)"
    }}>
        {plant.botanical}
      </text>
      {rings.map((r, i) => {
      const y = 50 + i * 80;
      return <g key={r.label}>
            <path d={`M 196 170 C 280 170, 300 ${y + 20}, 400 ${y + 20}`} fill="none" stroke={r.tone} strokeWidth="1.2" opacity="0.7" className="animate-trace" />
            <rect x="400" y={y} width="180" height="40" rx="8" fill="oklch(0.985 0.008 90)" stroke={r.tone} />
            <text x="490" y={y + 24} textAnchor="middle" style={{
          fontSize: 10,
          fill: "oklch(0.25 0.035 155)"
        }}>
              {r.label}
            </text>
          </g>;
    })}
      {related.length ? <text x="150" y="266" textAnchor="middle" style={{
      fontSize: 9,
      fill: "oklch(0.49 0.025 150)"
    }}>
          {related.length}{t("related candidates")}</text> : null}
    </svg>;
}
function Knowledge() {
  const {
    t
  } = useTranslation();
  const [activeId, setActiveId] = useState("ashwagandha");
  const active = listPlants().find(p => p.id === activeId) ?? listPlants()[0];
  if (!active) return null;
  const candidates = listPlants().filter(p => p.id !== active.id).sort((a, b) => b.similarity - a.similarity).slice(0, 6);
  return <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 workspace-page workspace-page-knowledge">
      <WorkspaceIdentity index="05" code="TK-05" label={t("KNOWLEDGE GRAPH")} title={t("Map botanical knowledge into defensible evidence")} signal="Map botanical knowledge into defensible evidence · MAP / CONNECT" metric="MAP / CONNECT" />

      <PageHeader eyebrow={t("Botanical intelligence")} title={t("Traditional Knowledge Family Explorer")} subtitle={t("Botanical family, genus, documented traditional use and related research candidates — with the official record behind each claim.")} i18nPrefix="pg.knowledge"
    // actions={<DataStatusBadge />}
    />

      <div className="mt-6 flex flex-wrap gap-1.5">
        {listPlants().map(p => {
        return <button key={p.id} onClick={() => setActiveId(p.id)} className={p.id === activeId ? "rounded-md bg-saffron px-3 py-1.5 text-xs font-semibold text-saffron-foreground" : "rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-saffron/40 hover:text-foreground"}>
            {t(p.common)}
          </button>;
      })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <Panel className="p-6">
          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="font-display text-2xl text-foreground">{active.common}</h2>
            <span className="italic text-sm text-muted-foreground">{active.botanical}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <EvidenceChip>{t("Genus ·")}{active.genus}</EvidenceChip>
            <EvidenceChip>{t("Family ·")}{active.family}</EvidenceChip>
            <EvidenceChip>{t("Evidence level ·")}{active.evidenceLevel}</EvidenceChip>
            <EvidenceChip>{active.tkdlRecords}{t("TKDL records")}</EvidenceChip>
          </div>

          <div className="mt-5 overflow-x-auto">
            <div className="min-w-[560px]">
              <GraphView plant={active} />
            </div>
          </div>

          <Separator className="my-5" />

          <dl className="grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-eyebrow">{t("Traditional use")}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{active.traditionalUse}</dd>
            </div>
            <div>
              <dt className="text-eyebrow">{t("Plant part")}</dt>
              <dd className="mt-1 text-sm text-foreground">{active.parts.join(", ")}</dd>
            </div>
            <div>
              <dt className="text-eyebrow">{t("Formulation role")}</dt>
              <dd className="mt-1 text-sm text-foreground">{active.role}</dd>
            </div>
            <div>
              <dt className="text-eyebrow">{t("Official source")}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                <SourceBadge id="tkdl" />
                <SourceBadge id="ayush" />
              </dd>
            </div>
          </dl>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-6">
            <Eyebrow>{t("Potential alternative candidates for further research")}</Eyebrow>
            <ul className="mt-4 space-y-3">
              {candidates.map(c => <li key={c.id} className="rounded-lg border border-border bg-background/40 p-4 transition-colors hover:border-saffron/35">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <button onClick={() => setActiveId(c.id)} className="font-display text-base text-foreground hover:text-saffron">
                      {c.common}
                    </button>
                    <span className="italic text-xs text-muted-foreground">{c.botanical}</span>
                    <span className="ml-auto font-mono text-sm text-saffron">{c.similarity}%</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{c.whyRanked}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <EvidenceChip>{t("Evidence ·")}{c.evidenceLevel}</EvidenceChip>
                    <EvidenceChip>{c.family}</EvidenceChip>
                    <SourceBadge id="tkdl" />
                  </div>
                </li>)}
            </ul>
            <Button variant="ghost" size="sm" className="mt-4">{t("Load more candidates")}</Button>
          </Panel>

          <Disclaimer>{t("Same family or genus does not establish medicinal equivalence or freedom from patent infringement. Candidates are research leads only, never substitutes.")}</Disclaimer>
        </div>
      </div>
    </div>;
}