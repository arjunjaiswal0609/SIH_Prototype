/** Regulatory/jurisdiction profile adapter backed by the current reference set. */
import { countries, type CountryProfile } from "@/data/referenceData";

export function listCountryProfiles(): CountryProfile[] {
  return countries;
}
