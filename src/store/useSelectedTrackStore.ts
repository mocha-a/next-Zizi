import { create } from 'zustand';
import { SearchTrack } from '@/types/deezer/search';

interface SelectedTrackStore {
  tracks: SearchTrack[];            // 👉 실제 리스트 데이터
  selectedIds: number[];            // 👉 선택 상태

  toggleSelect: (id: number) => void;
  isSelected: (id: number) => boolean;

  setTracks: (tracks: SearchTrack[]) => void;

  removeTracks: () => void;         // 👉 선택된 것들 삭제
  clearSelection: () => void;
}

export const useSelectedTrackStore = create<SelectedTrackStore>((set, get) => ({
  tracks: [],
  selectedIds: [],

  toggleSelect: (id) => {
    const { selectedIds } = get();

    set({
      selectedIds: selectedIds.includes(id)
        ? selectedIds.filter(v => v !== id)
        : [...selectedIds, id],
    });
  },

  isSelected: (id) => {
    return get().selectedIds.includes(id);
  },

  setTracks: (tracks) => set({ tracks }),

  removeTracks: () => {
    const { tracks, selectedIds } = get();

    set({
      tracks: tracks.filter(t => !selectedIds.includes(t.id)),
      selectedIds: [], // 👉 삭제 후 선택 초기화
    });
  },

  clearSelection: () => set({ selectedIds: [] }),
}));