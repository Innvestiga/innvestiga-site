import { describe, expect, it } from "vitest";
import { startsInView } from "./aboveFold";

describe("startsInView", () => {
  it("is true for a counter already inside the trigger line on load", () => {
    expect(startsInView(500, 900)).toBe(true);
  });

  it("is false for a counter below the trigger line", () => {
    expect(startsInView(1400, 900)).toBe(false);
    expect(startsInView(800, 900)).toBe(false); // below 85% of the viewport
  });
});
