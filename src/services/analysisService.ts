/** Central analysis adapter for the assistant workflow. */
import { evidenceNodes, patentRecords, sourceRegistry } from "@/data/referenceData";

export function getReferenceAnalysisContext() {
  return {
    patents: patentRecords,
    evidence: evidenceNodes,
    sources: sourceRegistry,
  };
}
