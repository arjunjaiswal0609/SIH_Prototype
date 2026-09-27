/**
 * Reference dataset for IP-SAKTI Sahayak.
 *
 * Service boundary: every export here is shaped like an API response so it can
 * later be swapped for FastAPI / Supabase calls without touching the UI.
 * All records are clearly labelled "Reference dataset" in the interface.
 */

export type Jurisdiction = "India" | "International";
export type RiskLevel = "verified" | "review" | "risk" | "info";
export interface SourceRef {
  id: string;
  name: string;
  authority: string;
  jurisdiction: string;
  type: "Traditional knowledge" | "Patent office" | "Treaty body" | "Regulator" | "Law";
  url: string;
  lastVerified: string;
  dataVersion: string;
}
export const sourceRegistry: SourceRef[] = [{
  id: "tkdl",
  name: "Traditional Knowledge Digital Library (TKDL)",
  authority: "CSIR & Ministry of Ayush",
  jurisdiction: "India",
  type: "Traditional knowledge",
  url: "https://www.tkdl.res.in/",
  lastVerified: "2026-08-28",
  dataVersion: "snapshot 2026.08"
}, {
  id: "ipindia",
  name: "Intellectual Property India",
  authority: "Office of the CGPDTM",
  jurisdiction: "India",
  type: "Patent office",
  url: "https://ipindia.gov.in/",
  lastVerified: "2026-09-02",
  dataVersion: "fee schedule 2024 rev."
}, {
  id: "wipo",
  name: "WIPO PATENTSCOPE",
  authority: "World Intellectual Property Organization",
  jurisdiction: "International",
  type: "Treaty body",
  url: "https://patentscope.wipo.int/",
  lastVerified: "2026-09-01",
  dataVersion: "weekly index"
}, {
  id: "epo",
  name: "Espacenet",
  authority: "European Patent Office",
  jurisdiction: "Europe / EPO",
  type: "Patent office",
  url: "https://worldwide.espacenet.com/",
  lastVerified: "2026-08-30",
  dataVersion: "DOCDB 2026.34"
}, {
  id: "uspto",
  name: "Patent Full-Text Search",
  authority: "United States Patent and Trademark Office",
  jurisdiction: "United States",
  type: "Patent office",
  url: "https://ppubs.uspto.gov/",
  lastVerified: "2026-08-27",
  dataVersion: "2026-08 index"
}, {
  id: "ayush",
  name: "Ministry of Ayush",
  authority: "Government of India",
  jurisdiction: "India",
  type: "Regulator",
  url: "https://ayush.gov.in/",
  lastVerified: "2026-08-20",
  dataVersion: "circulars to Aug 2026"
}, {
  id: "nba",
  name: "National Biodiversity Authority",
  authority: "Government of India",
  jurisdiction: "India",
  type: "Regulator",
  url: "https://nbaindia.org/",
  lastVerified: "2026-08-19",
  dataVersion: "ABS guidelines 2014"
}, {
  id: "nagoya",
  name: "Nagoya Protocol on Access and Benefit-sharing",
  authority: "Convention on Biological Diversity",
  jurisdiction: "International",
  type: "Law",
  url: "https://www.cbd.int/abs/",
  lastVerified: "2026-07-30",
  dataVersion: "text as in force"
}, {
  id: "patentsact",
  name: "The Patents Act, 1970 (as amended)",
  authority: "Government of India",
  jurisdiction: "India",
  type: "Law",
  url: "https://ipindia.gov.in/patents.htm",
  lastVerified: "2026-08-12",
  dataVersion: "consolidated text"
}];
export const sourceById = (id: string) => sourceRegistry.find(s => s.id === id);
export interface PatentRecord {
  id: string;
  number: string;
  title: string;
  applicant: string;
  jurisdiction: string;
  jurisdictionGroup: Jurisdiction;
  published: string;
  similarity: number;
  status: "Granted" | "Published" | "Withdrawn" | "Examination" | "Refused";
  risk: RiskLevel;
  whyRelevant: string;
  concepts: string[];
  sources: string[];
  plants: string[];
  family: string;
  indication: string;
  ipType: "Patent" | "PCT application" | "Utility model";
  evidenceLevel: "Official record" | "Secondary index";
}
export const patentRecords: PatentRecord[] = [{
  id: "p1",
  number: "IN 384512",
  title: "Standardised Withania somnifera root extract composition for stress modulation",
  applicant: "Deccan Phyto Research Pvt Ltd",
  jurisdiction: "India",
  jurisdictionGroup: "India",
  published: "2024-03-15",
  similarity: 91,
  status: "Granted",
  risk: "risk",
  whyRelevant: "Claims a withanolide-standardised root extract with an adaptogenic indication that overlaps the described formulation concept.",
  concepts: ["Withanolide standardisation", "Adaptogen", "Root extract", "Stress indication"],
  sources: ["ipindia", "patentsact"],
  plants: ["Ashwagandha"],
  family: "Solanaceae",
  indication: "Stress / anxiety",
  ipType: "Patent",
  evidenceLevel: "Official record"
}, {
  id: "p2",
  number: "WO 2023/154872",
  title: "Synergistic botanical composition comprising Withania and Bacopa for cognitive support",
  applicant: "Nordic Botanicals AS",
  jurisdiction: "PCT / WIPO",
  jurisdictionGroup: "International",
  published: "2023-08-17",
  similarity: 84,
  status: "Published",
  risk: "review",
  whyRelevant: "Combination claim covering Withania with Bacopa monnieri; designation list includes EP, US and IN national phases.",
  concepts: ["Combination claim", "Cognitive support", "PCT designation"],
  sources: ["wipo"],
  plants: ["Ashwagandha", "Brahmi"],
  family: "Solanaceae",
  indication: "Cognition",
  ipType: "PCT application",
  evidenceLevel: "Official record"
}, {
  id: "p3",
  number: "TKDL/AY/1284",
  title: "Ashwagandha churna preparation described in classical Ayurvedic literature",
  applicant: "Prior-art record (no applicant)",
  jurisdiction: "India",
  jurisdictionGroup: "India",
  published: "Classical text reference",
  similarity: 88,
  status: "Published",
  risk: "verified",
  whyRelevant: "Documented classical preparation and indication. Potential prior-art signal for novelty discussions.",
  concepts: ["Classical preparation", "Churna", "Documented traditional use"],
  sources: ["tkdl"],
  plants: ["Ashwagandha"],
  family: "Solanaceae",
  indication: "Rasayana / vitality",
  ipType: "Patent",
  evidenceLevel: "Official record"
}, {
  id: "p4",
  number: "US 11,504,398",
  title: "Curcuminoid-neem composition with enhanced dermal bioavailability",
  applicant: "Meridian Skin Sciences Inc.",
  jurisdiction: "United States",
  jurisdictionGroup: "International",
  published: "2022-11-22",
  similarity: 79,
  status: "Granted",
  risk: "review",
  whyRelevant: "Delivery-system claims around a turmeric–neem pairing for inflammatory skin conditions.",
  concepts: ["Bioavailability enhancer", "Topical delivery", "Curcuminoid"],
  sources: ["uspto"],
  plants: ["Turmeric", "Neem"],
  family: "Zingiberaceae",
  indication: "Skin inflammation",
  ipType: "Patent",
  evidenceLevel: "Official record"
}, {
  id: "p5",
  number: "EP 3 921 044 B1",
  title: "Process for preparing Emblica officinalis polyphenol concentrate",
  applicant: "Helvetia Nutra GmbH",
  jurisdiction: "Europe / EPO",
  jurisdictionGroup: "International",
  published: "2023-02-08",
  similarity: 72,
  status: "Granted",
  risk: "review",
  whyRelevant: "Process claims on an Amla polyphenol concentrate relevant to extraction routes.",
  concepts: ["Process claim", "Polyphenol concentrate", "Extraction"],
  sources: ["epo"],
  plants: ["Amla"],
  family: "Phyllanthaceae",
  indication: "Antioxidant support",
  ipType: "Patent",
  evidenceLevel: "Official record"
}, {
  id: "p6",
  number: "IN 202641008812 A",
  title: "Giloy–Tulsi decoction granule with improved shelf stability",
  applicant: "Sattva Ayur Labs LLP",
  jurisdiction: "India",
  jurisdictionGroup: "India",
  published: "2026-04-03",
  similarity: 68,
  status: "Examination",
  risk: "info",
  whyRelevant: "Formulation-stability claims on a classical decoction converted to granules.",
  concepts: ["Granulation", "Shelf stability", "Kadha"],
  sources: ["ipindia"],
  plants: ["Giloy", "Tulsi"],
  family: "Menispermaceae",
  indication: "Immunity support",
  ipType: "Patent",
  evidenceLevel: "Official record"
}, {
  id: "p7",
  number: "WO 2021/099318",
  title: "Glycyrrhiza glabra extract for mucosal soothing compositions",
  applicant: "Kyoto Herbal Institute",
  jurisdiction: "PCT / WIPO",
  jurisdictionGroup: "International",
  published: "2021-05-27",
  similarity: 64,
  status: "Withdrawn",
  risk: "info",
  whyRelevant: "Withdrawn application; useful as a documented disclosure in the same concept space.",
  concepts: ["Mucosal soothing", "Glycyrrhizin", "Withdrawn disclosure"],
  sources: ["wipo"],
  plants: ["Mulethi"],
  family: "Fabaceae",
  indication: "Throat / mucosa",
  ipType: "PCT application",
  evidenceLevel: "Secondary index"
}, {
  id: "p8",
  number: "TKDL/AY/3390",
  title: "Haridra–Nimba lepa for skin disorders in classical formularies",
  applicant: "Prior-art record (no applicant)",
  jurisdiction: "India",
  jurisdictionGroup: "India",
  published: "Classical text reference",
  similarity: 86,
  status: "Published",
  risk: "verified",
  whyRelevant: "Documented topical preparation combining turmeric and neem for skin conditions.",
  concepts: ["Lepa", "Topical", "Documented traditional use"],
  sources: ["tkdl"],
  plants: ["Turmeric", "Neem"],
  family: "Zingiberaceae",
  indication: "Skin inflammation",
  ipType: "Patent",
  evidenceLevel: "Official record"
}];
export interface PlantRecord {
  id: string;
  common: string;
  botanical: string;
  genus: string;
  family: string;
  parts: string[];
  traditionalUse: string;
  role: string;
  tkdlRecords: number;
  evidenceLevel: "High" | "Moderate" | "Emerging";
  relatedIds: string[];
  similarity: number;
  whyRanked: string;
}
export const plants: PlantRecord[] = [{
  id: "ashwagandha",
  common: "Ashwagandha",
  botanical: "Withania somnifera",
  genus: "Withania",
  family: "Solanaceae",
  parts: ["Root", "Leaf"],
  traditionalUse: "Rasayana and balya use documented across classical Ayurvedic formularies.",
  role: "Primary adaptogenic ingredient",
  tkdlRecords: 214,
  evidenceLevel: "High",
  relatedIds: ["brahmi", "giloy"],
  similarity: 100,
  whyRanked: "Query anchor plant."
}, {
  id: "amla",
  common: "Amla",
  botanical: "Phyllanthus emblica",
  genus: "Phyllanthus",
  family: "Phyllanthaceae",
  parts: ["Fruit"],
  traditionalUse: "Rasayana ingredient, widely documented in classical triphala preparations.",
  role: "Antioxidant / rasayana base",
  tkdlRecords: 331,
  evidenceLevel: "High",
  relatedIds: ["giloy", "mulethi"],
  similarity: 61,
  whyRanked: "Shared rasayana classification and heavy TKDL documentation overlap."
}, {
  id: "turmeric",
  common: "Turmeric",
  botanical: "Curcuma longa",
  genus: "Curcuma",
  family: "Zingiberaceae",
  parts: ["Rhizome"],
  traditionalUse: "Documented in lepa and internal preparations for inflammatory conditions.",
  role: "Anti-inflammatory principal",
  tkdlRecords: 402,
  evidenceLevel: "High",
  relatedIds: ["neem", "mulethi"],
  similarity: 58,
  whyRanked: "Frequently co-documented with neem in topical classical formulations."
}, {
  id: "mulethi",
  common: "Mulethi",
  botanical: "Glycyrrhiza glabra",
  genus: "Glycyrrhiza",
  family: "Fabaceae",
  parts: ["Root"],
  traditionalUse: "Documented for throat and mucosal complaints; common anupana ingredient.",
  role: "Demulcent / synergist",
  tkdlRecords: 188,
  evidenceLevel: "High",
  relatedIds: ["tulsi", "amla"],
  similarity: 54,
  whyRanked: "Overlapping formulation role as a synergist in documented combinations."
}, {
  id: "brahmi",
  common: "Brahmi",
  botanical: "Bacopa monnieri",
  genus: "Bacopa",
  family: "Plantaginaceae",
  parts: ["Whole plant"],
  traditionalUse: "Medhya use for cognition documented in classical sources.",
  role: "Nootropic co-ingredient",
  tkdlRecords: 147,
  evidenceLevel: "High",
  relatedIds: ["ashwagandha"],
  similarity: 73,
  whyRanked: "Appears with Withania in multiple documented and claimed combinations for cognition."
}, {
  id: "neem",
  common: "Neem",
  botanical: "Azadirachta indica",
  genus: "Azadirachta",
  family: "Meliaceae",
  parts: ["Leaf", "Bark", "Seed"],
  traditionalUse: "Documented kushtha-related and antimicrobial topical uses.",
  role: "Antimicrobial co-ingredient",
  tkdlRecords: 356,
  evidenceLevel: "High",
  relatedIds: ["turmeric", "tulsi"],
  similarity: 57,
  whyRanked: "Strong co-occurrence with turmeric in documented dermatological preparations."
}, {
  id: "giloy",
  common: "Giloy",
  botanical: "Tinospora cordifolia",
  genus: "Tinospora",
  family: "Menispermaceae",
  parts: ["Stem"],
  traditionalUse: "Documented rasayana and jvara-related use.",
  role: "Immunomodulatory co-ingredient",
  tkdlRecords: 263,
  evidenceLevel: "High",
  relatedIds: ["tulsi", "amla"],
  similarity: 66,
  whyRanked: "Shared rasayana role and frequent substitution discussion in documented sources."
}, {
  id: "tulsi",
  common: "Tulsi",
  botanical: "Ocimum tenuiflorum",
  genus: "Ocimum",
  family: "Lamiaceae",
  parts: ["Leaf"],
  traditionalUse: "Documented respiratory and jvara-related use.",
  role: "Respiratory support co-ingredient",
  tkdlRecords: 241,
  evidenceLevel: "High",
  relatedIds: ["giloy", "mulethi"],
  similarity: 49,
  whyRanked: "Co-documented in decoction families with Giloy."
}, {
  id: "betel",
  common: "Betel",
  botanical: "Piper betle",
  genus: "Piper",
  family: "Piperaceae",
  parts: ["Leaf"],
  traditionalUse: "Documented digestive and topical applications.",
  role: "Carrier / bioenhancer discussion",
  tkdlRecords: 96,
  evidenceLevel: "Moderate",
  relatedIds: ["turmeric"],
  similarity: 38,
  whyRanked: "Piperaceae bioenhancer literature overlaps extraction-route claims."
}, {
  id: "aloe",
  common: "Aloe vera",
  botanical: "Aloe barbadensis",
  genus: "Aloe",
  family: "Asphodelaceae",
  parts: ["Leaf gel"],
  traditionalUse: "Documented use in topical and digestive preparations (Kumari).",
  role: "Base / vehicle",
  tkdlRecords: 173,
  evidenceLevel: "High",
  relatedIds: ["neem", "turmeric"],
  similarity: 44,
  whyRanked: "Common vehicle in documented topical formulations."
}];
export const plantById = (id: string) => plants.find(p => p.id === id);
export interface EvidenceNode {
  id: string;
  label: string;
  layer: "formulation" | "ingredient" | "tkdl" | "patent" | "international";
  source?: string;
  caseNumber?: string;
  passage?: string;
  jurisdiction?: string;
  outcome?: string;
  sourceDate?: string;
  verification: string;
}
export const evidenceNodes: EvidenceNode[] = [{
  id: "e0",
  label: "Ashwagandha stress-support capsule",
  layer: "formulation",
  verification: "Indexed, pending re-verification",
  passage: "User-described formulation submitted for preliminary assessment."
}, {
  id: "e1",
  label: "Withania somnifera (root)",
  layer: "ingredient",
  verification: "Verified against official source",
  passage: "Detected as the principal ingredient with a withanolide standardisation step."
}, {
  id: "e2",
  label: "Bacopa monnieri (whole plant)",
  layer: "ingredient",
  verification: "Verified against official source",
  passage: "Detected as a secondary ingredient in the described combination."
}, {
  id: "e3",
  label: "TKDL/AY/1284",
  layer: "tkdl",
  source: "tkdl",
  caseNumber: "TKDL/AY/1284",
  jurisdiction: "India",
  outcome: "Documented traditional knowledge record",
  sourceDate: "Classical text reference",
  verification: "Verified against official source",
  passage: "Classical churna preparation of Ashwagandha root with documented rasayana indication."
}, {
  id: "e4",
  label: "TKDL/AY/2210",
  layer: "tkdl",
  source: "tkdl",
  caseNumber: "TKDL/AY/2210",
  jurisdiction: "India",
  outcome: "Documented traditional knowledge record",
  sourceDate: "Classical text reference",
  verification: "Verified against official source",
  passage: "Combination preparation using Ashwagandha with medhya ingredients."
}, {
  id: "e5",
  label: "IN 384512",
  layer: "patent",
  source: "ipindia",
  caseNumber: "IN 384512",
  jurisdiction: "India",
  outcome: "Granted",
  sourceDate: "2024-03-15",
  verification: "Verified against official source",
  passage: "Independent claim 1 recites a standardised root extract with a defined withanolide range."
}, {
  id: "e6",
  label: "WO 2023/154872",
  layer: "international",
  source: "wipo",
  caseNumber: "WO 2023/154872",
  jurisdiction: "PCT / WIPO",
  outcome: "Published, national phase pending",
  sourceDate: "2023-08-17",
  verification: "Verified against official source",
  passage: "Combination claim covering Withania with Bacopa for cognitive support."
}, {
  id: "e7",
  label: "EP 3 921 044 B1",
  layer: "international",
  source: "epo",
  caseNumber: "EP 3 921 044 B1",
  jurisdiction: "Europe / EPO",
  outcome: "Granted",
  sourceDate: "2023-02-08",
  verification: "Indexed, pending re-verification",
  passage: "Process claims on botanical polyphenol concentration relevant to extraction routes."
}];
export const evidenceEdges: Array<[string, string]> = [["e0", "e1"], ["e0", "e2"], ["e1", "e3"], ["e1", "e4"], ["e2", "e4"], ["e1", "e5"], ["e2", "e6"], ["e1", "e6"], ["e5", "e7"]];
export interface CountryProfile {
  id: string;
  name: string;
  flag: string;
  authority: string;
  authorityUrl: string;
  patent: string;
  trademark: string;
  traditionalKnowledge: string;
  abs: string;
  disclosure: string;
  x: number;
  y: number;
}
export const countries: CountryProfile[] = [{
  id: "in",
  name: "India",
  flag: "🇮🇳",
  authority: "Office of the CGPDTM (IP India)",
  authorityUrl: "https://ipindia.gov.in/",
  patent: "The Patents Act, 1970. Section 3(p) addresses traditional knowledge subject matter.",
  trademark: "Trade Marks Act, 1999.",
  traditionalKnowledge: "TKDL used in defensive protection; access agreements with several offices.",
  abs: "Biological Diversity Act, 2002 with National Biodiversity Authority approvals.",
  disclosure: "Source-of-biological-material disclosure required in the specification.",
  x: 68,
  y: 52
}, {
  id: "us",
  name: "United States",
  flag: "🇺🇸",
  authority: "USPTO",
  authorityUrl: "https://www.uspto.gov/",
  patent: "35 U.S.C.; prior art includes printed publications worldwide.",
  trademark: "Lanham Act; use-based and intent-to-use filings.",
  traditionalKnowledge: "No sui generis TK statute; documented TK operates as prior art.",
  abs: "Not a party to the Nagoya Protocol.",
  disclosure: "No general genetic-resource disclosure requirement.",
  x: 20,
  y: 40
}, {
  id: "ep",
  name: "Germany / EPO",
  flag: "🇪🇺",
  authority: "European Patent Office",
  authorityUrl: "https://www.epo.org/",
  patent: "European Patent Convention; absolute novelty standard.",
  trademark: "EUIPO for EU trade marks.",
  traditionalKnowledge: "TKDL access agreement supports examiner searching.",
  abs: "EU Regulation 511/2014 implements the Nagoya Protocol.",
  disclosure: "Rule 26(2) EPC on biological material deposit; EU due-diligence declarations.",
  x: 48,
  y: 31
}, {
  id: "gb",
  name: "United Kingdom",
  flag: "🇬🇧",
  authority: "UK Intellectual Property Office",
  authorityUrl: "https://www.gov.uk/government/organisations/intellectual-property-office",
  patent: "Patents Act 1977.",
  trademark: "Trade Marks Act 1994.",
  traditionalKnowledge: "TKDL access agreement in place.",
  abs: "Nagoya Protocol compliance regulations apply.",
  disclosure: "Deposit requirements for biological material.",
  x: 45,
  y: 27
}, {
  id: "cn",
  name: "China",
  flag: "🇨🇳",
  authority: "CNIPA",
  authorityUrl: "https://english.cnipa.gov.cn/",
  patent: "Patent Law of the PRC; provisions on genetic resources.",
  trademark: "Trademark Law of the PRC; first-to-file.",
  traditionalKnowledge: "Traditional medicine documentation used in examination.",
  abs: "Party to the Nagoya Protocol.",
  disclosure: "Disclosure of origin of genetic resources required.",
  x: 78,
  y: 38
}, {
  id: "jp",
  name: "Japan",
  flag: "🇯🇵",
  authority: "Japan Patent Office",
  authorityUrl: "https://www.jpo.go.jp/",
  patent: "Japanese Patent Act.",
  trademark: "Japanese Trademark Act.",
  traditionalKnowledge: "TKDL access agreement in place.",
  abs: "Party to the Nagoya Protocol; national guidelines apply.",
  disclosure: "No general disclosure-of-origin mandate.",
  x: 87,
  y: 38
}, {
  id: "au",
  name: "Australia",
  flag: "🇦🇺",
  authority: "IP Australia",
  authorityUrl: "https://www.ipaustralia.gov.au/",
  patent: "Patents Act 1990.",
  trademark: "Trade Marks Act 1995.",
  traditionalKnowledge: "Indigenous Knowledge panel and consultation practices.",
  abs: "Party to the Nagoya Protocol; state and territory access laws.",
  disclosure: "Source declarations under environment legislation in some jurisdictions.",
  x: 85,
  y: 74
}, {
  id: "ca",
  name: "Canada",
  flag: "🇨🇦",
  authority: "CIPO",
  authorityUrl: "https://ised-isde.canada.ca/site/canadian-intellectual-property-office/en",
  patent: "Patent Act (Canada).",
  trademark: "Trademarks Act.",
  traditionalKnowledge: "Indigenous knowledge considerations in examination practice.",
  abs: "Signatory to the Nagoya Protocol.",
  disclosure: "No general disclosure-of-origin mandate.",
  x: 19,
  y: 27
}, {
  id: "br",
  name: "Brazil",
  flag: "🇧🇷",
  authority: "INPI Brazil",
  authorityUrl: "https://www.gov.br/inpi/",
  patent: "Industrial Property Law 9.279/1996.",
  trademark: "Same statute; national registration.",
  traditionalKnowledge: "Law 13.123/2015 covers associated traditional knowledge.",
  abs: "SisGen registration for access and benefit-sharing.",
  disclosure: "Access registration must be declared in patent applications.",
  x: 31,
  y: 66
}, {
  id: "ec",
  name: "Ecuador",
  flag: "🇪🇨",
  authority: "SENADI",
  authorityUrl: "https://www.derechosintelectuales.gob.ec/",
  patent: "Andean Community Decision 486.",
  trademark: "Decision 486 regional framework.",
  traditionalKnowledge: "Decision 391 covers access to genetic resources and associated TK.",
  abs: "Party to the Nagoya Protocol.",
  disclosure: "Disclosure of origin and access contract required.",
  x: 25,
  y: 60
}];
export interface FeeLine {
  label: string;
  category: "Official government fee" | "Professional/service estimate";
  amount: number;
  currency: string;
  source: string;
  effective: string;
  lastVerified: string;
}
export interface HistoryItem {
  id: string;
  kind: "Analysis" | "Report" | "Patent search" | "Cost estimate" | "Expert request";
  title: string;
  date: string;
  jurisdiction: string;
  confidence: number;
  status: "Complete" | "In review" | "Draft" | "Awaiting expert";
}
export const historyItems: HistoryItem[] = [{
  id: "h1",
  kind: "Analysis",
  title: "Ashwagandha stress formulation — India & EU protectability",
  date: "2026-09-08",
  jurisdiction: "India + International",
  confidence: 88,
  status: "Complete"
}, {
  id: "h2",
  kind: "Report",
  title: "IP intelligence report — Haridra–Nimba topical",
  date: "2026-09-06",
  jurisdiction: "India",
  confidence: 81,
  status: "Complete"
}, {
  id: "h3",
  kind: "Patent search",
  title: "Semantic search — turmeric + neem skin inflammation",
  date: "2026-09-05",
  jurisdiction: "Both",
  confidence: 76,
  status: "Complete"
}, {
  id: "h4",
  kind: "Cost estimate",
  title: "Startup patent filing + PCT designation plan",
  date: "2026-09-03",
  jurisdiction: "India + PCT",
  confidence: 92,
  status: "Draft"
}, {
  id: "h5",
  kind: "Expert request",
  title: "ABS documentation review — wild-collected Giloy",
  date: "2026-09-01",
  jurisdiction: "India",
  confidence: 54,
  status: "Awaiting expert"
}, {
  id: "h6",
  kind: "Analysis",
  title: "Amla polyphenol concentrate — freedom-to-operate questions",
  date: "2026-08-28",
  jurisdiction: "International",
  confidence: 69,
  status: "In review"
}];
export const DISCLAIMER = "IP-SAKTI Sahayak provides information and decision support, not legal advice.";