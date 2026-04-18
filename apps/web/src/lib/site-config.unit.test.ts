import { normalizeSiteOrigin } from "./site-config";

describe("normalizeSiteOrigin", () => {
  it("falls back for empty values", () => {
    expect(normalizeSiteOrigin(undefined)).toBe("https://gama.money");
    expect(normalizeSiteOrigin("")).toBe("https://gama.money");
    expect(normalizeSiteOrigin("   ")).toBe("https://gama.money");
  });

  it("normalizes bare production hosts to https origins", () => {
    expect(normalizeSiteOrigin("gama.money")).toBe("https://gama.money");
    expect(normalizeSiteOrigin("www.gama.money/")).toBe("https://www.gama.money");
  });

  it("normalizes loopback hosts to http origins", () => {
    expect(normalizeSiteOrigin("localhost:3000")).toBe("http://localhost:3000");
    expect(normalizeSiteOrigin("127.0.0.1:3000")).toBe("http://127.0.0.1:3000");
  });

  it("keeps valid fully-qualified origins and strips paths", () => {
    expect(normalizeSiteOrigin("https://preview.gama.money/")).toBe("https://preview.gama.money");
    expect(normalizeSiteOrigin("https://preview.gama.money/path?q=1")).toBe("https://preview.gama.money");
  });

  it("falls back for invalid values", () => {
    expect(normalizeSiteOrigin("nota url with spaces")).toBe("https://gama.money");
    expect(normalizeSiteOrigin("mailto:test@example.com")).toBe("https://gama.money");
  });
});
