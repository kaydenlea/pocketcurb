import { create } from "zustand";

type ShellState = {
  includeSharedContext: boolean;
  setIncludeSharedContext: (next: boolean) => void;
};

export const useShellStore = create<ShellState>((set) => ({
  includeSharedContext: true,
  setIncludeSharedContext: (next) => set({ includeSharedContext: next })
}));
