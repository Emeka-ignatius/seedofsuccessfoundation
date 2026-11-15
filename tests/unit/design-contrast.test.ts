import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Reads the design tokens straight from app/globals.css and checks every text/background pairing the site uses
// against WCAG 2.2 AA (4.5:1 for text, 3:1 for large text and UI components). Change a colour and this tells you
// whether the pairing survives. When the logo's real colours arrive, this is the test that approves the swap.

const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

function token(name: string): string {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`));
  if (!m) throw new Error(`design token --${name} not found as a 6-digit hex in app/globals.css`);
  return m[1];
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const WHITE = "#ffffff";

// [foreground, background, minimum ratio, what it is for]
const PAIRS: Array<[string, string, number, string]> = [
  ["ink", "paper", 7, "body text"],
  ["ink", "paper-2", 7, "body text on alternate sections"],
  ["ink-2", "paper", 4.5, "secondary text"],
  ["ink-2", "paper-2", 4.5, "secondary text on alternate sections"],
  ["earth", "paper", 4.5, "links, accents and big numerals"],
  ["earth", "paper-2", 4.5, "links on alternate sections"],
  ["palm", "paper", 4.5, "green accent text (the prayer line)"],
  ["palm", "paper-2", 4.5, "green accent text on alternate sections"],
  ["night-ink", "night", 7, "text on dark sections"],
  ["night-ink-2", "night", 4.5, "secondary text on dark sections"],
  ["night-ink", "forest", 7, "text on the green ground"],
  ["night-ink-2", "forest", 4.5, "secondary text on the green ground"],
  ["gold", "night", 4.5, "gold links and numerals on dark sections"],
  ["gold", "forest", 4.5, "gold links and numerals on the green ground"],
  ["night", "gold", 4.5, "label on the gold button"],
];

describe("design tokens meet WCAG 2.2 AA", () => {
  it.each(PAIRS)("%s on %s is at least %s:1 (%s)", (fg, bg, min) => {
    expect(contrast(token(fg), token(bg))).toBeGreaterThanOrEqual(min);
  });

  it.each([
    ["earth", "primary button label"],
    ["earth-hover", "primary button label on hover"],
  ])("white on %s is at least 4.5:1 (%s)", (bg) => {
    expect(contrast(WHITE, token(bg))).toBeGreaterThanOrEqual(4.5);
  });

  it("the earth button is distinguishable from the page (3:1 for UI components)", () => {
    expect(contrast(token("earth"), token("paper"))).toBeGreaterThanOrEqual(3);
  });

  it("gold is never relied on as text on light grounds (documented failure)", () => {
    // This pairing FAILS AA by design; the token comment says dark grounds only. If gold ever passes on paper,
    // this test reminds whoever changed it to re-check where gold is used.
    expect(contrast(token("gold"), token("paper"))).toBeLessThan(4.5);
  });
});
