import { useTranslation } from "react-i18next";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Disclaimer, EvidenceChip, Eyebrow, JurisdictionPill, PageHeader, WorkspaceIdentity, Panel, DataStatusBadge, RiskChip, SourceBadge } from "@/components/ip/primitives";
import { listPlants } from "@/services/plantService";
export const Route = createFileRoute("/abs")({
  head: () => ({
    meta: [{
      title: "Biodiversity & ABS Check — IP-SAKTI Sahayak"
    }, {
      name: "description",
      content: "Assess access and benefit-sharing signals for a biological resource, its origin and any associated traditional knowledge."
    }, {
      property: "og:title",
      content: "Biodiversity & ABS Check — IP-SAKTI Sahayak"
    }, {
      property: "og:description",
      content: "Preliminary ABS status with applicable frameworks and documentation pointers."
    }]
  }),
  component: AbsCheck
});
const sourceOptions = ["Cultivated (contract farming)", "Wild-collected", "Imported", "Unknown"];
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";
const originOptions = ["India", "Nepal", "Sri Lanka", "Brazil", "Ecuador", "Other"];
function AbsCheck() {
  const {
    t
  } = useTranslation();
  const [resource, setResource] = useState("Withania somnifera");
  const [origin, setOrigin] = useState("India");
  const [collection, setCollection] = useState("Wild-collected");
  const [tk, setTk] = useState(true);
  const [commercial, setCommercial] = useState(true);
  const [patent, setPatent] = useState(true);
  const [exportMarket, setExportMarket] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const checkAbs = async () => {
    setLoading(true);
    setSubmitted(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/compliance/abs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource, origin, collection, tk, commercial, patent, exportMarket
        })
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Hardcoded fallback logic is preserved in backend anyway!
    } finally {
      setLoading(false);
    }
  };

  let score = 0;
  if (collection === "Wild-collected") score += 2;
  if (collection === "Unknown") score += 2;
  if (tk) score += 2;
  if (commercial) score += 1;
  if (patent) score += 1;
  if (exportMarket) score += 1;
  const status = collection === "Unknown" ? {
    level: "review" as const,
    label: t("Review required")
  } : score >= 6 ? {
    level: "risk" as const,
    label: t("High — documentation likely required")
  } : score >= 4 ? {
    level: "review" as const,
    label: t("Medium — review required")
  } : {
    level: "verified" as const,
    label: t("Low — limited signals detected")
  };
  const framework = origin === "India" ? ["Biological Diversity Act, 2002", "ABS Regulations, 2014", "Nagoya Protocol"] : ["Nagoya Protocol", "National ABS legislation of the country of origin"];
  const plantMatch = listPlants().find(p => p.botanical.toLowerCase() === resource.trim().toLowerCase());
  return <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 workspace-page workspace-page-abs">
      <WorkspaceIdentity index="07" code="AB-07" label={t("ABS RISK RADAR")} title={t("Check biodiversity obligations early")} signal="Check biodiversity obligations early · RISK / COMPLY" metric="RISK / COMPLY" />

      <PageHeader eyebrow={t("Compliance workflow")} title={t("Biodiversity & ABS Check")} subtitle={t("Access and benefit-sharing signals for the biological resource, its origin and any associated traditional knowledge.")} i18nPrefix="pg.abs"
    // actions={<DataStatusBadge />}
    />

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1.1fr]">
        <Panel className="p-6">
          <Eyebrow>{t("Resource details")}</Eyebrow>
          <div className="mt-4 space-y-5">
            <div>
              <Label className="text-xs text-muted-foreground">{t("Biological resource")}</Label>
              <Input value={resource} onChange={e => setResource(e.target.value)} className="mt-1.5 border-border bg-background/60" placeholder={t("Botanical name, e.g. Withania somnifera")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs text-muted-foreground">{t("Country of origin")}</Label>
                <Select value={origin} onValueChange={setOrigin}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {originOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">{t("Source")}</Label>
                <Select value={collection} onValueChange={setCollection}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {sourceOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {[{
            label: t("Associated traditional knowledge used?"),
            value: tk,
            set: setTk
          }, {
            label: t("Commercial use intended?"),
            value: commercial,
            set: setCommercial
          }, {
            label: t("Patent protection planned?"),
            value: patent,
            set: setPatent
          }, {
            label: t("Export market planned?"),
            value: exportMarket,
            set: setExportMarket
          }].map(row => <div key={row.label} className="flex items-center justify-between gap-4">
                <Label className="text-sm font-normal text-muted-foreground">{row.label}</Label>
                <Switch checked={row.value} onCheckedChange={row.set} />
              </div>)}
          </div>

          <Button variant="saffron" className="mt-6 w-full" onClick={checkAbs} disabled={loading || !resource.trim()}>{t("Run ABS check")}</Button>
        </Panel>

        <div className="space-y-6">
          {submitted ? <Panel className="animate-rise p-6">
          {loading || !result ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="size-8 animate-spin text-saffron" />
              <p className="mt-4 text-sm text-muted-foreground">{t("Analyzing ABS obligations via LLM...")}</p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <Eyebrow className="mr-auto">{t("Risk radar output")}</Eyebrow>
                <JurisdictionPill jurisdiction="India" />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <RiskChip level={result.status.level} />
                <h2 className="font-display text-xl text-foreground">{result.status.label}</h2>
              </div>

              <Separator className="my-5" />

              <Eyebrow>{t("Applicable frameworks")}</Eyebrow>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.framework.map((f: string) => <EvidenceChip key={f}>{f}</EvidenceChip>)}
              </div>

              <div className="mt-5">
                <Eyebrow>{t("Context")}</Eyebrow>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {result.reasoning}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <SourceBadge id="nba" />
              </div>
            </>
          )}
        </Panel> : <Panel className="p-6">
              <Eyebrow>{t("What this check looks at")}</Eyebrow>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>{t("· Whether the resource is wild-collected, cultivated or imported.")}</li>
                <li>{t("· Whether associated traditional knowledge is involved.")}</li>
                <li>{t("· Whether commercial use, patenting or export is planned.")}</li>
                <li>{t("· Which national framework and authority is likely to apply.")}</li>
              </ul>
            </Panel>}

          <Disclaimer>{t("ABS outcomes depend on facts that cannot be verified automatically, including collection records and community consent. No definitive legal clearance is given here.")}</Disclaimer>
        </div>
      </div>
    </div>;
}