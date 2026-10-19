import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import EmailOff from "./EmailOff";

describe("EmailOff", () => {
  it("wraps its children in Cloudflare's email_off markers so the address stays readable", () => {
    const html = renderToStaticMarkup(createElement(EmailOff, null, createElement("a", { href: "mailto:info@innvestiga.com" }, "info@innvestiga.com")));
    expect(html).toMatch(/^<span hidden=""><!--email_off--><\/span><a href="mailto:info@innvestiga.com">info@innvestiga.com<\/a><span hidden=""><!--email_on--><\/span>$/);
  });
});
