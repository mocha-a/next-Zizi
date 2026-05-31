import { create } from 'zustand';

interface PlaylistEditStore {
  isEditMode: boolean;
  selectedIds: number[];

  setEditMode: (v: boolean) => void;

  toggleSelect: (id: number) => void;

  setSelectedIds: (ids: number[]) => void;

  clearSelection: () => void;
}

export const usePlaylistEditStore =
  create<PlaylistEditStore>((set, get) => ({
    isEditMode: false,

    selectedIds: [],

    setEditMode: (v) =>
      set({
        isEditMode: v,

        // edit 종료 시 선택 초기화
        selectedIds: v ? get().selectedIds : [],
      }),

    toggleSelect: (id) => {
      const { selectedIds } = get();

      const exists = selectedIds.includes(id);

      set({
        selectedIds: exists
          ? selectedIds.filter(v => v !== id)
          : [...selectedIds, id],
      });
    },

    setSelectedIds: (ids) =>
      set({
        selectedIds: ids,
      }),

    clearSelection: () =>
      set({
        selectedIds: [],
      }),
  }));