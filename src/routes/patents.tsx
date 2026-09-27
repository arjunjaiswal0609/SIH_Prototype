import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Disclaimer, EmptyState, EvidenceChip, Eyebrow, JurisdictionPill, PageHeader, WorkspaceIdentity, Panel, DataStatusBadge, RiskChip, SourceBadge } from "@/components/ip/primitives";
import type { PatentRecord } from "@/data/referenceData";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";
export const Route = createFileRoute("/patents")({
  head: () => ({
    meta: [{
      title: "Patent Intelligence — IP-SAKTI Sahayak"
    }, {
      name: "description",
      content: "Find patents and prior art by concept, not just keywords, across TKDL, IP India, WIPO, EPO and USPTO records."
    }, {
      property: "og:title",
      content: "Patent Intelligence — IP-SAKTI Sahayak"
    }, {
      property: "og:description",
      content: "Concept-level patent and prior-art search with jurisdiction on every result."
    }]
  }),
  component: PatentIntelligence
});
const sources = ["TKDL", "IP India", "WIPO", "EPO", "USPTO", "Other"];
const searchTypes = ["Semantic", "Hybrid", "Exact"] as const;
function ResultCard({
  record
}: {
  record: PatentRecord;
}) {
  const {
    t
  } = useTranslation();
  return <article className="surface-panel animate-rise rounded-xl p-5 transition-colors hover:border-saffron/35">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-saffron">{record.number}</span>
        <JurisdictionPill jurisdiction={record.jurisdiction} />
        <EvidenceChip>{record.status}</EvidenceChip>
        <EvidenceChip>{record.ipType}</EvidenceChip>
        <div className="ml-auto flex items-center gap-2">
          <RiskChip level={record.risk} />
        </div>
      </div>

      <h3 className="mt-3 font-display text-lg leading-snug text-foreground">{record.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        {record.applicant} · published {record.published}
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Eyebrow>{t("Why relevant")}</Eyebrow>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{record.whyRelevant}</p>
        </div>
        <div className="lg:w-40">
          <Eyebrow>{t("Conceptual similarity")}</Eyebrow>
          <p className="mt-1 font-mono text-2xl text-foreground">{record.similarity}%</p>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-saffron" style={{
            width: `${record.similarity}%`
          }} />
          </div>
          <p className="mt-1 text-[0.65rem] leading-tight text-muted-foreground">{t("Retrieval score — not a legal probability.")}</p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-wrap items-center gap-2">
        <Eyebrow className="mr-1">{t("Concepts")}</Eyebrow>
        {record.concepts.map(c => <EvidenceChip key={c}>{c}</EvidenceChip>)}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Eyebrow className="mr-1">{t("Sources")}</Eyebrow>
        {record.sources.map(s => <SourceBadge key={s} id={s} />)}
        <EvidenceChip>{record.evidenceLevel}</EvidenceChip>
      </div>
    </article>;
}
function PatentIntelligence() {
  const {
    t
  } = useTranslation();
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("Both");
  const [type, setType] = useState<typeof searchTypes[number]>("Semantic");
  const [activeSources, setActiveSources] = useState<string[]>(sources);
  const [plant, setPlant] = useState("All");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [ran, setRan] = useState(false);
  const [records, setRecords] = useState<PatentRecord[]>([]);
  const [allPlants, setAllPlants] = useState<string[]>([]);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setRan(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/patents/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          scope,
          type,
          activeSources,
          plant,
          status
        })
      });
      const data = await response.json();
      setRecords(data);
      
      // Dynamically extract plants from results to populate the filter dropdown
      const plants = Array.from(new Set(data.flatMap((r: PatentRecord) => r.plants))).sort() as string[];
      setAllPlants(plants);
    } catch (err) {
      console.error("Patent search failed:", err);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };



  const results = records
    .filter(r => status === "All" ? true : r.status === status)
    .sort((a, b) => b.similarity - a.similarity);

  return <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 workspace-page workspace-page-patents">
      <WorkspaceIdentity index="02" code="IP-02" label={t("PATENT DISCOVERY")} title={t("Search the prior landscape")} signal="Search the prior landscape · SEARCH / MATCH" metric="SEARCH / MATCH" />

      <PageHeader eyebrow={t("Concept retrieval")} title={t("Patent Intelligence")} subtitle={t("Find patents and prior art by concept, not just keywords.")} i18nPrefix="pg.patents"
    // actions={<DataStatusBadge />}
    />

      <Panel className="mt-8 p-5">
        <Eyebrow>{t("Describe your invention or formulation in your own words")}</Eyebrow>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row">
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder={t("Describe your invention or formulation in your own words...")} className="h-12 border-border bg-background/60 text-sm" />
          <Button variant="saffron" className="h-12 px-6" onClick={search} disabled={loading || !query.trim()}>
            {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Search className="size-4" aria-hidden />}{t("Search")}</Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>{t("Try:")}</span>
          {["device that detects crop disease early", "herbal formulation using turmeric and neem for skin inflammation"].map(q => <button key={q} onClick={() => setQuery(q)} className="rounded-md border border-border bg-accent/40 px-2 py-1 transition-colors hover:border-saffron/40 hover:text-foreground">
              {q}
            </button>)}
        </div>

        <Separator className="my-5" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Eyebrow>{t("Jurisdiction")}</Eyebrow>
            <Select value={scope} onValueChange={setScope}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="India">{t("India")}</SelectItem>
                <SelectItem value="International">{t("International")}</SelectItem>
                <SelectItem value="Both">{t("Both")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Eyebrow>{t("Search type")}</Eyebrow>
            <div className="mt-1.5 inline-flex rounded-md border border-border bg-background/50 p-1">
              {searchTypes.map(st => {
              return <button key={st} onClick={() => setType(st)} className={st === type ? "rounded px-3 py-1.5 text-xs font-semibold bg-saffron text-saffron-foreground" : "rounded px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"}>
                  {t(st)}
                </button>;
            })}
            </div>
          </div>
          <div>
            <Eyebrow>{t("Plant")}</Eyebrow>
            <Select value={plant} onValueChange={setPlant}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">{t("All plants")}</SelectItem>
                {allPlants.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Eyebrow>{t("Status")}</Eyebrow>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["All", "Granted", "Published", "Examination", "Withdrawn"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-eyebrow">
            <SlidersHorizontal className="size-3.5" aria-hidden />{t("Sources")}</span>
          {sources.map(s => <Label key={s} className="flex items-center gap-2 text-xs font-normal text-muted-foreground">
              <Checkbox checked={activeSources.includes(s)} onCheckedChange={v => setActiveSources(prev => v ? [...prev, s] : prev.filter(x => x !== s))} />
              {s}
            </Label>)}
        </div>
      </Panel>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_20rem]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl text-foreground">
              {loading ? t("Retrieving records…") : `${results.length} intelligence cards`}
            </h2>
            <span className="text-xs text-muted-foreground">
              {type}{t("retrieval ·")}{scope} · sorted by conceptual similarity
            </span>
          </div>

          {loading ? <div className="space-y-4">
              {[0, 1, 2].map(i => <Skeleton key={i} className="h-56 w-full rounded-xl" />)}
            </div> : !ran ? <EmptyState title={t("Start your search")} body={t("Enter a concept or formulation above to find relevant patents and prior art.")} /> : results.length === 0 ? <EmptyState title={t("No records match these filters")} body={t("Widen the jurisdiction, clear the plant filter, or try a hybrid search to recover borderline matches.")} action={<Button variant="ink" size="sm" onClick={() => {
          setScope("Both");
          setPlant("All");
          setStatus("All");
        }}>{t("Reset filters")}</Button>} /> : ran ? results.map(r => <ResultCard key={r.id} record={r} />) : null}
        </div>

        <aside className="space-y-5">
          <Panel className="p-5">
            <Eyebrow>{t("Reading similarity")}</Eyebrow>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("A score such as")}<span className="font-mono text-foreground">91%</span>{t("describes how\n              closely a record matches your described concept in retrieval space. It is not a measure\n              of infringement, validity or grant probability.")}</p>
          </Panel>
          <Panel className="p-5">
            <Eyebrow>{t("Filters applied")}</Eyebrow>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li>{t("Jurisdiction ·")}{scope}</li>
              <li>{t("Plant ·")}{plant}</li>
              <li>{t("Status ·")}{status}</li>
              <li>{t("Sources ·")}{activeSources.length}{t("of")}{sources.length}</li>
              <li>{t("Evidence level · official records preferred")}</li>
            </ul>
          </Panel>
          <Disclaimer>{t("Results are preliminary signals from a reference dataset. Verify every record against the official register before relying on it.")}</Disclaimer>
        </aside>
      </div>
    </div>;
}