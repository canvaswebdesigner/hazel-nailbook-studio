import { test } from "node:test";
import assert from "node:assert/strict";
import { demoDates, demoSlots } from "../src/lib/demo-booking.ts";

test("dates use Istanbul day and start tomorrow across year boundaries", () => {
  const dates = demoDates(new Date("2026-12-31T22:30:00Z"));
  assert.equal(dates[0], "2027-01-02");
  assert.equal(dates[13], "2027-01-15");
});
test("closed Sundays and invalid input offer no slots", () => {
  assert.deepEqual(demoSlots("2026-11-08", 60), []);
  assert.deepEqual(demoSlots("", 60), []);
  assert.deepEqual(demoSlots("2026-11-06", -1), []);
});
test("duration cannot overlap occupied periods or exceed closing time", () => {
  const slots = demoSlots("2026-11-06", 120);
  assert.ok(slots.includes("12:00"));
  assert.ok(slots.includes("17:00"));
  assert.ok(!slots.includes("10:00"));
  assert.ok(!slots.includes("12:30"));
  assert.ok(!slots.includes("17:30"));
  assert.equal(demoSlots("2026-11-07", 120).at(-1), "15:00");
});
