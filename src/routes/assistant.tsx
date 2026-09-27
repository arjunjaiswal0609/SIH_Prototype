import { useTranslation } from "react-i18next";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileUp, ImageUp, Loader2, Mic, SendHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { AnalysisChip, ConfidenceMeter, Disclaimer, Eyebrow, EmptyState, JurisdictionPill, Panel, PageHeader, WorkspaceIdentity, DataStatusBadge, RiskChip, SourceBadge, StatTile } from "@/components/ip/primitives";
import { JurisdictionSwitch, useJurisdiction } from "@/components/ip/jurisdiction";
import { getPatentRecords } from "@/services/patentService";
import { setPriorArtCache } from "@/services/priorArtService";
import { ChatResponse, ChatRequest } from "@/types/api";
export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [{
      title: "AI Assistant — IP-SAKTI Sahayak"
    }, {
      name: "description",
      content: "Describe an Ayurvedic formulation and receive a citation-grounded preliminary IP and regulatory assessment with confidence, evidence and limitations."
    }, {
      property: "og:title",
      content: "AI Assistant — IP-SAKTI Sahayak"
    }, {
      property: "og:description",
      content: "Citation-grounded preliminary IP assessment for Ayurvedic formulations."
    }]
  }),
  component: Assistant
});
const stages = ["Intent", "Product classification", "Jurisdiction", "IP type", "Evidence retrieval", "Analysis"];
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const EXAMPLE = "I developed an Ashwagandha-based formulation for stress management. Can I protect it in India and Europe?";
function Assistant() {
  const {
    t,
    i18n
  } = useTranslation();
  const {
    jurisdiction
  } = useJurisdiction();
  const [input, setInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [stage, setStage] = useState(-1);
  const [data, setData] = useState<ChatResponse | null>(null);
  const run = async () => {
    if (!input.trim()) {
      toast.error("Describe your product or IP concern to begin.");
      return;
    }
    setPhase("running");
    setStage(0);
    const currentQuery = input;
    setSubmittedQuery(currentQuery);

    // Animate stages while fetching
    let i = 0;
    const intervalId = window.setInterval(() => {
      i += 1;
      if (i < stages.length) {
        setStage(i);
      } else {
        window.clearInterval(intervalId);
      }
    }, 520);
    try {
      const reqBody: ChatRequest = {
        query: input,
        jurisdiction,
        language: i18n.language || "en"
      };
      const res = await fetch(`${API_BASE_URL}/api/v1/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
      });
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const json = await res.json();
      
      if (json.prior_art_graph) {
        setPriorArtCache(currentQuery, json.prior_art_graph);
      }
      
      setData(json);
      setStage(stages.length);
      setPhase("done");
    } catch (err) {
      console.error(err);
      toast.error("Analysis failed. Please check backend connection.");
      setPhase("idle");
      setStage(-1);
    } finally {
      window.clearInterval(intervalId);
    }
  };
  return <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 workspace-page workspace-page-assistant">
      <WorkspaceIdentity index="01" code="AI-01" label={t("AI RESEARCH COMMAND")} title={t("Ask → analyse → evidence")} signal="Ask → analyse → evidence · AI / EVIDENCE" metric="AI / EVIDENCE" />

      <PageHeader eyebrow={t("AI workspace")} title={t("Ask about protection, classification or compliance")} subtitle={t("Answers are assembled from official records and always carry jurisdiction, evidence and limitations. Information, not legal advice.")} i18nPrefix="pg.assistant" actions={<>
            <JurisdictionSwitch size="sm" />
            {/* <DataStatusBadge /> */}
          </>} />

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <div className="space-y-6">
          <Panel className="p-5">
            <Eyebrow>{t("Your question")}</Eyebrow>
            <Textarea value={input} onChange={e => setInput(e.target.value)} rows={5} placeholder={t("Describe your Ayurvedic product, formulation or IP concern...")} className="mt-3 resize-none border-border bg-background/60 text-sm leading-relaxed" />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button variant="ink" size="sm" onClick={() => setInput(EXAMPLE)}>
                <Sparkles className="size-3.5" aria-hidden />{t("Use example")}</Button>
              <Button variant="ghost" size="sm" onClick={() => toast("Voice capture is not connected in this build.")}>
                <Mic className="size-3.5" aria-hidden />{t("Voice")}</Button>
              <Button variant="ghost" size="sm" onClick={() => toast("Document upload is not connected in this build.")}>
                <FileUp className="size-3.5" aria-hidden />{t("Document")}</Button>
              <Button variant="ghost" size="sm" onClick={() => toast("Image upload is not connected in this build.")}>
                <ImageUp className="size-3.5" aria-hidden />{t("Image")}</Button>
              <Button variant="saffron" size="sm" className="ml-auto" onClick={run} disabled={phase === "running"}>
                {phase === "running" ? <Loader2 className="size-3.5 animate-spin" aria-hidden /> : <SendHorizontal className="size-3.5" aria-hidden />}{t("Analyse")}</Button>
            </div>
          </Panel>

          {phase !== "idle" ? <Panel className="p-5">
              <Eyebrow>{t("Processing route")}</Eyebrow>
              <ol className="mt-4 grid gap-2 sm:grid-cols-3">
                {stages.map((s, i) => {
              const state = stage > i ? "done" : stage === i ? "active" : "pending";
              return <li key={s} className={state === "done" ? "rounded-md border border-verified/40 bg-verified/10 px-3 py-2 text-xs text-verified" : state === "active" ? "rounded-md border border-saffron/50 bg-saffron/10 px-3 py-2 text-xs text-saffron" : "rounded-md border border-border bg-background/40 px-3 py-2 text-xs text-muted-foreground"}>
                      {i + 1}. {t(s)}
                    </li>;
            })}
              </ol>
              <p className="mt-3 text-[0.7rem] text-muted-foreground">{t("High-level processing stages only. Internal reasoning is not exposed.")}</p>
            </Panel> : null}

          {phase === "done" ? <Panel className="animate-rise p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Eyebrow className="mr-auto">{t("Executive answer")}</Eyebrow>
                <JurisdictionPill jurisdiction={jurisdiction} />
                <RiskChip level="risk" />
              </div>
              {data?.confidence === 0 && <div className="mt-4 rounded-md border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-600">{t("⚠️ No matching prior-art records or compliance guidelines were found in the database.")}</div>}
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                {data?.executive_answer}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatTile label={t("Confidence")} value={`${data?.confidence ?? 0}%`} note={t("Retrieval + agreement score")} />
                <StatTile label={t("Evidence")} value={`${data?.evidence_count ?? data?.evidence?.length ?? 0} sources`} note={t("All official records")} />
                <StatTile label={t("Jurisdiction")} value={jurisdiction} note={t("Answer sets kept apart")} />
                <StatTile label={t("Status")} value="Prior-art signal" note={t("Preliminary assessment")} />
              </div>

              <Separator className="my-6" />

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <Eyebrow>{t("Applicable IP types")}</Eyebrow>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {data?.applicable_ip_types?.map((type, i) => <AnalysisChip key={i}>{type}</AnalysisChip>)}
                  </div>
                </div>
                <div>
                  <Eyebrow>{t("Key findings")}</Eyebrow>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    {data?.key_findings?.map((finding, i) => <li key={i}>· {finding}</li>)}
                  </ul>
                </div>
              </div>

              <Separator className="my-6" />

              <Eyebrow>{t("Recommended next steps")}</Eyebrow>
              <ol className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {data?.next_steps?.map((step, i) => <li key={i}>{i + 1}. {step}</li>)}
              </ol>

              <Accordion type="multiple" className="mt-6">
                <AccordionItem value="sources">
                  <AccordionTrigger className="text-sm">{t("Sources (4 official records)")}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      <SourceBadge id="tkdl" />
                      <SourceBadge id="ipindia" />
                      <SourceBadge id="wipo" />
                      <SourceBadge id="patentsact" />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="evidence">
                  <AccordionTrigger className="text-sm">{t("Evidence used")}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3">
                      {(data?.evidence || []).map(e => <li key={e.id} className="rounded-lg border border-border bg-background/40 p-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs text-saffron">{e.number}</span>
                            <JurisdictionPill jurisdiction={e.jurisdiction} />
                            <RiskChip level={e.risk} className="ml-auto" />
                          </div>
                          <p className="mt-2 text-xs text-foreground">{e.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{e.whyRelevant}</p>
                        </li>)}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="limits">
                  <AccordionTrigger className="text-sm">{t("Limitations")}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li>{t("· Similarity is a retrieval score, not a legal probability.")}</li>
                      <li>{t("· Documented prior art does not automatically invalidate any patent.")}</li>
                      <li>{t("· Records reflect a reference dataset snapshot and may not be current.")}</li>
                      <li>{t("· Claim scope interpretation requires a qualified professional.")}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="saffron" size="sm">
                  <Link to="/expert">{t("Request human review")}</Link>
                </Button>
                <Button asChild variant="ink" size="sm">
                  <Link to="/prior-art" search={{
                query: submittedQuery
              }}>{t("Open evidence explorer")}<ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/reports">{t("Generate report")}</Link>
                </Button>
              </div>
            </Panel> : null}

          {phase === "idle" ? <EmptyState title={t("No analysis yet")} body={t("Describe a formulation, product or IP concern. The assistant will retrieve official records before offering any assessment.")} action={<Button variant="ink" size="sm" onClick={() => setInput(EXAMPLE)}>{t("Try the example question")}</Button>} /> : null}
        </div>

        <aside className="space-y-6">
          <Panel className="p-5">
            <Eyebrow>{t("Confidence & evidence")}</Eyebrow>
            <div className="mt-4 space-y-5">
              <ConfidenceMeter value={phase === "done" ? data?.confidence ?? 0 : 0} />
              <ConfidenceMeter value={phase === "done" ? data?.source_agreement ?? 0 : 0} label={t("Source agreement")} />
              <ConfidenceMeter value={phase === "done" ? data?.jurisdiction_coverage ?? 0 : 0} label={t("Coverage of jurisdiction")} />
            </div>
          </Panel>

          <Panel className="p-5">
            <Eyebrow>{t("Active source set")}</Eyebrow>
            <div className="mt-3 flex flex-wrap gap-2">
              {jurisdiction === "India" ? <>
                  <SourceBadge id="tkdl" />
                  <SourceBadge id="ipindia" />
                  <SourceBadge id="ayush" />
                  <SourceBadge id="nba" />
                  <SourceBadge id="patentsact" />
                </> : <>
                  <SourceBadge id="wipo" />
                  <SourceBadge id="epo" />
                  <SourceBadge id="uspto" />
                  <SourceBadge id="nagoya" />
                </>}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{t("Indian and international answer sets are never visually merged.")}</p>
          </Panel>

          <Disclaimer>{t("IP-SAKTI Sahayak provides information and preliminary analysis. Human experts are required for legal advice. Never rely on this output as clearance to file, market or export.")}</Disclaimer>
        </aside>
      </div>
    </div>;
}