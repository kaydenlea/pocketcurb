import { createPocketCurbApiClient } from "@pocketcurb/api-client";
import { supabase } from "../supabase/client";
import { toUserSafeApiError } from "./errors";

export const apiClient = createPocketCurbApiClient(async (name, payload) => {
  const { data, error } = await supabase.functions.invoke(name, {
    body: payload
  });

  if (error) {
    throw toUserSafeApiError(error);
  }

  return data;
});
