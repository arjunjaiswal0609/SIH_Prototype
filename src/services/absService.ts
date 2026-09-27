/** ABS assessment adapter. The current risk engine remains client-side and deterministic. */
import type { Jurisdiction } from "@/data/referenceData";

export type AbsInput = {
  origin: string;
  collection: string;
  traditionalKnowledge: boolean;
  commercialUse: boolean;
  patentIntent: boolean;
  exportMarket: boolean;
};

export function assessAbs(input: AbsInput) {
  let score = 0;
  if (input.collection === "Wild-collected" || input.collection === "Unknown") score += 2;
  if (input.traditionalKnowledge) score += 2;
  if (input.commercialUse) score += 1;
  if (input.patentIntent) score += 1;
  if (input.exportMarket) score += 1;

  const status = input.collection === "Unknown"
    ? "review"
    : score >= 6 ? "risk" : score >= 4 ? "review" : "verified";

  const jurisdiction: Jurisdiction = input.origin === "India" ? "India" : "International";
  return { score, status, jurisdiction } as const;
}
