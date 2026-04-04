import { Stack } from "expo-router";

export default function AppStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#081512"
        }
      }}
    />
  );
}
