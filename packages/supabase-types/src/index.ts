export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          created_at?: string;
        };
        Update: {
          display_name?: string | null;
        };
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          merchant: string;
          booked_at: string;
          household_id: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          merchant: string;
          booked_at: string;
          household_id?: string | null;
        };
        Update: {
          amount?: number;
          merchant?: string;
          booked_at?: string;
          household_id?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      daily_guidance: {
        Args: { household_id?: string | null };
        Returns: Json;
      };
    };
    Enums: Record<string, never>;
  };
};
