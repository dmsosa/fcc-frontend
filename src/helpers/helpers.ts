export function sliceArray<T>(array: T[], offset?: number, limit?: number) : T[] {
    if (!limit) return array;
    const from = offset && offset > 0 ? offset * limit : 0;
    const to = limit > 0 ? from + limit : undefined;
    return array.slice(from, to);
}
//HELPERS
// Time formatting helper
export function parseTime (seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export function clamp(min: number, max: number, n: number): number  { return Math.min(max, Math.max(n, min)) };
