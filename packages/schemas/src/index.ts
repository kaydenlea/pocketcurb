import { z } from "zod";

export const moneyAmountSchema = z.object({
  currency: z.literal("USD"),
  value: z.number().finite()
});

export const transactionSimulationSchema = z.object({
  amount: z.number().positive(),
  merchant: z.string().trim().min(1),
  dateISO: z.string().datetime(),
  notes: z.string().trim().max(280).optional(),
  eventId: z.string().trim().min(1).optional(),
  isShared: z.boolean().default(false),
  reimbursementExpected: z.boolean().default(false)
});

export const dailyGuidanceRequestSchema = z.object({
  householdId: z.string().trim().min(1).optional(),
  includeSharedContext: z.boolean().default(true)
});

export const dailyGuidanceResponseSchema = z.object({
  safeToSpendToday: z.number().min(0),
  recommendedDailyBudget: z.number().min(0),
  runningBalance: z.number(),
  crisisCushion: z.number().min(0),
  dailySpendingMeter: z.enum(["comfortable", "watch", "tight"])
});

export type TransactionSimulationInput = z.infer<typeof transactionSimulationSchema>;
export type DailyGuidanceRequest = z.infer<typeof dailyGuidanceRequestSchema>;
export type DailyGuidanceResponse = z.infer<typeof dailyGuidanceResponseSchema>;
