export type CurrencyCode = "USD";

export type MoneyAmount = {
  currency: CurrencyCode;
  value: number;
};

export type CashFlowWindow = {
  daysRemaining: number;
  scheduledInflow: number;
  scheduledOutflow: number;
  protectedBuffer: number;
  availableCash: number;
};

export type SafeToSpendSnapshot = {
  safeToSpendToday: number;
  recommendedDailyBudget: number;
  crisisCushion: number;
  projectedEndOfWindowBalance: number;
};

export type SpendingMeterStatus = "comfortable" | "watch" | "tight";

export type SpendingMeter = {
  status: SpendingMeterStatus;
  remainingToday: number;
  guidanceLabel: string;
};

export type TimelineEvent = {
  id: string;
  label: string;
  amount: number;
  dateISO: string;
  kind: "bill" | "income" | "event" | "reimbursement";
};

export function calculateSafeToSpend(window: CashFlowWindow): SafeToSpendSnapshot {
  const projectedEndOfWindowBalance =
    window.availableCash + window.scheduledInflow - window.scheduledOutflow - window.protectedBuffer;
  const safeToSpendPool = Math.max(projectedEndOfWindowBalance, 0);
  const recommendedDailyBudget =
    window.daysRemaining > 0 ? Number((safeToSpendPool / window.daysRemaining).toFixed(2)) : safeToSpendPool;

  return {
    safeToSpendToday: recommendedDailyBudget,
    recommendedDailyBudget,
    crisisCushion: Number((window.availableCash - safeToSpendPool).toFixed(2)),
    projectedEndOfWindowBalance: Number(projectedEndOfWindowBalance.toFixed(2))
  };
}

export function deriveDailySpendingMeter(snapshot: SafeToSpendSnapshot): SpendingMeter {
  if (snapshot.safeToSpendToday >= 60) {
    return {
      status: "comfortable",
      remainingToday: snapshot.safeToSpendToday,
      guidanceLabel: "Comfortable runway"
    };
  }

  if (snapshot.safeToSpendToday >= 20) {
    return {
      status: "watch",
      remainingToday: snapshot.safeToSpendToday,
      guidanceLabel: "Watch spend today"
    };
  }

  return {
    status: "tight",
    remainingToday: Math.max(snapshot.safeToSpendToday, 0),
    guidanceLabel: "Tight cash-flow day"
  };
}

export function sortTimeline(events: TimelineEvent[]): TimelineEvent[] {
  return [...events].sort((left, right) => left.dateISO.localeCompare(right.dateISO));
}
