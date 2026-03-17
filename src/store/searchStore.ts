import { create } from 'zustand';

interface SearchState {
  // 현재 검색어
  searchQuery: string;

  // ---------------- actions ----------------
  setSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',

  setSearchQuery: (query) => set({ searchQuery: query }),
}));
