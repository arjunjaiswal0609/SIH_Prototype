/** Botanical/traditional-knowledge adapter backed by the current reference dataset. */
import { plantById, plants, type PlantRecord } from "@/data/referenceData";

export function listPlants(): PlantRecord[] {
  return plants;
}

export function getPlantById(id: string): PlantRecord | undefined {
  return plantById(id);
}
