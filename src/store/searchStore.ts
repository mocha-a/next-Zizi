import { create } from 'zustand';
import { Artist, Album, Track, Playlist, AllResults } from '@/types/spotify';
import { fetchSearch } from '@/lib/search';

interface SearchState {
  searchQuery: string;
  allResults: AllResults | null;

  artistResults: Artist[] | null;
  albumResults: Album[] | null;
  trackResults: Track[] | null;
  playlistResults: Playlist[] | null;

  artistOffset: number;
  albumOffset: number;
  trackOffset: number;
  playlistOffset: number;

  hasMoreArtists: boolean;
  hasMoreAlbums: boolean;
  hasMoreTracks: boolean;
  hasMorePlaylists: boolean;

  setSearchQuery: (query: string) => void;
  setAllResults: (data: AllResults | null) => void;
  setArtistResults: (data: Artist[] | null) => void;
  setAlbumResults: (data: Album[] | null) => void;
  setTrackResults: (data: Track[] | null) => void;
  setPlaylistResults: (data: Playlist[] | null) => void;

  fetchSearchResults: (query: string, type?: string, limit?: number) => Promise<void>;
  fetchSectionIfNeeded: (type: 'artist' | 'album' | 'track' | 'playlist') => Promise<void>;
  fetchMore: (type: 'artist' | 'album' | 'track' | 'playlist', limit?: number) => Promise<void>;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  searchQuery: '',
  allResults: null,

  artistResults: null,
  albumResults: null,
  trackResults: null,
  playlistResults: null,

  artistOffset: 0,
  albumOffset: 0,
  trackOffset: 0,
  playlistOffset: 0,

  hasMoreArtists: true,
  hasMoreAlbums: true,
  hasMoreTracks: true,
  hasMorePlaylists: true,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setAllResults: (data) => set({ allResults: data }),
  setArtistResults: (data) => set({ artistResults: data }),
  setAlbumResults: (data) => set({ albumResults: data }),
  setTrackResults: (data) => set({ trackResults: data }),
  setPlaylistResults: (data) => set({ playlistResults: data }),

  fetchSearchResults: async (query, type, limit = 50) => {
    const { setAllResults, setArtistResults, setAlbumResults, setTrackResults, setPlaylistResults } = get();
    if (!query) return;

    // 초기화
    setAllResults(null);
    setArtistResults(null);
    setAlbumResults(null);
    setTrackResults(null);
    setPlaylistResults(null);

    const data = await fetchSearch(query, type, limit);

    setAllResults(data);

    // 섹션별 상태 업데이트 + offset, hasMore 설정
    if (type?.includes('artist')) set({
      artistResults: data.artists?.items || [],
      artistOffset: data.artists?.items.length || 0,
      hasMoreArtists: (data.artists?.items.length || 0) === limit,
    });
    if (type?.includes('album')) set({
      albumResults: data.albums?.items || [],
      albumOffset: data.albums?.items.length || 0,
      hasMoreAlbums: (data.albums?.items.length || 0) === limit,
    });
    if (type?.includes('track')) set({
      trackResults: data.tracks?.items || [],
      trackOffset: data.tracks?.items.length || 0,
      hasMoreTracks: (data.tracks?.items.length || 0) === limit,
    });
    if (type?.includes('playlist')) set({
      playlistResults: data.playlists?.items || [],
      playlistOffset: data.playlists?.items.length || 0,
      hasMorePlaylists: (data.playlists?.items.length || 0) === limit,
    });
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

  fetchMore: async (type, limit = 50) => {
    const state = get();
    const query = state.searchQuery;
    if (!query) return;

    let results: any[] = [];
    let offset = 0;
    let hasMore = true;

    // 현재 상태 확인
    switch (type) {
      case 'artist':
        if (!state.hasMoreArtists) return;
        results = state.artistResults || [];
        offset = state.artistOffset;
        hasMore = state.hasMoreArtists;
        break;
      case 'album':
        if (!state.hasMoreAlbums) return;
        results = state.albumResults || [];
        offset = state.albumOffset;
        hasMore = state.hasMoreAlbums;
        break;
      case 'track':
        if (!state.hasMoreTracks) return;
        results = state.trackResults || [];
        offset = state.trackOffset;
        hasMore = state.hasMoreTracks;
        break;
      case 'playlist':
        if (!state.hasMorePlaylists) return;
        results = state.playlistResults || [];
        offset = state.playlistOffset;
        hasMore = state.hasMorePlaylists;
        break;
    }

    const data = await fetchSearch(query, type, limit, offset);
    const newItems = {
      artist: data.artists?.items || [],
      album: data.albums?.items || [],
      track: data.tracks?.items || [],
      playlist: data.playlists?.items || [],
    }[type];

    // 중복 제거 (id 기준)
    const combined = [...results, ...newItems].filter(
      (item, index, self) => self.findIndex(i => i.id === item.id) === index
    );

    // 상태 업데이트
    switch (type) {
      case 'artist':
        set({
          artistResults: combined,
          artistOffset: combined.length,
          hasMoreArtists: newItems.length === limit,
        });
        break;
      case 'album':
        set({
          albumResults: combined,
          albumOffset: combined.length,
          hasMoreAlbums: newItems.length === limit,
        });
        break;
      case 'track':
        set({
          trackResults: combined,
          trackOffset: combined.length,
          hasMoreTracks: newItems.length === limit,
        });
        break;
      case 'playlist':
        set({
          playlistResults: combined,
          playlistOffset: combined.length,
          hasMorePlaylists: newItems.length === limit,
        });
        break;
    }
    console.log(
  'fetchMore 호출', 
  type,
  '현재 length:', results.length,
  'offset:', offset,
  'limit:', limit,
  'newItems:', newItems.length,
  '합친 length:', combined.length
);
    console.log('fetchMore 호출', type, 'offset:', offset, 'limit:', limit, 'newItems:', newItems.length);
  },
}));
