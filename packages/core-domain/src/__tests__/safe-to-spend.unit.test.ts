import { calculateSafeToSpend, deriveDailySpendingMeter } from "../index";

describe("calculateSafeToSpend", () => {
  it("protects the crisis cushion and produces a daily budget", () => {
    const snapshot = calculateSafeToSpend({
      daysRemaining: 5,
      scheduledInflow: 400,
      scheduledOutflow: 250,
      protectedBuffer: 300,
      availableCash: 650
    });

    expect(snapshot.safeToSpendToday).toBe(100);
    expect(snapshot.projectedEndOfWindowBalance).toBe(500);
  });
});

describe("deriveDailySpendingMeter", () => {
  it("returns a watch state for moderate daily headroom", () => {
    const meter = deriveDailySpendingMeter({
      safeToSpendToday: 42,
      recommendedDailyBudget: 42,
      crisisCushion: 120,
      projectedEndOfWindowBalance: 210
    });

    expect(meter.status).toBe("watch");
    expect(meter.guidanceLabel).toContain("Watch");
  });
});
