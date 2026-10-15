import { describe, expect, it } from "vitest";
import { FAQS, HOME_FAQS } from "./faq";

describe("faq", () => {
  it("has the nine questions of section G", () => {
    expect(FAQS).toHaveLength(9);
  });

  it("shows the first four on the home page", () => {
    expect(HOME_FAQS.map((f) => f.question)).toEqual(FAQS.slice(0, 4).map((f) => f.question));
  });

  it("never renders a bracketed placeholder", () => {
    for (const f of FAQS) expect(f.answer).not.toMatch(/\[|\]/);
  });
});
