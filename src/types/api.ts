export interface ChatRequest {
  query: string;
  jurisdiction?: string;
  language?: string;
}

export interface EvidenceItem {
  id: string;
  number: string;
  jurisdiction: string;
  risk: "risk" | "info" | "review";
  title: string;
  whyRelevant: string;
}

export interface ChatResponse {
  executive_answer: string;
  confidence: number;
  source_agreement: number;
  jurisdiction_coverage: number;
  evidence_count: number;
  applicable_ip_types: string[];
  key_findings: string[];
  next_steps: string[];
  evidence: EvidenceItem[];
  prior_art_graph?: PriorArtGraphResponse;
}

export interface PriorArtGraphRequest {
  query?: string;
}

export interface EvidenceNode {
  id: string;
  label: string;
  layer: "formulation" | "tkdl" | "patent" | "international";
  source?: string;
  jurisdiction?: string;
  caseNumber?: string;
  outcome?: string;
  sourceDate?: string;
  verification: string;
  passage: string;
}

export interface PriorArtGraphResponse {
  nodes: EvidenceNode[];
  edges: Array<[string, string]>;
}
