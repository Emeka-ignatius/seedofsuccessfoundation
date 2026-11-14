import { describe, expect, it } from "vitest";
import { constructionDay } from "@/lib/site/construction";

describe("constructionDay", () => {
  it("counts 29 January 2026 as Day 1", () => {
    expect(constructionDay(new Date("2026-01-29T09:00:00Z"))).toBe(1);
  });

  it("is 0 before construction began", () => {
    expect(constructionDay(new Date("2026-01-28T23:00:00Z"))).toBe(0);
  });

  it("counts the next day as Day 2", () => {
    expect(constructionDay(new Date("2026-01-30T12:00:00Z"))).toBe(2);
  });

  it("matches the hand count for 14 November 2026 (Day 290)", () => {
    expect(constructionDay(new Date("2026-11-14T12:00:00Z"))).toBe(290);
  });

  it("turns over at London midnight, not UTC midnight (BST)", () => {
    // 2026-07-01 23:30 UTC is 00:30 on 2 July in London (BST, UTC+1).
    const jul1 = constructionDay(new Date("2026-07-01T12:00:00Z"));
    expect(constructionDay(new Date("2026-07-01T22:59:00Z"))).toBe(jul1); // 23:59 on 1 July in London
    expect(constructionDay(new Date("2026-07-01T23:00:00Z"))).toBe(jul1 + 1); // 00:00 on 2 July in London
  });

  it("is not skewed by the daylight-saving changes", () => {
    const beforeSpring = constructionDay(new Date("2026-03-28T12:00:00Z"));
    const afterSpring = constructionDay(new Date("2026-03-30T12:00:00Z"));
    expect(afterSpring - beforeSpring).toBe(2);
    const beforeAutumn = constructionDay(new Date("2026-10-24T12:00:00Z"));
    const afterAutumn = constructionDay(new Date("2026-10-26T12:00:00Z"));
    expect(afterAutumn - beforeAutumn).toBe(2);
  });
});
