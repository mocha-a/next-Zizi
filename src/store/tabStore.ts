import { create } from 'zustand';

interface TabState {
  tabValue: number;
  setTabValue: (value: number) => void;
}

export const useTabStore = create<TabState>((set) => ({
  tabValue: 0,
  setTabValue: (value) => set({ tabValue: value }),
}));
