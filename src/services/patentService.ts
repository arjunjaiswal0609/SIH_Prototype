/**
 * Patent data adapter. The current implementation reads the bundled reference
 * dataset; the UI depends on this interface rather than on storage details.
 */
import { patentRecords, type PatentRecord } from "@/data/referenceData";

export async function listPatentRecords(): Promise<PatentRecord[]> {
  return patentRecords;
}

export function getPatentRecords(): PatentRecord[] {
  return patentRecords;
}
