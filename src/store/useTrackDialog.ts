import { create } from "zustand";
import { TrackItemData } from "@/types/trackItem";

type TrackDialogStore = {
  open: boolean;
  track: TrackItemData | null;
  openDialog: (track: TrackItemData) => void;
  closeDialog: () => void;
};

export const useTrackDialog = create<TrackDialogStore>((set) => ({
  open: false,
  track: null,

  openDialog: (track) =>
    set({
      open: true,
      track,
    }),

  closeDialog: () =>
    set({
      open: false,
      track: null,
    }),
}));