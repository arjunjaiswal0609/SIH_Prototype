import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Bot, Calculator, CheckCircle2, Command as CommandIcon, FileText, FlaskConical, Globe2, Home, Languages, Leaf, LifeBuoy, Menu, Network, ScanSearch, Search, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { JurisdictionSwitch, languages, useI18n, useJurisdiction } from "@/components/ip/jurisdiction";
import { DISCLAIMER } from "@/services/disclaimerService";
export const navItems = [{
  to: "/",
  label: "Home",
  key: "nav.home",
  icon: Home
}, {
  to: "/assistant",
  label: "AI Assistant",
  key: "nav.assistant",
  icon: Bot
}, {
  to: "/patents",
  label: "Patent Intelligence",
  key: "nav.patents",
  icon: ScanSearch
}, {
  to: "/prior-art",
  label: "Prior Art",
  key: "nav.priorArt",
  icon: Network
}, {
  to: "/formulation",
  label: "Formulation",
  key: "nav.formulation",
  icon: FlaskConical
}, {
  to: "/abs",
  label: "ABS Check",
  key: "nav.abs",
  icon: ShieldCheck
}, {
  to: "/cost",
  label: "Cost Planner",
  key: "nav.cost",
  icon: Calculator
}, {
  to: "/knowledge",
  label: "Knowledge Explorer",
  key: "nav.knowledge",
  icon: Leaf
}, {
  to: "/international",
  label: "International",
  key: "nav.international",
  icon: Globe2
}, {
  to: "/reports",
  label: "Reports",
  key: "nav.reports",
  icon: FileText
}, {
  to: "/expert",
  label: "Expert Help",
  key: "nav.expert",
  icon: LifeBuoy
}] as const;
const navGroups = [{
  label: "Research",
  key: "shell.groupResearch",
  items: [navItems[1], navItems[2], navItems[3]]
}, {
  label: "Formulation & Compliance",
  key: "shell.groupCompliance",
  items: [navItems[4], navItems[5], navItems[6]]
}, {
  label: "Knowledge & Evidence",
  key: "shell.groupKnowledge",
  items: [navItems[7]]
}, {
  label: "Global IP",
  key: "shell.groupGlobal",
  items: [navItems[8]]
}, {
  label: "Reports & Support",
  key: "shell.groupSupport",
  items: [navItems[9], navItems[10]]
}] as const;
const mobileNav = [{
  to: "/",
  label: "Home",
  key: "nav.home",
  icon: Home
}, {
  to: "/assistant",
  label: "Assistant",
  key: "nav.assistant",
  icon: Bot
}, {
  to: "/patents",
  label: "Patents",
  key: "nav.patents",
  icon: ScanSearch
}, {
  to: "/reports",
  label: "Reports",
  key: "nav.reports",
  icon: FileText
}] as const;
function Wordmark() {
  const {
    t
  } = useTranslation();
  return <Link to="/" className="group flex shrink-0 items-center gap-3" aria-label={t("IP-SAKTI Sahayak home")}>
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl border border-botanical/20 bg-botanical/10 shadow-sm">
        <img src="/logo.png" alt={t("IP-SAKTI Sahayak")} className="size-full object-contain p-1" />
      </span>

      <span className="leading-none">
        <span className="block font-display text-[1.02rem] font-semibold tracking-tight text-foreground">{t("IP-SAKTI")}</span>
        <span className="mt-1 block text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">{t("Sahayak")}</span>
      </span>
    </Link>;
}
export function AppShell({
  children
}: {
  children: React.ReactNode;
}) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    language,
    setLanguage
  } = useJurisdiction();
  const {
    lang,
    t
  } = useI18n();
  const pathname = useRouterState({
    select: s => s.location.pathname
  });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen(open => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => setDrawerOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <div className="flex min-h-screen flex-col">
      <header className="site-header sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-xl">
        <div className="gov-strip"><div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-10"><span>{t("Government of India 🟡 Ayurveda 🟡 Intellectual Property")}</span><span className="gov-strip-right">{t("🟡 Evidence-first research workspace")}</span></div></div>
        <div className="site-header-main mx-auto flex h-[4.7rem] max-w-[1500px] items-center gap-4 px-4 sm:px-6 lg:px-10">
          <Wordmark />

          <nav className="site-nav ml-5 hidden min-w-0 flex-1 items-center gap-1 xl:flex" aria-label={t("Primary")}>
            <Link to="/" className={cn("rounded-lg px-3 py-2 text-[0.76rem] font-semibold transition-colors", pathname === "/" ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
              {t("nav.home")}
            </Link>
            {navGroups.map(group => {
            const active = group.items.some(item => pathname.startsWith(item.to));
            return <DropdownMenu key={group.label}>
                  <DropdownMenuTrigger asChild>
                    <button className={cn("inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[0.76rem] font-semibold transition-colors", active ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                      {t(group.key)}
                      <span aria-hidden className="text-[0.65rem] opacity-60">⌄</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 p-1.5">
                    <DropdownMenuLabel className="px-2 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                      {t(group.key)}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {group.items.map(item => {
                  return <DropdownMenuItem key={item.to} asChild>
                        <Link to={item.to} className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2.5">
                          <item.icon className="size-4 text-botanical" aria-hidden />
                          <span>{t(item.key)}</span>
                        </Link>
                      </DropdownMenuItem>;
                })}
                  </DropdownMenuContent>
                </DropdownMenu>;
          })}
          </nav>

          <div className="header-actions ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Button variant="outline" size="sm" onClick={() => setPaletteOpen(true)} className="hidden h-9 gap-2 border-border bg-card px-3 text-muted-foreground shadow-none md:inline-flex lg:min-w-48 lg:justify-start">
              <Search className="size-3.5" aria-hidden />
              <span className="hidden text-xs lg:inline">{t("shell.search")}</span>
              <kbd className="ml-auto hidden rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.58rem] text-muted-foreground lg:inline">{t("⌘K")}</kbd>
            </Button>

            <JurisdictionSwitch size="sm" className="hidden sm:inline-flex" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label={t("Language")}>
                  <Languages className="size-4" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs">{t("shell.interfaceLanguage")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map(l => <DropdownMenuItem key={l} onSelect={() => setLanguage(l)}>
                    {l}
                    {l === language ? <CheckCircle2 className="ml-auto size-3.5 text-primary" /> : null}
                  </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t("Source status")} className="relative text-muted-foreground">
                  <Bell className="size-4" aria-hidden />
                  <span className="absolute right-2 top-2 size-1.5 rounded-full bg-botanical" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80">
                <p className="text-eyebrow">{t("Source status")}</p>
                <ul className="mt-3 space-y-3 text-xs">
                  <li className="flex items-center justify-between gap-3">
                    <span className="text-foreground">{t("TKDL reference set")}</span>
                    <span className="font-medium text-verified">{t("verified 28 Aug 2026")}</span>
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <span className="text-foreground">{t("IP India fee schedule")}</span>
                    <span className="font-medium text-verified">{t("verified 02 Sep 2026")}</span>
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <span className="text-foreground">{t("Espacenet index")}</span>
                    <span className="font-medium text-review">{t("re-verification due")}</span>
                  </li>
                </ul>
                <Link to="/sources" className="mt-4 inline-block text-xs font-semibold text-primary hover:underline">{t("Open source registry →")}</Link>
              </PopoverContent>
            </Popover>

            {/* <Tooltip>
              <TooltipTrigger asChild>
                <button className="hidden size-9 place-items-center rounded-full border border-border bg-card font-mono text-[0.68rem] font-semibold text-foreground shadow-sm sm:grid">
                  KJ
                </button>
              </TooltipTrigger>
              <TooltipContent>Workspace account</TooltipContent>
             </Tooltip> */}

            <Button variant="ghost" size="icon" className="xl:hidden" aria-label={t("Open navigation")} onClick={() => setDrawerOpen(open => !open)}>
              {drawerOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>

        {drawerOpen ? <div className="mobile-drawer border-t border-border bg-card px-4 pb-5 pt-4 shadow-lg xl:hidden">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row">
              <JurisdictionSwitch className="w-full sm:w-auto" />
              <Button variant="outline" className="w-full gap-2 sm:w-auto" onClick={() => setPaletteOpen(true)}>
                <CommandIcon className="size-4" aria-hidden /> {t("shell.search")}
              </Button>
            </div>
            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label={t("All sections")}>
              {navItems.map(item => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return <Link key={item.to} to={item.to} className={cn("flex items-center gap-2.5 rounded-xl border px-3 py-3 text-sm font-medium transition-colors", active ? "border-primary/20 bg-secondary text-primary" : "border-border bg-background text-foreground hover:bg-muted")}>
                    <item.icon className="size-4" aria-hidden />
                    {t(item.key)}
                  </Link>;
          })}
            </nav>
          </div> : null}
      </header>

      <main className="flex-1 pb-24 xl:pb-0">{children}</main>

      <footer className="site-footer border-t border-border bg-card">
        <div className="mx-auto max-w-[1480px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <div className="max-w-sm">
              <Wordmark />
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t("Evidence-first decision support for Ayurvedic medicinal plants, formulations, traditional knowledge and intellectual-property research.")}</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              <FooterCol title={t("Research")} links={[{
              to: "/assistant",
              label: t("AI Assistant")
            }, {
              to: "/patents",
              label: t("Patent Intelligence")
            }, {
              to: "/prior-art",
              label: t("Prior Art")
            }, {
              to: "/knowledge",
              label: t("Knowledge Explorer")
            }]} />
              <FooterCol title={t("Compliance")} links={[{
              to: "/formulation",
              label: t("Formulation")
            }, {
              to: "/abs",
              label: t("ABS Check")
            }, {
              to: "/international",
              label: t("International IP")
            }, {
              to: "/cost",
              label: t("Cost Planner")
            }]} />
              <FooterCol title={t("Governance")} links={[{
              to: "/sources",
              label: t("Source registry")
            }, {
              to: "/reports",
              label: t("Reports & history")
            }, {
              to: "/expert",
              label: t("Human review")
            }]} />
            </div>
          </div>
        </div>
      </footer>

      <nav aria-label={t("Quick navigation")} className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl xl:hidden">
        <ul className="mx-auto flex max-w-md items-stretch">
          {mobileNav.map(item => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return <li key={item.to} className="flex-1">
                <Link to={item.to} className={cn("flex flex-col items-center gap-1 py-2.5 text-[0.62rem] font-medium", active ? "text-primary" : "text-muted-foreground")}>
                  <item.icon className="size-5" aria-hidden />
                  {t(item.key)}
                </Link>
              </li>;
        })}
          <li className="flex-1">
            <button onClick={() => setPaletteOpen(true)} className="flex w-full flex-col items-center gap-1 py-2.5 text-[0.62rem] font-medium text-muted-foreground">
              <CommandIcon className="size-5" aria-hidden />{t("Search")}</button>
          </li>
        </ul>
      </nav>

      <CommandDialog open={paletteOpen} onOpenChange={setPaletteOpen}>
        <CommandInput placeholder={t("shell.search")} />
        <CommandList>
          <CommandEmpty>{t("No matching workspace or reference.")}</CommandEmpty>
          <CommandGroup heading={t("shell.colWorkspaces")}>
            {navItems.map(item => {
            return <CommandItem key={item.to} value={item.label} asChild>
                <Link to={item.to} onClick={() => setPaletteOpen(false)}>
                  <item.icon className="size-4" aria-hidden />
                  {t(item.key)}
                </Link>
              </CommandItem>;
          })}
          </CommandGroup>
          <CommandGroup heading={t("shell.colTransparency")}>
            <CommandItem value="Source registry" asChild>
              <Link to="/sources" onClick={() => setPaletteOpen(false)}>
                <ShieldCheck className="size-4" aria-hidden />{t("Source registry")}</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>;
}
function FooterCol({
  title,
  links
}: {
  title: string;
  links: Array<{
    to: string;
    label: string;
  }>;
}) {
  const {
    t
  } = useTranslation();
  return <div>
      <p className="text-eyebrow">{t(title)}</p>
      <ul className="mt-3 space-y-2 text-xs">
        {links.map(l => <li key={l.to}>
            <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">{t(l.label)}</Link>
          </li>)}
      </ul>
    </div>;
}