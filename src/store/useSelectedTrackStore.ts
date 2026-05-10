import { create } from 'zustand';
import { Track } from '@/types/deezer/deezer';

interface Store {
  tracks: Record<number, Track>;
  selectedIds: number[];
  orderIds: number[];

  setTracks: (tracks: Track[]) => void;
  toggleSelect: (track: Track) => void;
  clearSelection: () => void;

  addSelectedToPlaylist: () => void;
  removeFromPlaylist: () => void;

  reorder: (start: number, end: number) => void;
  reset: () => void;
}

export const useTrackStore = create<Store>((set, get) => ({
  tracks: {},
  selectedIds: [],
  orderIds: [],

  setTracks: (tracks) => {
    const trackMap = tracks.reduce((acc, track) => {
      acc[track.id] = track;
      return acc;
    }, {} as Record<number, Track>);

    const orderIds = tracks.map(track => track.id);

    set({
      tracks: trackMap,
      orderIds,
      selectedIds: [],
    });
  },

  toggleSelect: (track) => {
    const { selectedIds, tracks } = get();
    const exists = selectedIds.includes(track.id);

    set({
      tracks: tracks[track.id]
        ? tracks
        : { ...tracks, [track.id]: track },

      selectedIds: exists
        ? selectedIds.filter(id => id !== track.id)
        : [...selectedIds, track.id],
    });
  },

  clearSelection: () => set({ selectedIds: [] }),

  addSelectedToPlaylist: () => {
    const { selectedIds, orderIds } = get();

    const newIds = selectedIds.filter(id => !orderIds.includes(id));

    set({
      orderIds: [...orderIds, ...newIds],
      selectedIds: [],
    });
  },

  removeFromPlaylist: () => {
    const { selectedIds, orderIds } = get();

    set({
      orderIds: orderIds.filter(id => !selectedIds.includes(id)),
      selectedIds: [],
    });
  },

  reorder: (start, end) => {
    const { orderIds } = get();
    const newList = [...orderIds];

    const [removed] = newList.splice(start, 1);
    newList.splice(end, 0, removed);

    set({ orderIds: newList });
  },

  reset: () =>
    set({
      tracks: {},
      selectedIds: [],
      orderIds: [],
    }),
}));