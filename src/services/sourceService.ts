/** Source registry adapter. Official URLs and verification metadata live in the data layer. */
import { sourceById, sourceRegistry, type SourceRef } from "@/data/referenceData";

export function listSources(): SourceRef[] {
  return sourceRegistry;
}

export function getSourceById(id: string): SourceRef | undefined {
  return sourceById(id);
}
