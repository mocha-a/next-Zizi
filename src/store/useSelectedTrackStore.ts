import { create } from 'zustand';
import { SearchTrack } from '@/types/deezer/search';

interface SelectedTrackStore {
  selectedTracks: SearchTrack[];
  toggleTrack: (track: SearchTrack) => void;
  isSelected: (id: number) => boolean;
  clearTracks: () => void;

  // 추가
  setTracks: (tracks: SearchTrack[]) => void;
  removeTrack: (id: number) => void;
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

  // 추가 (순서 변경용)
  setTracks: (tracks) => set({ selectedTracks: tracks }),

  // 추가 (삭제 버튼용)
  removeTrack: (id) =>
    set({
      selectedTracks: get().selectedTracks.filter(t => t.id !== id),
    }),
}));