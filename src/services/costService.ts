/** Cost calculation adapter. Fee schedules can be replaced without changing the planner UI. */
export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
