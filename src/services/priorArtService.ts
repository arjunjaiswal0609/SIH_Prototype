/** Evidence/prior-art adapter. */
import { evidenceEdges, evidenceNodes, type EvidenceNode as MockEvidenceNode } from "@/data/referenceData";
import { PriorArtGraphResponse, PriorArtGraphRequest, EvidenceNode } from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const graphCache = new Map<string, PriorArtGraphResponse>();

export function setPriorArtCache(query: string, data: PriorArtGraphResponse) {
  const normalizedKey = query.trim().toLowerCase();
  graphCache.set(normalizedKey, data);
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(`pa_graph_${normalizedKey}`, JSON.stringify(data));
    } catch (e) {
      // Ignore quota errors
    }
  }
}

export function getEvidenceGraph(): { nodes: MockEvidenceNode[]; edges: Array<[string, string]> } {
  return { nodes: evidenceNodes, edges: evidenceEdges };
}

export async function fetchPriorArtGraph(query?: string): Promise<PriorArtGraphResponse> {
  const normalizedKey = query?.trim().toLowerCase();
  
  if (normalizedKey && graphCache.has(normalizedKey)) {
    return graphCache.get(normalizedKey)!;
  }

  if (normalizedKey && typeof window !== "undefined") {
    try {
      const cached = sessionStorage.getItem(`pa_graph_${normalizedKey}`);
      if (cached) {
        const data = JSON.parse(cached) as PriorArtGraphResponse;
        graphCache.set(normalizedKey, data); // restore to memory
        return data;
      }
    } catch (e) {
      // Ignore parsing errors
    }
  }

  const reqBody: PriorArtGraphRequest = query ? { query } : {};
  const res = await fetch(`${API_BASE_URL}/api/v1/prior-art/graph`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
  });
  if (!res.ok) {
    throw new Error(`Graph API returned ${res.status}`);
  }
  
  const data = await res.json();
  if (normalizedKey) {
    graphCache.set(normalizedKey, data);
  }
  return data;
}

