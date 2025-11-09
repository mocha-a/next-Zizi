import { create } from 'zustand';
import { Artist, Album, Track, Playlist, AllResults } from '@/types/spotify';

interface SearchState {
  // 전체탭 결과 (limit: 5)
  allResults: AllResults | null;

  // 탭별 개별 결과 (limit: 50)
  artistResults: { items: Artist[] } | null;
  albumResults: { items: Album[] } | null;
  trackResults: { items: Track[] } | null;
  playlistResults: { items: Playlist[] } | null;

  // Setter 함수들
  setAllResults: (data: AllResults | null) => void;
  setArtistResults: (data: { items: Artist[] } | null) => void;
  setAlbumResults: (data: { items: Album[] } | null) => void;
  setTrackResults: (data: { items: Track[] } | null) => void;
  setPlaylistResults: (data: { items: Playlist[] } | null) => void;

  // 전체 초기화
  clearResults: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  allResults: null,
  artistResults: null,
  albumResults: null,
  trackResults: null,
  playlistResults: null,

  setAllResults: (data) => set({ allResults: data }),
  setArtistResults: (data) => set({ artistResults: data }),
  setAlbumResults: (data) => set({ albumResults: data }),
  setTrackResults: (data) => set({ trackResults: data }),
  setPlaylistResults: (data) => set({ playlistResults: data }),

  clearResults: () =>
    set({
      allResults: null,
      artistResults: null,
      albumResults: null,
      trackResults: null,
      playlistResults: null,
    }),
}));
