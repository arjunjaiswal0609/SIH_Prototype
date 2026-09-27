/** Analysis history adapter. Replace with persisted storage when account history is connected. */
import { historyItems, type HistoryItem } from "@/data/referenceData";

export function listHistory(): HistoryItem[] {
  return historyItems;
}
