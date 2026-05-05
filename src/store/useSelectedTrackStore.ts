import { create } from 'zustand';
import { SearchTrack } from '@/types/deezer/search';

interface SelectedTrackStore {
  tracks: SearchTrack[];                       // 전체 리스트
  selectedTracks: SearchTrack[];               // 선택 리스트

  toggleSelect: (track: SearchTrack) => void;  // 선택 / 해제 토글 함수
  isSelected: (id: number) => boolean;

  setTracks: (tracks: SearchTrack[]) => void;

  removeTrack: (id: number) => void;  // 👉 선택된 리스트에서 개별 삭제
  clearSelection: () => void;

  reorderTracks: (startIndex: number, endIndex: number) => void; // 👉 드래그용
}

export const useSelectedTrackStore = create<SelectedTrackStore>((set, get) => ({
  tracks: [],
  selectedTracks: [],

  toggleSelect: (track) => {
    console.log('clicked track id:', track);
    const { selectedTracks } = get();

    const exists = selectedTracks.find(t => t.id === track.id);

    set({
      selectedTracks: exists
        ? selectedTracks.filter(t => t.id !== track.id)
        : [...selectedTracks, track],
    });
  },

  isSelected: (id) => {
    return get().selectedTracks.some(t => t.id === id);
  },

  setTracks: (tracks) => set({ tracks }),

  removeTrack: (id) => {
    const { selectedTracks } = get();

    set({
      selectedTracks: selectedTracks.filter(t => t.id !== id),
    });
  },

  clearSelection: () => set({ selectedTracks: [] }),

  reorderTracks: (startIndex, endIndex) => {
    
    const { selectedTracks } = get();
    const newList = [...selectedTracks];

    const [removed] = newList.splice(startIndex, 1);
    newList.splice(endIndex, 0, removed);

    set({ selectedTracks: newList });
  },
}));