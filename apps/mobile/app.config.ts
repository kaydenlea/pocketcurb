import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "PocketCurb",
  slug: "pocketcurb-mobile",
  scheme: "pocketcurb",
  version: "0.1.0",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  plugins: ["expo-router", "expo-secure-store", "sentry-expo"],
  experiments: {
    typedRoutes: true
  },
  splash: {
    resizeMode: "contain",
    backgroundColor: "#081512"
  },
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.pocketcurb.mobile"
  },
  android: {
    package: "com.pocketcurb.mobile"
  }
};

export default config;
