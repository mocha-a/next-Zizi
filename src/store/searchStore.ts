import { create } from 'zustand';
import { Artist, Album, Track, Playlist, AllResults } from '@/types/spotify';
import { fetchSearch } from '@/lib/fetchSearch';

interface SearchState {
  searchQuery: string;
  allResults: AllResults | null;

  artistResults: Artist[] | null
  albumResults: Album[] | null
  trackResults: Track[] | null
  playlistResults: Playlist[] | null

  setSearchQuery: (query: string) => void;
  setAllResults: (data: AllResults | null) => void;

  setArtistResults: (data: Artist[] | null) => void;
  setAlbumResults: (data: Album[] | null) => void;
  setTrackResults: (data: Track[] | null) => void;
  setPlaylistResults: (data: Playlist[] | null) => void;

  fetchSearchResults: (query: string, type?: string, limit?: number) => Promise<void>;
  fetchSectionIfNeeded: (type: 'artist' | 'album' | 'track' | 'playlist') => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  searchQuery: '',
  allResults: null,

  artistResults: null,
  albumResults: null,
  trackResults: null,
  playlistResults: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setAllResults: (data) => set({ allResults: data }),

  setArtistResults: (data) => set({ artistResults: data }),
  setAlbumResults: (data) => set({ albumResults: data }),
  setTrackResults: (data) => set({ trackResults: data }),
  setPlaylistResults: (data) => set({ playlistResults: data }),

  fetchSearchResults: async (query, type, limit) => {
    if (!query) return;
    const data = await fetchSearch(query, type, limit);

    // 전체 검색
    if (!type) {
      set({ allResults: data });
      return;
    }

    // 개별 섹션별 저장
    if (type.includes('artist')) set({ artistResults: data.artists?.items || [] });
    if (type.includes('album')) set({ albumResults: data.albums?.items || [] });
    if (type.includes('track')) set({ trackResults: data.tracks?.items || [] });
    if (type.includes('playlist')) set({ playlistResults: data.playlists?.items || [] });
  },

  fetchSectionIfNeeded: async (type) => {
    const state = get();
    const hasData = {
      artist: state.artistResults?.length,
      album: state.albumResults?.length,
      track: state.trackResults?.length,
      playlist: state.playlistResults?.length,
    }[type];

    if (!hasData && state.searchQuery) {
      await get().fetchSearchResults(state.searchQuery, type, 50);
    }
  },
}));