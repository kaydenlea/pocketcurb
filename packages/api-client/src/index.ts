import {
  type DailyGuidanceRequest,
  type DailyGuidanceResponse,
  dailyGuidanceRequestSchema,
  dailyGuidanceResponseSchema,
  type TransactionSimulationInput,
  transactionSimulationSchema
} from "@pocketcurb/schemas";
import type { Database } from "@pocketcurb/supabase-types";

export type PocketCurbFunctionName = "daily-guidance" | "simulate-transaction";

export type EdgePayload = Record<string, unknown>;

export type EdgeInvoker = <TResponse>(name: PocketCurbFunctionName, payload: EdgePayload) => Promise<TResponse>;

export type PocketCurbApiClient = {
  getDailyGuidance(input: DailyGuidanceRequest): Promise<DailyGuidanceResponse>;
  simulateTransaction(input: TransactionSimulationInput): Promise<{ accepted: true }>;
};

export type SupabaseSchemaName = keyof Database;

export function createPocketCurbApiClient(invoke: EdgeInvoker): PocketCurbApiClient {
  return {
    async getDailyGuidance(input) {
      const payload = dailyGuidanceRequestSchema.parse(input);
      const response = await invoke<DailyGuidanceResponse>("daily-guidance", payload);
      return dailyGuidanceResponseSchema.parse(response);
    },
    async simulateTransaction(input) {
      const payload = transactionSimulationSchema.parse(input);
      await invoke("simulate-transaction", payload);
      return { accepted: true as const };
    }
  };
}
