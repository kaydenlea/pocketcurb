import {
  dailyGuidanceResponseSchema,
  transactionSimulationSchema
} from "../index";

describe("transactionSimulationSchema", () => {
  it("accepts a valid simulation payload", () => {
    expect(() =>
      transactionSimulationSchema.parse({
        amount: 18.5,
        merchant: "Coffee",
        dateISO: "2026-04-03T12:00:00.000Z",
        isShared: false,
        reimbursementExpected: false
      })
    ).not.toThrow();
  });
});

describe("dailyGuidanceResponseSchema", () => {
  it("rejects an invalid spending meter value", () => {
    const parsed = dailyGuidanceResponseSchema.safeParse({
      safeToSpendToday: 20,
      recommendedDailyBudget: 20,
      runningBalance: 500,
      crisisCushion: 80,
      dailySpendingMeter: "unsafe"
    });

    expect(parsed.success).toBe(false);
  });
});
