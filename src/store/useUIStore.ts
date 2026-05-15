import { create } from 'zustand';

interface UIStore {
  hideBottomNav: boolean;

  setHideBottomNav: (v: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  hideBottomNav: false,

  setHideBottomNav: (v) =>
    set({
      hideBottomNav: v,
    }),
}));