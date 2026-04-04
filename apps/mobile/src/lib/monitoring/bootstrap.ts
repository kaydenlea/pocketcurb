import { Platform } from "react-native";
import { mobileEnv } from "../../config/env";

export function getMonitoringBootstrapSummary() {
  return {
    sentryReady: Boolean(mobileEnv.sentryDsn),
    posthogReady: Boolean(mobileEnv.posthogKey),
    revenueCatReady:
      Platform.OS === "ios"
        ? Boolean(mobileEnv.revenueCatAppleApiKey)
        : Boolean(mobileEnv.revenueCatGoogleApiKey)
  };
}
