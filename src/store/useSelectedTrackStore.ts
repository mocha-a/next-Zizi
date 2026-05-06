import { create } from 'zustand';
import { SearchTrack } from '@/types/deezer/search';

interface Store {
  tracks: Record<number, SearchTrack>;
  selectedIds: number[];
  orderIds: number[];

  toggleSelect: (track: SearchTrack) => void;
  clearSelection: () => void;

  addSelectedToPlaylist: () => void;
  removeFromPlaylist: () => void;

  reorder: (start: number, end: number) => void;
}

export const useTrackStore = create<Store>((set, get) => ({
  tracks: {},
  selectedIds: [],
  orderIds: [],

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
}));