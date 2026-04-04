import { siteCopy } from "./site-copy";

describe("siteCopy", () => {
  it("keeps the landing lane aligned with the product thesis", () => {
    expect(siteCopy.heroBody).toContain("Safe-to-Spend");
    expect(siteCopy.proofPoints.join(" ")).toContain("shared spending");
  });
});
