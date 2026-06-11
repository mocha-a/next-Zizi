import { create } from 'zustand';

type SnackbarState = {
  open: boolean;
  message: string;
  show: (message: string) => void;
  hide: () => void;
};

export const useSnackbarStore = create<SnackbarState>((set) => ({
  open: false,
  message: '',

  show: (message) =>
    set({
      open: true,
      message,
    }),

  hide: () =>
    set({
      open: false,
      message: '',
    }),
}));