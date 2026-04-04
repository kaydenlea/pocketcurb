import { render, screen } from "@testing-library/react-native";
import { DailySpendingMeterCard } from "./components/DailySpendingMeterCard";

describe("DailySpendingMeterCard", () => {
  it("renders safe-to-spend guidance", () => {
    render(
      <DailySpendingMeterCard
        snapshot={{
          safeToSpendToday: 38,
          recommendedDailyBudget: 38,
          crisisCushion: 110,
          projectedEndOfWindowBalance: 420
        }}
        meter={{
          status: "watch",
          remainingToday: 38,
          guidanceLabel: "Watch spend today"
        }}
      />
    );

    expect(screen.getByText(/Daily Spending Meter/i)).toBeTruthy();
    expect(screen.getByText("$38")).toBeTruthy();
    expect(screen.getByText(/Watch spend today/i)).toBeTruthy();
  });
});
