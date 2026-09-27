import { useTranslation } from "react-i18next";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import type { Jurisdiction } from "@/data/referenceData";
import { translate, type LangId } from "@/data/i18n";
type Ctx = {
  jurisdiction: Jurisdiction;
  setJurisdiction: (j: Jurisdiction) => void;
  language: string;
  setLanguage: (l: string) => void;
};
const JurisdictionContext = createContext<Ctx | null>(null);
export function JurisdictionProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const {
    t,
    i18n
  } = useTranslation();
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>("India");
  const [language, setLanguageState] = useState("English");
  useEffect(() => {
    const saved = window.localStorage.getItem("ip-sakti-language");
    if (saved === "English" || saved === "हिन्दी" || saved === "मराठी") {
      setLanguageState(saved);
      const langId = saved === "हिन्दी" ? "hi" : saved === "मराठी" ? "mr" : "en";
      i18n.changeLanguage(langId);
    }
  }, [i18n]);
  const setLanguage = (l: string) => {
    setLanguageState(l);
    window.localStorage.setItem("ip-sakti-language", l);
    const langId = l === "हिन्दी" ? "hi" : l === "मराठी" ? "mr" : "en";
    i18n.changeLanguage(langId);
  };
  const value = useMemo(() => ({
    jurisdiction,
    setJurisdiction,
    language,
    setLanguage
  }), [jurisdiction, language]);
  return <JurisdictionContext.Provider value={value}>{children}</JurisdictionContext.Provider>;
}
export function useJurisdiction() {
  const ctx = useContext(JurisdictionContext);
  if (!ctx) throw new Error("useJurisdiction must be used inside JurisdictionProvider");
  return ctx;
}
export const languages = ["English", "हिन्दी", "मराठी"];
export function useI18n() {
  const {
    language
  } = useJurisdiction();
  const lang: LangId = language === "हिन्दी" ? "hi" : language === "मराठी" ? "mr" : "en";
  return {
    lang,
    t: (key: string) => translate(lang, key)
  };
}
export function JurisdictionSwitch({
  size = "md",
  className
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const {
    t
  } = useTranslation();
  const {
    jurisdiction,
    setJurisdiction
  } = useJurisdiction();
  const options: Array<{
    value: Jurisdiction;
    label: string;
    flag: string;
  }> = [{
    value: "India",
    label: t("India"),
    flag: "🇮🇳"
  }, {
    value: "International",
    label: t("International"),
    flag: "🌍"
  }];
  return <div role="tablist" aria-label={t("Jurisdiction")} className={cn("inline-flex items-center gap-1 rounded-lg border border-border bg-surface/80 p-1", className)}>
      {options.map(o => {
      const active = jurisdiction === o.value;
      return <button key={o.value} role="tab" aria-selected={active} onClick={() => setJurisdiction(o.value)} className={cn("inline-flex items-center gap-2 rounded-md font-semibold uppercase tracking-wider transition-all", size === "sm" ? "px-2.5 py-1 text-[0.65rem]" : "px-3.5 py-2 text-xs", active ? "bg-saffron text-saffron-foreground shadow-glow" : "text-muted-foreground hover:bg-accent hover:text-foreground")}>
            <span aria-hidden>{o.flag}</span>
            {o.label}
          </button>;
    })}
    </div>;
}