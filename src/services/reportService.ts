/** Report adapter. Generation/export can be connected to a server-side document service later. */
export type ReportFormat = "preview" | "pdf";

export function reportCapability(format: ReportFormat): "available" | "local-only" {
  return format === "preview" ? "available" : "local-only";
}
