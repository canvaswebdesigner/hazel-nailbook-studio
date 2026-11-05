/** Fictional availability only. Never reads or writes appointments. */
export function demoDates(now = new Date()) {
  const format = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Istanbul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const start = new Date(`${format.format(now)}T12:00:00+03:00`);
  return Array.from({ length: 14 }, (_, i) =>
    format.format(new Date(start.getTime() + (i + 1) * 86_400_000)),
  );
}

export function dateLabel(date: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    timeZone: "Europe/Istanbul",
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T12:00:00+03:00`));
}

export function demoSlots(date: string, duration: number): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || duration <= 0 || !Number.isFinite(duration)) return [];
  const day = new Date(`${date}T12:00:00+03:00`).getUTCDay();
  if (!Number.isFinite(day) || day === 0) return [];
  const open = day === 6 ? 11 * 60 : 10 * 60;
  const close = day === 6 ? 17 * 60 : 19 * 60;
  const occupied = [
    [11 * 60, 12 * 60],
    [14 * 60, 15 * 60],
  ];
  const result: string[] = [];
  for (let start = open; start + duration <= close; start += 30) {
    if (occupied.some(([a, b]) => start < b && start + duration > a)) continue;
    result.push(
      `${String(Math.floor(start / 60)).padStart(2, "0")}:${String(start % 60).padStart(2, "0")}`,
    );
  }
  return result;
}
