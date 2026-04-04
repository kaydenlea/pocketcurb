import { createPocketCurbApiClient } from "./index";

describe("createPocketCurbApiClient", () => {
  it("validates request and response boundaries", async () => {
    const client = createPocketCurbApiClient(async <TResponse>() =>
      ({
        safeToSpendToday: 35,
        recommendedDailyBudget: 35,
        runningBalance: 420,
        crisisCushion: 120,
        dailySpendingMeter: "watch"
      }) as TResponse
    );

    await expect(
      client.getDailyGuidance({
        includeSharedContext: true
      })
    ).resolves.toMatchObject({
      safeToSpendToday: 35,
      dailySpendingMeter: "watch"
    });
  });
});
