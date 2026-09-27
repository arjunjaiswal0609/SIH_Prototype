import { useTranslation } from "react-i18next";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ConfidenceMeter, Disclaimer, EvidenceChip, Eyebrow, JurisdictionPill, PageHeader, WorkspaceIdentity, Panel, DataStatusBadge, SourceBadge } from "@/components/ip/primitives";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:10000";
export const Route = createFileRoute("/formulation")({
  head: () => ({
    meta: [{
      title: "Formulation Classification — IP-SAKTI Sahayak"
    }, {
      name: "description",
      content: "A guided wizard that gives a preliminary regulatory classification for an Ayurvedic product, with reasoning, authorities and sources."
    }, {
      property: "og:title",
      content: "Formulation Classification — IP-SAKTI Sahayak"
    }, {
      property: "og:description",
      content: "Preliminary regulatory classification for Ayurvedic formulations."
    }]
  }),
  component: Formulation
});
type Answers = {
  product: string;
  classical: string;
  novelty: string;
  claim: string;
  route: string;
};
const steps = [{
  key: "classical" as const,
  question: "Does the formulation follow a classical text exactly?",
  options: ["Yes — recipe and process follow a classical formulary", "Partly — classical base with modifications", "No — the composition is newly developed"]
}, {
  key: "novelty" as const,
  question: "Does it contain a purified or characterised plant fraction?",
  options: ["No — whole herb or classical extract", "Yes — standardised extract with defined markers", "Yes — purified single-molecule fraction"]
}, {
  key: "claim" as const,
  question: "What is claimed on the label?",
  options: ["Therapeutic indication", "Nutrition or wellness support", "Cosmetic or external appearance benefit"]
}, {
  key: "route" as const,
  question: "How is it consumed or applied?",
  options: ["Oral medicine form", "Food or beverage form", "Topical application"]
}];
function classify(a: Answers, t: (key: string) => string) {
  if (a.claim === "Cosmetic or external appearance benefit" || a.route === "Topical application") {
    if (a.claim === "Cosmetic or external appearance benefit") {
      return {
        label: t("Cosmetic"),
        confidence: 79,
        reasoning: "An appearance-directed claim without a therapeutic indication typically falls under cosmetics regulation rather than the Ayurvedic drug route.",
        route: "Cosmetics licensing route",
        authorities: ["CDSCO", "State licensing authority"],
        ip: ["Trade mark", "Design (packaging)", "Trade secret (process)"]
      };
    }
  }
  if (a.novelty === "Yes — purified single-molecule fraction") {
    return {
      label: t("Phytopharmaceutical"),
      confidence: 84,
      reasoning: "A purified and characterised plant fraction with a therapeutic claim aligns with the phytopharmaceutical drug category and its data requirements.",
      route: "Phytopharmaceutical drug route",
      authorities: ["CDSCO", "Ministry of Ayush"],
      ip: ["Composition patent", "Process patent", "Regulatory data"]
    };
  }
  if (a.claim === "Nutrition or wellness support" || a.route === "Food or beverage form") {
    return {
      label: t("Ayurveda-Aahar / nutraceutical"),
      confidence: 76,
      reasoning: "A nutrition or wellness claim in a food form points to the Ayurveda-Aahar and nutraceutical framework rather than a drug approval route.",
      route: "Food / Ayurveda-Aahar route",
      authorities: ["FSSAI", "Ministry of Ayush"],
      ip: ["Trade mark", "Process patent", "Trade secret"]
    };
  }
  if (a.classical === "Yes — recipe and process follow a classical formulary") {
    return {
      label: t("Classical / generic Ayurvedic medicine"),
      confidence: 88,
      reasoning: "A formulation matching a classical formulary is generally treated as a classical Ayurvedic medicine, with documented traditional knowledge as prior art.",
      route: "Classical Ayurvedic medicine licence",
      authorities: ["Ministry of Ayush", "State licensing authority"],
      ip: ["Trade mark", "Process know-how", "No composition novelty expected"]
    };
  }
  if (a.classical === "Partly — classical base with modifications") {
    return {
      label: t("Patent / proprietary medicine"),
      confidence: 81,
      reasoning: "A classical base with a modified composition and a therapeutic claim commonly falls under patent or proprietary Ayurvedic medicine.",
      route: "Patent / proprietary medicine licence",
      authorities: ["Ministry of Ayush", "State licensing authority"],
      ip: ["Process patent", "Trade mark", "Trade secret"]
    };
  }
  return {
    label: t("New / non-classical drug"),
    confidence: 68,
    reasoning: "A newly developed composition with a therapeutic claim and no classical reference generally requires the new-drug evidence pathway.",
    route: "New drug evaluation route",
    authorities: ["CDSCO", "Ministry of Ayush"],
    ip: ["Composition patent", "Process patent", "Regulatory data"]
  };
}
function Formulation() {
  const {
    t
  } = useTranslation();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    product: "",
    classical: "",
    novelty: "",
    claim: "",
    route: ""
  });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const total = steps.length + 1;
  const current = steps[step - 1];
  const canAdvance = step === 0 ? answers.product.trim().length > 2 : Boolean(current && answers[current.key]);

  const submitClassification = async () => {
    setLoading(true);
    setDone(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/analyze/formulation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers)
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback to local logic if network fails
      setResult(classify(answers, t));
    } finally {
      setLoading(false);
    }
  };
  return <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 workspace-page workspace-page-formulation">
      <WorkspaceIdentity index="04" code="LAB-04" label={t("FORMULATION LAB")} title={t("Classify the product before filing")} signal="Classify the product before filing · CLASSIFY / ROUTE" metric="CLASSIFY / ROUTE" />

      <PageHeader eyebrow={t("Guided wizard")} title={t("What are you developing?")} subtitle={t("Four short questions produce a preliminary regulatory classification with reasoning, authorities and cited sources.")} i18nPrefix="pg.formulation"
    // actions={<DataStatusBadge />}
    />

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Panel className="p-6">
          <div className="flex items-center gap-2">
            {Array.from({
            length: total
          }).map((_, i) => {
            return <span key={i} className={i <= step ? "h-1 flex-1 rounded-full bg-saffron" : "h-1 flex-1 rounded-full bg-muted"} />;
          })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{t("Step")}{Math.min(step + 1, total)}{t("of")}{total}
          </p>

          {!done ? <div className="mt-6">
              {step === 0 ? <div>
                  <h2 className="font-display text-xl text-foreground">{t("Describe the product in one line")}</h2>
                  <Input value={answers.product} onChange={e => setAnswers({
              ...answers,
              product: e.target.value
            })} placeholder={t("Standardised Ashwagandha capsule for stress support")} className="mt-4 h-11 border-border bg-background/60" />
                </div> : current ? <div>
                  <h2 className="font-display text-xl text-foreground">{current.question}</h2>
                  <RadioGroup className="mt-4 space-y-2" value={answers[current.key]} onValueChange={v => setAnswers({
              ...answers,
              [current.key]: v
            })}>
                    {current.options.map(o => <Label key={o} className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background/40 p-3 text-sm font-normal text-muted-foreground transition-colors hover:border-saffron/40 hover:text-foreground has-[[data-state=checked]]:border-saffron/60 has-[[data-state=checked]]:bg-saffron/5 has-[[data-state=checked]]:text-foreground">
                        <RadioGroupItem value={o} className="mt-0.5" />
                        {o}
                      </Label>)}
                  </RadioGroup>
                </div> : null}

              <div className="mt-6 flex items-center justify-between">
                <Button variant="ghost" size="sm" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>
                  <ArrowLeft className="size-3.5" aria-hidden />{t("Back")}</Button>
                <Button variant="saffron" size="sm" disabled={!canAdvance} onClick={() => step === steps.length ? submitClassification() : setStep(s => s + 1)}>
                  {step === steps.length ? t("Classify") : t("Next")}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Button>
              </div>
            </div> : <div className="mt-6">
              <h2 className="font-display text-xl text-foreground">{t("Answers recorded")}</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>· {answers.product}</li>
                <li>· {answers.classical}</li>
                <li>· {answers.novelty}</li>
                <li>· {answers.claim}</li>
                <li>· {answers.route}</li>
              </ul>
              <Button variant="ink" size="sm" className="mt-6" onClick={() => {
            setDone(false);
            setStep(0);
            setAnswers({
              product: "",
              classical: "",
              novelty: "",
              claim: "",
              route: ""
            });
          }}>
                <RotateCcw className="size-3.5" aria-hidden />{t("Start again")}</Button>
            </div>}
        </Panel>

        <div className="space-y-6">
          {done && loading ? (
            <Panel className="p-6">
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-saffron border-t-transparent"></div>
                <p className="mt-4 text-sm font-medium text-foreground">{t("Analyzing formulation guidelines...")}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("This may take a moment.")}</p>
              </div>
            </Panel>
          ) : done && result ? <Panel className="animate-rise p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Eyebrow className="mr-auto">{t("Preliminary classification")}</Eyebrow>
                <JurisdictionPill jurisdiction="India" />
              </div>
              <h2 className="mt-3 font-display text-2xl text-saffron">{result.label}</h2>
              <ConfidenceMeter value={result.confidence} className="mt-5" />

              <Separator className="my-5" />

              <Eyebrow>{t("Reasoning summary")}</Eyebrow>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{result.reasoning}</p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <Eyebrow>{t("Applicable regulatory route")}</Eyebrow>
                  <p className="mt-1.5 text-sm text-foreground">{result.route}</p>
                </div>
                <div>
                  <Eyebrow>{t("Relevant authorities")}</Eyebrow>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {(Array.isArray(result?.authorities) ? result.authorities : []).map(x => <EvidenceChip key={x}>{x}</EvidenceChip>)}
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <Eyebrow>{t("Potential IP implications")}</Eyebrow>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {(Array.isArray(result?.ip) ? result.ip : []).map(x => <EvidenceChip key={x}>{x}</EvidenceChip>)}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <SourceBadge id="ayush" />
                <SourceBadge id="tkdl" />
                <SourceBadge id="patentsact" />
              </div>

              <p className="mt-5 text-xs text-review">{t("Preliminary classification — professional/regulatory verification may be required.")}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button asChild variant="saffron" size="sm">
                  <Link to="/abs">{t("Continue to ABS check")}</Link>
                </Button>
                <Button asChild variant="ink" size="sm">
                  <Link to="/expert">{t("Request human review")}</Link>
                </Button>
              </div>
            </Panel> : <Panel className="p-6">
              <Eyebrow>{t("Possible categories")}</Eyebrow>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {["Classical / generic Ayurvedic medicine", "Patent / proprietary medicine", "New / non-classical drug", "Phytopharmaceutical", "Ayurveda-Aahar / nutraceutical", "Cosmetic", "Uncertain — expert review recommended"].map(c => <li key={c} className="rounded-lg border border-border bg-background/40 px-3 py-2">
                    {c}
                  </li>)}
              </ul>
            </Panel>}

          <Disclaimer>{t("Classification affects both the regulatory route and the intellectual property strategy. This output is a preliminary assessment and does not constitute regulatory clearance.")}</Disclaimer>
        </div>
      </div>
    </div>;
}