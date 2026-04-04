import { MMKV } from "react-native-mmkv";

export const appCacheStorage = new MMKV({
  id: "pocketcurb-cache"
});

const sensitiveKeyPattern = /(token|secret|session|password|credential|auth)/i;

function assertNonSensitiveKey(key: string) {
  if (sensitiveKeyPattern.test(key)) {
    throw new Error(`Sensitive key "${key}" must not be stored in MMKV.`);
  }
}

export const nonSensitiveCache = {
  getString(key: string) {
    assertNonSensitiveKey(key);
    return appCacheStorage.getString(key) ?? null;
  },
  setString(key: string, value: string) {
    assertNonSensitiveKey(key);
    appCacheStorage.set(key, value);
  },
  remove(key: string) {
    assertNonSensitiveKey(key);
    appCacheStorage.delete(key);
  }
};
