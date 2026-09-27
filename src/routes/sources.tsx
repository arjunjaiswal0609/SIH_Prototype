import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, RefreshCcw, Database, ShieldCheck } from "lucide-react";
import { PageHeader, WorkspaceIdentity, Panel, SectionTitle, JurisdictionPill, DataStatusBadge, StatTile, Eyebrow } from "@/components/ip/primitives";
import { Badge } from "@/components/ui/badge";
import { listSources } from "@/services/sourceService";
import { DISCLAIMER } from "@/services/disclaimerService";
import { Disclaimer } from "@/components/ip/primitives";
export const Route = createFileRoute("/sources")({
  head: () => ({
    meta: [{
      title: "Source Registry — IP-SAKTI Sahayak"
    }, {
      name: "description",
      content: "Every official source behind IP-SAKTI's answers: TKDL, IP India, WIPO, EPO, USPTO, Ministry of Ayush, NBA, and treaty texts — with verification dates."
    }, {
      property: "og:title",
      content: "Source Registry — IP-SAKTI Sahayak"
    }, {
      property: "og:description",
      content: "Official sources and verification dates behind every answer."
    }]
  }),
  component: SourcesPage
});
function SourcesPage() {
  const {
    t
  } = useTranslation();
  return <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-10 workspace-page workspace-page-sources">
      <WorkspaceIdentity index="09" code="SR-09" label={t("SOURCE REGISTRY")} title={t("Every claim needs a traceable authority")} signal="Every claim needs a traceable authority · VERIFY / CITE" metric="VERIFY / CITE" />

      <PageHeader eyebrow={t("Source transparency")} title={<>{t("Every answer,")}<span className="text-saffron">{t("anchored to an authority.")}</span></>} subtitle={t("IP-SAKTI never answers from model memory alone. Each claim cites an official registry, statute, or treaty body listed here — with its last verification date.")}
    // actions={<DataStatusBadge />}
    />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatTile label={t("Official sources")} value={listSources().length} note={t("Across 3 jurisdiction tiers")} />
        <StatTile label={t("Verification cadence")} value="Weekly" note={t("Fee schedules & registries re-checked")} />
        <StatTile label={t("Citations in answers")} value="100%" note={t("Unsourced statements are flagged")} />
      </div>

      <Panel className="mt-8">
        <div className="flex items-center justify-between border-b border-border p-5 sm:px-6">
          <SectionTitle title={t("Registered sources")} hint={`${listSources().length} authorities`} />
          <Badge variant="outline" className="gap-1.5 border-verified/40 text-verified">
            <RefreshCcw className="size-3" aria-hidden />{t("Synced Sep 2026")}</Badge>
        </div>
        <ul className="divide-y divide-border">
          {listSources().map(s => <li key={s.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:px-6">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <a href={s.url} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-saffron">
                    {s.name}
                    <ExternalLink className="size-3.5 text-muted-foreground transition-colors group-hover:text-saffron" aria-hidden />
                  </a>
                  <JurisdictionPill jurisdiction={s.jurisdiction} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{s.authority}</p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-x-6 gap-y-1 text-xs text-muted-foreground sm:flex-col sm:items-end">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-verified" aria-hidden />{t("Verified")}{s.lastVerified}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Database className="size-3.5" aria-hidden />
                  {s.dataVersion}
                </span>
              </div>
            </li>)}
        </ul>
      </Panel>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel className="p-6">
          <Eyebrow>{t("How verification works")}</Eyebrow>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            <li>{t("Each source is checked against its official publication on a weekly cycle.")}</li>
            <li>{t("Fee schedules and statutory texts are diffed; changes invalidate cached answers.")}</li>
            <li>{t("Answers display the verification date of the oldest source they rely on.")}</li>
            <li>{t("When a source cannot be reached, the interface marks dependent claims")}{" "}
              <span className="text-review">“Review required”</span>{t("instead of guessing.")}</li>
          </ol>
        </Panel>
        <Panel className="p-6">
          <Eyebrow>{t("Coverage boundaries")}</Eyebrow>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("Coverage currently spans India (TKDL, CGPDTM, Ayush, NBA) and the principal\n            international systems (WIPO, EPO, USPTO, Nagoya Protocol). National-phase detail for\n            other jurisdictions is summarised from WIPO aggregates and may lag local amendments.")}</p>
          <div className="mt-5">
            <Disclaimer>{DISCLAIMER}</Disclaimer>
          </div>
        </Panel>
      </div>
    </div>;
}