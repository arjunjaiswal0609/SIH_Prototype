import { useTranslation } from "react-i18next";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, Send, ShieldCheck, Clock3, FileText, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader, WorkspaceIdentity, Panel, SectionTitle, RiskChip, Disclaimer, DataStatusBadge, EvidenceChip } from "@/components/ip/primitives";
import { DISCLAIMER } from "@/services/disclaimerService";
export const Route = createFileRoute("/expert")({
  head: () => ({
    meta: [{
      title: "Expert Escalation — IP-SAKTI Sahayak"
    }, {
      name: "description",
      content: "Request a human IP professional review for Ayurveda patent, ABS compliance, and regulatory questions that exceed automated guidance."
    }, {
      property: "og:title",
      content: "Expert Escalation — IP-SAKTI Sahayak"
    }, {
      property: "og:description",
      content: "Human review for complex Ayurveda IP questions."
    }]
  }),
  component: ExpertPage
});
const topics = ["Patent strategy & prior-art dispute", "ABS / benefit-sharing compliance", "Formulation classification challenge", "International filing decision", "Freedom-to-operate opinion", "Regulatory submission support"];
const whenToEscalate = [{
  icon: Clock3,
  title: "Time-critical filings",
  body: "An opposition window, examination deadline, or priority date is approaching and automated guidance is not sufficient."
}, {
  icon: FileText,
  title: "Binding decisions",
  body: "You are about to sign a licence, file an application, or export a formulation — anything with legal or financial consequence."
}, {
  icon: ShieldCheck,
  title: "Conflicting signals",
  body: "The evidence graph shows prior-art risk or a jurisdiction profile conflicts with your plans. A professional must weigh in."
}];
function ExpertPage() {
  const {
    t
  } = useTranslation();
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    topic: "",
    context: "",
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/expert/consultation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          organization: formData.org || undefined,
          topic: formData.topic,
          context: formData.context,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request");
      }

      setSent(true);
      toast.success(t("Request captured successfully"), {
        description: t("In production this would route to a vetted IP professional.")
      });
    } catch (error) {
      toast.error(t("Submission failed"), {
        description: t("Please check your connection and try again.")
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-10 workspace-page workspace-page-expert">
      <WorkspaceIdentity index="11" code="EX-11" label={t("EXPERT ESCALATION")} title={t("Know when evidence needs a professional")} signal="Know when evidence needs a professional · REVIEW / ESCALATE" metric="REVIEW / ESCALATE" />

      <PageHeader eyebrow={t("Expert escalation")} title={<>{t("When the evidence ends,")}<span className="text-saffron">{t("a professional begins.")}</span>
          </>} subtitle={t("IP-SAKTI provides information, not legal advice. For binding decisions, escalate to a qualified IP professional — with your analysis context attached.")}
    // actions={<DataStatusBadge />}
    />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
        <Panel className="p-6 sm:p-8">
          <SectionTitle title={t("Request human review")} hint="Secure request" />
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{t("Full name")}</Label>
                <Input id="name" placeholder={t("Dr. A. Researcher")} required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("Work email")}</Label>
                <Input id="email" type="email" placeholder={t("you@institution.in")} required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={isSubmitting} />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="org">{t("Organisation")}</Label>
                <Input id="org" placeholder={t("Institute / company")} value={formData.org} onChange={e => setFormData({...formData, org: e.target.value})} disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label>{t("Topic")}</Label>
                <Select required value={formData.topic} onValueChange={v => setFormData({...formData, topic: v})} disabled={isSubmitting}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select a topic")} />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map(t => <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="context">{t("Describe the situation")}</Label>
              <Textarea id="context" rows={5} placeholder={t("What are you deciding? Which jurisdictions, formulations, or patents are involved? Include any deadlines.")} required value={formData.context} onChange={e => setFormData({...formData, context: e.target.value})} disabled={isSubmitting} />
            </div>
            <div className="space-y-2">
              <Label>{t("Attach analysis context (optional)")}</Label>
              <div className="flex flex-wrap gap-2">
                <EvidenceChip>{t("Assistant session — “Turmeric curcumin novelty”")}</EvidenceChip>
                <EvidenceChip>{t("Evidence graph — 8 nodes")}</EvidenceChip>
                <EvidenceChip>{t("ABS risk assessment — Moderate")}</EvidenceChip>
              </div>
              <p className="text-xs text-muted-foreground">{t("Sharing your in-app analysis lets the professional start from the cited evidence instead of a blank page.")}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" variant="saffron" disabled={isSubmitting}>
                <Send className="size-4" aria-hidden />{isSubmitting ? t("Submitting...") : t("Submit request")}</Button>
              <span className="text-xs text-muted-foreground">{t("Typical response window: 2–3 working days (indicative).")}</span>
            </div>
          </form>
          {sent ? <p className="mt-5 flex items-start gap-2 rounded-lg border border-verified/30 bg-verified/5 p-3 text-sm text-verified">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />{t("Request captured successfully. A production build would notify the\n              expert network and open a tracked case.")}</p> : null}
        </Panel>

        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2">
              <LifeBuoy className="size-5 text-saffron" aria-hidden />
              <h2 className="font-display text-lg text-foreground">{t("When to escalate")}</h2>
            </div>
            <ul className="mt-5 space-y-5">
              {whenToEscalate.map(w => <li key={w.title} className="flex gap-3">
                  <w.icon className="mt-0.5 size-4 shrink-0 text-info" aria-hidden />
                  <div>
                    <p className="text-sm font-medium text-foreground">{w.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{w.body}</p>
                  </div>
                </li>)}
            </ul>
          </Panel>

          <Panel className="p-6">
            <h2 className="font-display text-lg text-foreground">{t("What stays automated")}</h2>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{t("Patent screening, TKDL cross-referencing, fee estimation, and jurisdictional\n              orientation remain automated and citation-grounded. Escalation is additive — it\n              never replaces the transparent evidence layer.")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <RiskChip level="verified" label={t("Automated + cited")} />
              <RiskChip level="review" label={t("Human review for binding steps")} />
            </div>
          </Panel>

          <Disclaimer>{DISCLAIMER}</Disclaimer>
        </div>
      </div>
    </div>;
}