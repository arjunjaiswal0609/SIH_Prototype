import { useTranslation } from "react-i18next";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, Eye, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfidenceMeter, Disclaimer, EvidenceChip, Eyebrow, JurisdictionPill, PageHeader, WorkspaceIdentity, Panel, DataStatusBadge, RiskChip, SourceBadge } from "@/components/ip/primitives";
import { listHistory } from "@/services/historyService";
export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [{
      title: "Reports & History — IP-SAKTI Sahayak"
    }, {
      name: "description",
      content: "Generate an IP intelligence report with sources attached to every finding, and revisit past analyses, searches and cost estimates."
    }, {
      property: "og:title",
      content: "Reports & History — IP-SAKTI Sahayak"
    }, {
      property: "og:description",
      content: "IP intelligence reports with every source attached to its finding."
    }]
  }),
  component: Reports
});
const sections = [{
  title: "Executive Summary",
  body: "Preliminary assessment of protectability and regulatory route for a standardised Ashwagandha stress-support preparation."
}, {
  title: "Product Classification",
  body: "Patent / proprietary Ayurvedic medicine (preliminary, 81% confidence)."
}, {
  title: "Jurisdiction",
  body: "India, with international review for EPO and USPTO designations."
}, {
  title: "IP Types",
  body: "Process patent, composition patent, trade mark, trade secret."
}, {
  title: "Prior-Art Findings",
  body: "Documented classical preparations and one granted Indian claim in the same concept space."
}, {
  title: "TKDL Evidence",
  body: "TKDL/AY/1284 and TKDL/AY/2210 — documented classical preparations."
}, {
  title: "WIPO Evidence",
  body: "WO 2023/154872 — combination claim covering Withania with Bacopa."
}, {
  title: "ABS Findings",
  body: "Wild-collected material with associated traditional knowledge — documentation likely required."
}, {
  title: "International Findings",
  body: "Absolute novelty standard at the EPO increases the weight of documented disclosures."
}, {
  title: "Cost Estimate",
  body: "Official government fees and professional estimates reported separately."
}, {
  title: "Risk Indicators",
  body: "Potential prior-art signal; ABS documentation gap; claim-scope uncertainty."
}, {
  title: "Recommended Next Steps",
  body: "Full prior-art trace, ABS documentation review, human IP review before filing."
}, {
  title: "Confidence",
  body: "88% overall, based on retrieval strength and source agreement."
}, {
  title: "Limitations",
  body: "Reference data; similarity is a retrieval score; no legal conclusion is offered."
}, {
  title: "Sources",
  body: "TKDL, IP India, WIPO, Patents Act 1970, National Biodiversity Authority."
}];
function Reports() {
  const {
    t
  } = useTranslation();
  const [preview, setPreview] = useState(true);
  return <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 workspace-page workspace-page-reports">
      <WorkspaceIdentity index="10" code="RP-10" label={t("INTELLIGENCE DOSSIER")} title={t("Package findings into a decision-ready report")} signal="Package findings into a decision-ready report · REPORT / EXPORT" metric="REPORT / EXPORT" />

      <PageHeader eyebrow={t("Workspace")} title={t("Reports & history")} subtitle={t("Generate an IP intelligence report where every source stays attached to the finding it supports, and revisit earlier work.")} i18nPrefix="pg.reports" actions={<>
            <Button variant="saffron" size="sm" onClick={() => setPreview(true)}>
              <Eye className="size-3.5" aria-hidden />{t("Preview")}</Button>
            <Button variant="ink" size="sm" onClick={() => toast("PDF export is not connected to a document service in this build.")}>
              <Download className="size-3.5" aria-hidden />{t("Download PDF")}</Button>
            <Button variant="ghost" size="sm" onClick={() => toast("Share links are not connected to a sharing service in this build.")}>
              <Share2 className="size-3.5" aria-hidden />{t("Share")}</Button>
            {/* <DataStatusBadge /> */}
          </>} />

      <Tabs defaultValue="generate" className="mt-8">
        <TabsList>
          <TabsTrigger value="generate">{t("Generate report")}</TabsTrigger>
          <TabsTrigger value="history">{t("Recent activity")}</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <Panel className="p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Eyebrow className="mr-auto">{t("Generate IP Intelligence Report")}</Eyebrow>
              <JurisdictionPill jurisdiction="India" />
              <RiskChip level="risk" />
            </div>
            {preview ? <div className="mt-5 divide-y divide-border">
                {sections.map((s, i) => {
              return <div key={s.title} className="py-4">
                    <p className="font-mono text-[0.65rem] text-saffron">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 font-display text-base text-foreground">{t(s.title)}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(s.body)}</p>
                    {["Prior-Art Findings", "TKDL Evidence", "WIPO Evidence", "ABS Findings", "Sources"].includes(s.title) ? <div className="mt-2 flex flex-wrap gap-2">
                        <SourceBadge id={s.title === "WIPO Evidence" ? "wipo" : s.title === "ABS Findings" ? "nba" : "tkdl"} />
                        <SourceBadge id="ipindia" />
                      </div> : null}
                  </div>;
            })}
              </div> : null}
          </Panel>

          <div className="space-y-6">
            <Panel className="p-6">
              <Eyebrow>{t("Report confidence")}</Eyebrow>
              <div className="mt-4 space-y-5">
                <ConfidenceMeter value={88} />
                <ConfidenceMeter value={94} label={t("Source agreement")} />
                <ConfidenceMeter value={71} label={t("Jurisdiction coverage")} />
              </div>
              <Separator className="my-5" />
              <div className="flex flex-wrap gap-2">
                <EvidenceChip>{t("15 sections")}</EvidenceChip>
                <EvidenceChip>{t("5 official sources")}</EvidenceChip>
                <EvidenceChip>{t("Preliminary assessment")}</EvidenceChip>
              </div>
            </Panel>
            <Disclaimer>{t("Reports summarise retrieved evidence. They are not legal opinions, freedom-to-operate clearances or regulatory approvals.")}</Disclaimer>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Panel className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("Item")}</TableHead>
                  <TableHead>{t("Type")}</TableHead>
                  <TableHead>{t("Date")}</TableHead>
                  <TableHead>{t("Jurisdiction")}</TableHead>
                  <TableHead className="text-right">{t("Confidence")}</TableHead>
                  <TableHead>{t("Status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listHistory().map(h => <TableRow key={h.id}>
                    <TableCell className="max-w-md text-foreground">{h.title}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{h.kind}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{h.date}</TableCell>
                    <TableCell>
                      <JurisdictionPill jurisdiction={h.jurisdiction} />
                    </TableCell>
                    <TableCell className="text-right font-mono text-foreground">{h.confidence}%</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{h.status}</TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </Panel>
        </TabsContent>
      </Tabs>
    </div>;
}