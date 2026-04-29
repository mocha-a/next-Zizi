import { create } from 'zustand';
import { SearchTrack } from '@/types/deezer/search';

interface SelectedTrackStore {
  selectedTracks: SearchTrack[];
  toggleTrack: (track: SearchTrack) => void;
  isSelected: (id: number) => boolean;
  clearTracks: () => void;
}

export const useSelectedTrackStore = create<SelectedTrackStore>((set, get) => ({
  selectedTracks: [],

  toggleTrack: (track) => {
    const exists = get().selectedTracks.some(t => t.id === track.id);

    set({
      selectedTracks: exists
        ? get().selectedTracks.filter(t => t.id !== track.id)
        : [...get().selectedTracks, track],
    });
  },

  isSelected: (id) => {
    return get().selectedTracks.some(t => t.id === id);
  },

  clearTracks: () => set({ selectedTracks: [] }),
}));