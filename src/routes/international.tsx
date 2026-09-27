import { useTranslation } from "react-i18next";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Globe2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Disclaimer, Eyebrow, JurisdictionPill, PageHeader, WorkspaceIdentity, Panel, DataStatusBadge } from "@/components/ip/primitives";
import { listCountryProfiles } from "@/services/regulatoryService";
export const Route = createFileRoute("/international")({
  head: () => ({
    meta: [{
      title: "International IP Intelligence — IP-SAKTI Sahayak"
    }, {
      name: "description",
      content: "Jurisdiction-by-jurisdiction view of patent, trade mark, traditional knowledge, ABS and disclosure requirements with official authorities."
    }, {
      property: "og:title",
      content: "International IP Intelligence"
    }, {
      property: "og:description",
      content: "Patent, TK, ABS and disclosure requirements by jurisdiction."
    }]
  }),
  component: International
});
function International() {
  const {
    t
  } = useTranslation();
  const [activeId, setActiveId] = useState("in");
  const profiles = listCountryProfiles();
  const active = profiles.find(c => c.id === activeId) ?? profiles[0];

  // Coordinates are normalized to the actual 1325×672 world-color.svg
  // artwork.  Keeping the marker layer on this same aspect-ratio box prevents
  // labels and routes from drifting vertically away from their countries.
  const markerPositions: Record<string, {
    left: string;
    top: string;
  }> = {
    in: {
      left: "71.6%",
      top: "40%"
    },
    us: {
      left: "21.5%",
      top: "27.4%"
    },
    ep: {
      left: "49.4%",
      top: "19.8%"
    },
    gb: {
      left: "48.5%",
      top: "16.1%"
    },
    cn: {
      left: "75.8%",
      top: "28.3%"
    },
    jp: {
      left: "85.7%",
      top: "34.2%"
    },
    au: {
      left: "85.7%",
      top: "66.2%"
    },
    ca: {
      left: "21.9%",
      top: "14.9%"
    },
    br: {
      left: "34%",
      top: "59.5%"
    },
    ec: {
      left: "29.3%",
      top: "52.2%"
    }
  };
  if (!active) return null;
  return <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8 workspace-page workspace-page-international">
      <WorkspaceIdentity index="06" code="GL-06" label={t("GLOBAL IP ATLAS")} title={t("Move from India to the world")} signal="Move from India to the world · 10 JURISDICTIONS" metric="10 JURISDICTIONS" />

      <PageHeader eyebrow={t("Jurisdiction map")} title={t("International IP intelligence")} subtitle={t("Select a jurisdiction to see its patent and trade mark framework, traditional knowledge treatment, ABS regime and disclosure requirements.")} i18nPrefix="pg.international"
    // actions={<DataStatusBadge />}
    />

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <Panel className="p-5">
          <Eyebrow>{t("Supported jurisdictions")}</Eyebrow>
          <div className="international-map-shell mt-4 overflow-hidden rounded-2xl border border-emerald-200/70 bg-[linear-gradient(135deg,#f7fbf7_0%,#eef7f2_52%,#fff8e8_100%)]">
            <div className="international-map-toolbar">
              <div>
                <div className="international-map-kicker"><Globe2 className="size-3.5" />{t("Global IP coverage")}</div>
                <div className="international-map-title">{t("Select a supported jurisdiction")}</div>
              </div>
              <div className="international-map-count">{profiles.length}{t("profiles")}</div>
            </div>
            <div className="international-map-canvas">
              <div className="international-map-visual">
                <img className="international-world-map-image" src="/world-color.svg" alt={t("Colourful world map showing IP-SAKTI supported jurisdictions")} draggable={false} />
                <svg className="international-map-network" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="ipNetworkGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F4B73A" />
                    <stop offset="55%" stopColor="#54E0BF" />
                    <stop offset="100%" stopColor="#7D8CFF" />
                  </linearGradient>
                  <filter id="ipNetworkGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="0.8" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {Object.entries(markerPositions).filter(([id]) => id !== "in").map(([id, position]) => {
                  const x = Number.parseFloat(position.left);
                  const y = Number.parseFloat(position.top);
                  const indiaX = Number.parseFloat(markerPositions["in"]!.left);
                  const indiaY = Number.parseFloat(markerPositions["in"]!.top);
                  const midX = (x + indiaX) / 2;
                  const midY = Math.min(y, indiaY) - 8;
                  return <path key={id} d={`M ${Number.parseFloat(markerPositions["in"]!.left)} ${Number.parseFloat(markerPositions["in"]!.top)} Q ${midX} ${midY} ${x} ${y}`} pathLength="1" className={`international-map-route ${id === activeId ? "is-active" : ""}`} filter="url(#ipNetworkGlow)" />;
                })}
                </svg>
                <div className="international-map-aurora" aria-hidden="true" />
                <div className="international-map-markers" aria-label={t("Supported jurisdictions")}>
                {profiles.map(profile => {
                  const position = markerPositions[profile.id];
                  if (!position) return null;
                  const isActive = profile.id === activeId;
                  return <button key={profile.id} type="button" className={`international-map-marker ${isActive ? "is-active" : ""}`} style={{
                    left: position.left,
                    top: position.top
                  }} onClick={() => setActiveId(profile.id)} aria-label={`Open ${profile.name} jurisdiction profile`} title={`${profile.flag} ${profile.name}`}>
                      <span className="international-map-marker-pulse" aria-hidden />
                      <span className="international-map-marker-core" aria-hidden />
                      <span className="international-map-marker-label">
                        {profile.flag} {profile.name}
                      </span>
                    </button>;
                })}
                </div>
                <div className="international-map-overlay">
                  <span><span className="map-dot map-dot-supported" />{t("Supported")}</span>
                  <span><span className="map-dot map-dot-active" />{t("Selected")}</span>
                  <span><span className="map-dot map-dot-network" />{t("Network")}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5" />{t("Click a supported jurisdiction marker to open its patent, TK, ABS and disclosure profile.")}</p>
        </Panel>

        <div className="space-y-6">
          <Panel className="animate-rise p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Eyebrow className="mr-auto">{t("Jurisdiction profile")}</Eyebrow>
              <JurisdictionPill jurisdiction={active.name} />
            </div>
            <h2 className="mt-3 font-display text-2xl text-foreground">
              <span aria-hidden className="mr-2">{active.flag}</span>
              {active.name}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">{active.authority}</p>

            <Separator className="my-5" />

            <dl className="space-y-4">
              {[{
              label: t("Patent"),
              value: active.patent
            }, {
              label: t("Trademark"),
              value: active.trademark
            }, {
              label: t("Traditional knowledge"),
              value: active.traditionalKnowledge
            }, {
              label: t("ABS"),
              value: active.abs
            }, {
              label: t("Disclosure requirements"),
              value: active.disclosure
            }].map(row => <div key={row.label}>
                  <dt className="text-eyebrow">{row.label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{row.value}</dd>
                </div>)}
            </dl>

            <Button asChild variant="evidence" size="sm" className="mt-5">
              <a href={active.authorityUrl} target="_blank" rel="noreferrer">{t("Official authority")}<ExternalLink className="size-3.5" aria-hidden />
              </a>
            </Button>
          </Panel>

          <Disclaimer>{t("Frameworks summarised from official sources in a reference dataset. National practice changes; confirm current requirements with the relevant authority or a local professional.")}</Disclaimer>
        </div>
      </div>
    </div>;
}