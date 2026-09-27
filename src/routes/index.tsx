import { useTranslation } from "react-i18next";
import { Activity, ArrowRight, ArrowUpRight, Bot, Database, FileCheck2, FlaskConical, Globe2, Leaf, Network, ScanSearch, ShieldCheck, Sparkles, Waypoints } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { JurisdictionSwitch } from "@/components/ip/jurisdiction";
import { Counter, Eyebrow, JurisdictionPill, Panel, RiskChip, SectionTitle, SourceBadge } from "@/components/ip/primitives";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "IP-SAKTI Sahayak — Ayurvedic IP Intelligence"
    }, {
      name: "description",
      content: "Evidence-first intellectual property and regulatory intelligence for Ayurvedic plants, formulations, traditional knowledge and international filing strategy."
    }, {
      property: "og:title",
      content: "IP-SAKTI Sahayak"
    }, {
      property: "og:description",
      content: "Protect Ayurveda. Navigate IP with evidence."
    }]
  }),
  component: Home
});
const features = [{
  to: "/assistant",
  icon: Bot,
  number: "01",
  tag: "AI RESEARCH",
  title: "AI IP Sahayak",
  body: "Ask a question and receive a structured answer with jurisdiction, evidence and source context.",
  accent: "violet"
}, {
  to: "/patents",
  icon: ScanSearch,
  number: "02",
  tag: "DISCOVERY",
  title: "Patent Intelligence",
  body: "Search concepts, claims and jurisdictions without losing the evidence behind each result.",
  accent: "blue"
}, {
  to: "/prior-art",
  icon: Network,
  number: "03",
  tag: "TRACE",
  title: "Prior-Art Trace",
  body: "Connect formulations, ingredients, traditional records and patent claims in one research trail.",
  accent: "purple"
}, {
  to: "/formulation",
  icon: FlaskConical,
  number: "04",
  tag: "FORMULATION",
  title: "Formulation Intelligence",
  body: "Screen the likely product category before investing in a filing or market route.",
  accent: "saffron"
}, {
  to: "/knowledge",
  icon: Leaf,
  number: "05",
  tag: "TRADITIONAL KNOWLEDGE",
  title: "Knowledge Explorer",
  body: "Explore documented Ayurvedic plant knowledge and the records behind traditional-use claims.",
  accent: "green"
}, {
  to: "/international",
  icon: Globe2,
  number: "06",
  tag: "GLOBAL IP",
  title: "International IP",
  body: "Compare selected jurisdictions, disclosure expectations and traditional-knowledge treatment.",
  accent: "cyan"
}];
const stats = [{
  label: "TKDL records",
  to: 2411,
  suffix: "+",
  icon: Database
}, {
  label: "Patent records",
  to: 1860,
  suffix: "",
  icon: ScanSearch
}, {
  label: "Jurisdictions",
  to: 10,
  suffix: "",
  icon: Globe2
}, {
  label: "Official sources",
  to: 9,
  suffix: "",
  icon: ShieldCheck
}];
function EvidenceFlow() {
  const {
    t
  } = useTranslation();
  const nodes = [["01", t("Plant"), t("Withania somnifera")], ["02", t("Knowledge"), t("Traditional record")], ["03", t("Patent"), t("Claim / filing")], ["04", t("Rule"), t("Jurisdiction")], ["05", t("Decision"), t("Evidence brief")]];
  return <div className="evidence-command-card">
      <div className="evidence-card-glow" />
      <div className="relative z-10 flex items-start justify-between gap-5">
        <div>
          <div className="live-label"><span /> {t("LIVE EVIDENCE ARCHITECTURE")}</div>
          <h2 className="mt-3 font-display text-2xl leading-tight text-white sm:text-[2rem]">{t("From biological resource to a defensible research trail.")}</h2>
        </div>
        <div className="evidence-icon"><FileCheck2 /></div>
      </div>

      <div className="evidence-track">
        {nodes.map(([number, label, value], index) => <div className="evidence-node-wrap" key={label}>
            <div className="evidence-node">
              <span className="evidence-number">{number}</span>
              <div className="mt-3 text-sm font-bold text-white">{label}</div>
              <div className="mt-1 text-[0.68rem] leading-snug text-white/60">{value}</div>
            </div>
            {index < nodes.length - 1 ? <div className="evidence-arrow"><ArrowRight /></div> : null}
          </div>)}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5 text-xs text-white/60">
        <span className="evidence-status"><ShieldCheck /> {t("Source-linked")}</span>
        <span>{t("Jurisdiction aware")}</span>
        <span>{t("Verification state retained")}</span>
      </div>
    </div>;
}
function IntelligencePreview() {
  const {
    t
  } = useTranslation();
  return <div className="intelligence-card">
      <div className="intelligence-topline">
        <div className="live-label light"><span /> {t("ILLUSTRATIVE ASSESSMENT")}</div>
        <JurisdictionPill jurisdiction="India" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{t("FORMULATION SIGNAL")}</p>
          <h3 className="mt-2 font-display text-2xl leading-tight text-slate-950">{t("Withania somnifera")}</h3>
          <p className="mt-1 text-sm font-semibold text-emerald-900">{t("Stress-support formulation")}</p>
        </div>
        <div className="score-orb"><span>4</span><small>{t("sources")}</small></div>
      </div>
      <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">{t("Documented traditional records and an overlapping granted claim are visible in the current reference set. This is a research signal, not a legal conclusion.")}</p>
      <div className="mt-5 flex flex-wrap gap-2"><RiskChip level="risk" /><RiskChip level="verified" label={t("Evidence linked")} /></div>
      <div className="mt-5 flex flex-wrap gap-2"><SourceBadge id="tkdl" /><SourceBadge id="ipindia" /><SourceBadge id="wipo" /></div>
      <Link to="/prior-art" search={{
      query: ""
    }} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950">{t("Inspect evidence trail")} <ArrowUpRight className="size-4" /></Link>
    </div>;
}
function Home() {
  const {
    t
  } = useTranslation();
  return <div className="home-command-center">
      <section className="hero-command">
        <div className="hero-orb orb-green" />
        <div className="hero-orb orb-saffron" />
        <div className="hero-grid" />
        <div className="mx-auto grid max-w-[1500px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:py-14">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="hero-kicker"><span className="hero-kicker-dot" /> {t("INDIA'S AYURVEDA + IP INTELLIGENCE WORKSPACE")} </div>
            <h1 className="hero-title">{t("Protect Ayurveda.")}<br /><span>{t("Navigate IP with evidence.")}</span></h1>
            <p className="hero-copy">{t("A structured intelligence workspace for medicinal plants, formulations, traditional knowledge, patents, prior art, ABS and international IP — with the evidence trail kept visible.")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="saffron" className="hero-primary-cta"><Link to="/assistant"><Sparkles className="size-4" /> {t("Start an IP analysis")} <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline" className="hero-secondary-cta"><Link to="/patents"><ScanSearch /> {t("Explore patent intelligence")}</Link></Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3"><span className="text-xs font-bold uppercase tracking-wider text-slate-500">{t("Answering for")}</span><JurisdictionSwitch size="sm" /></div>
            <div className="hero-stat-grid">
              {stats.map(({
              label,
              to,
              suffix,
              icon: Icon
            }) => <div className="hero-stat" key={label}>
                  <div className="hero-stat-icon"><Icon /></div>
                  <Counter to={to} suffix={suffix} className="hero-stat-value" />
                  <span>{t(label)}</span>
                </div>)}
            </div>
          </div>
          <div className="relative z-10 flex flex-col justify-center gap-4 lg:pl-3">
            <EvidenceFlow />
            <IntelligencePreview />
          </div>
        </div>
      </section>

      <section className="signal-strip">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3"><div className="signal-pulse"><Activity /></div><div><p className="text-xs font-black uppercase tracking-[0.16em] text-slate-900">{t("Evidence-first intelligence")}</p><p className="text-xs text-slate-500">{t("Source · jurisdiction · date · verification state stay visible.")}</p></div></div>
          <Link to="/sources" className="signal-link">{t("View source registry")} <ArrowRight /></Link>
        </div>
      </section>

      <section className="workspace-section">
        <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <div className="workspace-heading">
            <div><div className="section-kicker">{t("THE IP-SAKTI WORKSPACE")}</div><h2 className="workspace-title">{t("Six research paths.")}<br /><span>{t("One evidence system.")}</span></h2></div>
            <p className="workspace-description">{t("Move from an idea to a research-backed decision without jumping between disconnected tools.")}</p>
          </div>
          <div className="workspace-grid">
            {features.map(feature => <Link key={feature.to} to={feature.to} className={`workspace-card workspace-${feature.accent}`}>
                <div className="workspace-card-top"><span className="workspace-number">{feature.number}</span><span className="workspace-tag">{t(feature.tag)}</span><span className="workspace-arrow"><ArrowUpRight /></span></div>
                <div className="workspace-icon"><feature.icon /></div>
                <h3>{t(feature.title)}</h3>
                <p>{t(feature.body)}</p>
                <span className="workspace-open">{t("Open workspace")} <ArrowRight /></span>
              </Link>)}
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 lg:py-20">
          <div><div className="section-kicker light-kicker">{t("WHY IP-SAKTI")}</div><h2 className="trust-title">{t("Evidence is not a footnote.")}<br /><span>{t("It is the product.")}</span></h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/65">{t("The platform is designed to keep research traceable: what was found, where it applies, which source supports it and when that source was verified.")}</p><Button asChild variant="ink" className="mt-7 border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"><Link to="/sources">{t("Explore the evidence layer")}<ArrowRight /></Link></Button></div>
          <div className="trust-cards">
            <div className="trust-card"><span>01</span><Waypoints /><div><h3>{t("Source-linked findings")}</h3><p>{t("Every meaningful conclusion can point back to its reference set.")}</p></div></div>
            <div className="trust-card"><span>02</span><Globe2 /><div><h3>{t("Jurisdiction-aware by design")}</h3><p>{t("India and international requirements remain clearly separated.")}</p></div></div>
            <div className="trust-card"><span>03</span><ShieldCheck /><div><h3>{t("Human escalation built in")}</h3><p>{t("Uncertain cases can move from automated analysis to expert review.")}</p></div></div>
          </div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="closing-pattern" />
        <div className="relative mx-auto max-w-[1500px] px-4 py-14 text-center sm:px-6 lg:px-10 lg:py-18">
          <div className="section-kicker justify-center">{t("START WITH A QUESTION")}</div>
          <h2 className="closing-title">{t("Leave with a research trail.")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">{t("Ask about a formulation, traditional knowledge record, patent, prior art or international IP route.")}</p>
          <Button asChild size="lg" variant="saffron" className="mt-7"><Link to="/assistant"><Sparkles />{t("Start an IP analysis")}<ArrowRight /></Link></Button>
        </div>
      </section>
    </div>;
}