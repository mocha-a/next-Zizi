import { create } from "zustand";
import { Track } from '@/types/deezer/deezer';

type TrackDialogStore = {
  open: boolean;
  track: Track | null;
  openDialog: (track: Track) => void;
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