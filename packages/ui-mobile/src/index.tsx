import type { PropsWithChildren } from "react";
import { Text, View } from "react-native";

export function AppScreen({ children }: PropsWithChildren) {
  return <View className="flex-1 bg-neutral-950 px-5 pt-6">{children}</View>;
}

export function SectionCard({
  eyebrow,
  title,
  children
}: PropsWithChildren<{ eyebrow: string; title: string }>) {
  return (
    <View className="rounded-3xl border border-white/10 bg-neutral-900 p-5">
      <Text className="text-xs uppercase tracking-[2px] text-emerald-300">{eyebrow}</Text>
      <Text className="mt-2 text-xl font-semibold text-white">{title}</Text>
      <View className="mt-4">{children}</View>
    </View>
  );
}

export function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <View className="rounded-full bg-white/5 px-4 py-2">
      <Text className="text-[11px] uppercase tracking-[1.5px] text-white/60">{label}</Text>
      <Text className="mt-1 text-base font-semibold text-white">{value}</Text>
    </View>
  );
}
