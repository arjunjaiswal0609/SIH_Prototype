import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Disclaimer, Eyebrow, PageHeader, WorkspaceIdentity, Panel, DataStatusBadge, StatTile } from "@/components/ip/primitives";
import { useJurisdiction } from "@/components/ip/jurisdiction";
import type { FeeLine } from "@/data/referenceData";
export const Route = createFileRoute("/cost")({
  head: () => ({
    meta: [{
      title: "IP Cost Planner — IP-SAKTI Sahayak"
    }, {
      name: "description",
      content: "Estimate official government fees and professional costs separately for patents, trade marks, designs, PCT and Madrid filings."
    }, {
      property: "og:title",
      content: "IP Cost Planner — IP-SAKTI Sahayak"
    }, {
      property: "og:description",
      content: "Official fees and professional estimates, never combined, with effective dates."
    }]
  }),
  component: CostPlanner
});
const applicantTypes = [{
  label: "Individual",
  factor: 1
}, {
  label: "Startup",
  factor: 1
}, {
  label: "Small Enterprise",
  factor: 1
}, {
  label: "Educational Institution",
  factor: 1
}, {
  label: "Other (large entity)",
  factor: 5
}];
const rights = ["Patent", "Trademark", "Design", "PCT", "Madrid"] as const;
function inr(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
function CostPlanner() {
  const {
    t
  } = useTranslation();
  const { jurisdiction } = useJurisdiction();
  const [right, setRight] = useState<typeof rights[number]>("Patent");
  const [applicant, setApplicant] = useState("Startup");
  const [mode, setMode] = useState("e-filing");
  const [claims, setClaims] = useState(12);
  const [pages, setPages] = useState(38);
  const [earlyPub, setEarlyPub] = useState(true);
  const [examination, setExamination] = useState(true);
  const [country, setCountry] = useState("Germany / EPO");
  const [currency, setCurrency] = useState("EUR");
  const [designations, setDesignations] = useState(3);
  const factor = applicantTypes.find(a => a.label === applicant)?.factor ?? 1;
  const paperUplift = mode === "physical filing" ? 1.1 : 1;
  const indiaLines = useMemo<FeeLine[]>(() => {
    const base = right === "Patent" ? 1600 : right === "Trademark" ? 4500 : 1000;
    const extraClaims = right === "Patent" ? Math.max(0, claims - 10) * 320 : 0;
    const extraPages = right === "Patent" ? Math.max(0, pages - 30) * 160 : 0;
    const lines: FeeLine[] = [{
      label: `${right} application filing fee`,
      category: "Official government fee",
      amount: Math.round(base * factor * paperUplift),
      currency: "INR",
      source: "IP India fee schedule",
      effective: "2024-04-01",
      lastVerified: "2026-09-02"
    }];
    if (extraClaims) {
      lines.push({
        label: `Excess claims (${claims - 10} beyond 10)`,
        category: "Official government fee",
        amount: Math.round(extraClaims * factor),
        currency: "INR",
        source: "IP India fee schedule",
        effective: "2024-04-01",
        lastVerified: "2026-09-02"
      });
    }
    if (extraPages) {
      lines.push({
        label: `Excess specification pages (${pages - 30} beyond 30)`,
        category: "Official government fee",
        amount: Math.round(extraPages * factor),
        currency: "INR",
        source: "IP India fee schedule",
        effective: "2024-04-01",
        lastVerified: "2026-09-02"
      });
    }
    if (earlyPub) {
      lines.push({
        label: t("Request for early publication"),
        category: "Official government fee",
        amount: Math.round(2500 * factor),
        currency: "INR",
        source: "IP India fee schedule",
        effective: "2024-04-01",
        lastVerified: "2026-09-02"
      });
    }
    if (examination) {
      lines.push({
        label: t("Request for examination"),
        category: "Official government fee",
        amount: Math.round(4000 * factor),
        currency: "INR",
        source: "IP India fee schedule",
        effective: "2024-04-01",
        lastVerified: "2026-09-02"
      });
    }
    lines.push({
      label: t("Drafting and filing (professional)"),
      category: "Professional/service estimate",
      amount: right === "Patent" ? 55000 : 12000,
      currency: "INR",
      source: "Market range, reference dataset",
      effective: "2026-07-01",
      lastVerified: "2026-09-05"
    }, {
      label: t("Prosecution and response handling (professional)"),
      category: "Professional/service estimate",
      amount: right === "Patent" ? 35000 : 8000,
      currency: "INR",
      source: "Market range, reference dataset",
      effective: "2026-07-01",
      lastVerified: "2026-09-05"
    });
    return lines;
  }, [right, claims, pages, earlyPub, examination, factor, paperUplift]);
  const internationalLines = useMemo<FeeLine[]>(() => {
    const perDesignation = currency === "EUR" ? 1200 : currency === "USD" ? 1400 : 1300;
    return [{
      label: t("PCT international filing fee"),
      category: "Official government fee",
      amount: currency === "EUR" ? 1330 : 1450,
      currency,
      source: "WIPO PCT fee tables",
      effective: "2026-01-01",
      lastVerified: "2026-09-01"
    }, {
      label: `National / regional phase entry (${designations} designations)`,
      category: "Official government fee",
      amount: perDesignation * designations,
      currency,
      source: `${country} official fee schedule`,
      effective: "2026-01-01",
      lastVerified: "2026-08-30"
    }, {
      label: t("Local agent fees"),
      category: "Professional/service estimate",
      amount: 1800 * designations,
      currency,
      source: "Market range, reference dataset",
      effective: "2026-07-01",
      lastVerified: "2026-09-05"
    }, {
      label: t("Translation of specification"),
      category: "Professional/service estimate",
      amount: Math.round(pages * 28),
      currency,
      source: "Market range, reference dataset",
      effective: "2026-07-01",
      lastVerified: "2026-09-05"
    }];
  }, [country, currency, designations, pages]);
  return <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 workspace-page workspace-page-cost">
      <WorkspaceIdentity index="08" code="EC-08" label={t("FILING ECONOMICS")} title={t("Turn filing strategy into a cost plan")} signal="Turn filing strategy into a cost plan · ₹ / STRATEGY" metric="₹ / STRATEGY" />

      <PageHeader eyebrow={t("Estimator")} title={t("IP Cost Planner")} subtitle={t("Official government fees and professional/service estimates are always shown separately, each with a source and an effective date.")} i18nPrefix="pg.cost"
    // actions={<DataStatusBadge />}
    />

      <div className="mt-8 grid gap-6 xl:grid-cols-[22rem_1fr]">
        <Panel className="p-6">
          <Eyebrow>{t("Right")}</Eyebrow>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {rights.map(r => {
            return <button key={r} onClick={() => setRight(r)} className={r === right ? "rounded-md bg-saffron px-3 py-1.5 text-xs font-semibold text-saffron-foreground" : "rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"}>
                {t(r)}
              </button>;
          })}
          </div>

          <Separator className="my-5" />

          <div className="space-y-5">
            <div>
              <Label className="text-xs text-muted-foreground">{t("Applicant type (India)")}</Label>
              <Select value={applicant} onValueChange={setApplicant}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {applicantTypes.map(a => <SelectItem key={a.label} value={a.label}>{a.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">{t("Filing mode")}</Label>
              <Select value={mode} onValueChange={setMode}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="e-filing">{t("e-filing")}</SelectItem>
                  <SelectItem value="physical filing">{t("physical filing")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">{t("Number of claims ·")}{claims}</Label>
              <Slider className="mt-3" value={[claims]} min={1} max={40} step={1} onValueChange={v => setClaims(v[0] ?? claims)} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">{t("Specification pages ·")}{pages}</Label>
              <Slider className="mt-3" value={[pages]} min={10} max={120} step={1} onValueChange={v => setPages(v[0] ?? pages)} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal text-muted-foreground">{t("Early publication")}</Label>
              <Switch checked={earlyPub} onCheckedChange={setEarlyPub} />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal text-muted-foreground">{t("Request examination")}</Label>
              <Switch checked={examination} onCheckedChange={setExamination} />
            </div>

            {jurisdiction === "International" && (
              <>
                <Separator />
                <div>
                  <Label className="text-xs text-muted-foreground">{t("International country")}</Label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["Germany / EPO", "United States", "Japan", "Australia", "Canada"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">{t("Currency")}</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {["EUR", "USD", "CHF"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">{t("Designations ·")}{designations}</Label>
                  <Slider className="mt-3" value={[designations]} min={1} max={8} step={1} onValueChange={v => setDesignations(v[0] ?? designations)} />
                </div>
              </>
            )}
          </div>
        </Panel>

        <div className="space-y-6">
          {jurisdiction === "India" ? (
            <div className="mt-5 space-y-5">
              <FeeSection lines={indiaLines} currencyLabel="INR" format={inr} />
            </div>
          ) : (
            <div className="mt-5 space-y-5">
              <FeeSection lines={internationalLines} currencyLabel={currency} format={n => `${currency} ${n.toLocaleString("en-IN")}`} />
            </div>
          )}

          <Disclaimer>{t("Fees change. Always verify the current official fee schedule before filing. Government fees and professional estimates are separate figures and must not be added together as a single official cost.")}</Disclaimer>
        </div>
      </div>
    </div>;
}
function FeeSection({
  lines,
  currencyLabel,
  format
}: {
  lines: FeeLine[];
  currencyLabel: string;
  format: (n: number) => string;
}) {
  const {
    t
  } = useTranslation();
  const official = lines.filter(l => l.category === "Official government fee");
  const professional = lines.filter(l => l.category === "Professional/service estimate");
  const sum = (arr: FeeLine[]) => arr.reduce((t, l) => t + l.amount, 0);
  return <>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label={t("Official government fee")} value={format(sum(official))} note={`${official.length} statutory line items`} />
        <StatTile label={t("Professional/service estimate")} value={format(sum(professional))} note={t("Market range, not an official fee")} />
        <StatTile label={t("Estimated total")} value={format(sum(lines))} note={`Shown in ${currencyLabel} · indicative only`} />
      </div>

      {[{
      title: "Official government fees",
      rows: official
    }, {
      title: "Professional/service estimates",
      rows: professional
    }].map(group => {
      return <Panel key={group.title} className="overflow-hidden">
          <div className="border-b border-border px-5 py-3">
            <Eyebrow>{t(group.title)}</Eyebrow>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Item")}</TableHead>
                <TableHead className="text-right">{t("Amount")}</TableHead>
                <TableHead>{t("Source")}</TableHead>
                <TableHead>{t("Effective")}</TableHead>
                <TableHead>{t("Last verified")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group.rows.map(l => <TableRow key={l.label}>
                  <TableCell className="text-foreground">{l.label}</TableCell>
                  <TableCell className="text-right font-mono text-foreground">
                    {format(l.amount)}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{l.source}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{l.effective}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{l.lastVerified}</TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </Panel>;
    })}

      <div className="flex flex-wrap gap-2">
        <Button variant="ink" size="sm">{t("Save estimate")}</Button>
        <Button variant="ghost" size="sm">{t("Export breakdown")}</Button>
      </div>
    </>;
}