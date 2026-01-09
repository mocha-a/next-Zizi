import { create } from 'zustand';
import {
  AllResults,
  Artist,
  Album,
  Track,
  Playlist,
  SearchCategory,
} from '@/types/spotify';
import { allSearch, typeSearch } from '@/lib/search';

type EntityByCategory<T extends SearchCategory> =
  T extends 'artist'
    ? Artist
    : T extends 'album'
    ? Album
    : T extends 'track'
    ? Track
    : Playlist;

/* ======================================================
 * Search Store State 타입 정의
 * ====================================================== */
interface SearchState {
  /** 현재 검색어 */
  searchQuery: string;

  /** 전체 검색 결과 (All 탭용) */
  allResults: AllResults | null;

  /** 타입별 검색 결과 (탭별 캐싱) */
  artistResults: Artist[];
  albumResults: Album[];
  trackResults: Track[];
  playlistResults: Playlist[];

  /** 🔥 엔티티 캐시 (상세 페이지용) */
  entityMap: {
    artist: Record<string, Artist>;
    album: Record<string, Album>;
    track: Record<string, Track>;
    playlist: Record<string, Playlist>;
  };

  /** 무한 스크롤용 offset */
  offsets: {
    artist: number;
    album: number;
    track: number;
    playlist: number;
  };

  /** 무한 스크롤 종료 여부 */
  hasMore: {
    artist: boolean;
    album: boolean;
    track: boolean;
    playlist: boolean;
  };

  /** 공통 로딩 상태 */
  loading: boolean;

  /* ---------------- actions ---------------- */

  setSearchQuery: (query: string) => void;
  setOffset: (type: SearchCategory, value: number) => void;
  setLoading: (loading: boolean) => void;

  allSearchResults: (query: string) => Promise<void>;
  fetchInitialTypeResults: (
    query: string,
    type: SearchCategory
  ) => Promise<void>;
  fetchSectionIfNeeded: (type: SearchCategory) => Promise<void>;
  loadMore: (type: SearchCategory, limit?: number) => Promise<void>;

  /** 🔥 id 기반 단건 조회 */
  getEntityById: <T extends SearchCategory>(
    type: T,
    id: string
  ) => EntityByCategory<T> | undefined;

}

/* ======================================================
 * 공통 유틸: entityMap 누적
 * ====================================================== */
const upsertEntities = <T extends SearchCategory>(
  type: T,
  items: any[],
  state: SearchState
) => {
  const next = { ...state.entityMap[type] };
  items.forEach((item) => {
    next[item.id] = item;
  });

  return {
    ...state.entityMap,
    [type]: next,
  };
};

/* ======================================================
 * Search Store
 * ====================================================== */
export const useSearchStore = create<SearchState>((set, get) => ({
  /* ---------------- 기본 state ---------------- */

  searchQuery: '',
  allResults: null,

  artistResults: [],
  albumResults: [],
  trackResults: [],
  playlistResults: [],

  /** 🔥 엔티티 캐시 초기화 */
  entityMap: {
    artist: {},
    album: {},
    track: {},
    playlist: {},
  },

  offsets: {
    artist: 0,
    album: 0,
    track: 0,
    playlist: 0,
  },

  hasMore: {
    artist: true,
    album: true,
    track: true,
    playlist: true,
  },

  loading: false,

  /* ---------------- 기본 setter ---------------- */

  setSearchQuery: (query) => set({ searchQuery: query }),

  setOffset: (type, value) =>
    set((state) => ({
      offsets: { ...state.offsets, [type]: value },
    })),

  setLoading: (loading) => set({ loading }),

  /* ======================================================
   * 전체 검색 (All 탭)
   * ====================================================== */
  allSearchResults: async (query) => {
    if (!query) return;

    set({ loading: true });

    const data = await allSearch(query);

    set({
      searchQuery: query,
      allResults: data,

      artistResults: [],
      albumResults: [],
      trackResults: [],
      playlistResults: [],

      offsets: {
        artist: 0,
        album: 0,
        track: 0,
        playlist: 0,
      },

      loading: false,
    });
  },

  /* ======================================================
   * 타입별 초기 검색
   * ====================================================== */
  fetchInitialTypeResults: async (query, type) => {
    if (!query) return;

    set({ loading: true });

    const data = await typeSearch(query, type, 50, 0);

    const items = {
      artist: data.artists?.items ?? [],
      album: data.albums?.items ?? [],
      track: data.tracks?.items ?? [],
      playlist: data.playlists?.items ?? [],
    }[type];

    set((state) => ({
      artistResults:
        type === 'artist' ? (items as Artist[]) : state.artistResults,
      albumResults:
        type === 'album' ? (items as Album[]) : state.albumResults,
      trackResults:
        type === 'track' ? (items as Track[]) : state.trackResults,
      playlistResults:
        type === 'playlist'
          ? (items as Playlist[])
          : state.playlistResults,

      /** 🔥 entityMap 누적 */
      entityMap: upsertEntities(type, items as any[], state),

      offsets: {
        ...state.offsets,
        [type]: items.length,
      },

      loading: false,
    }));
  },

  /* ======================================================
   * 섹션 lazy fetch
   * ====================================================== */
  fetchSectionIfNeeded: async (type) => {
    const state = get();

    const hasData = {
      artist: state.artistResults.length,
      album: state.albumResults.length,
      track: state.trackResults.length,
      playlist: state.playlistResults.length,
    }[type];

    if (!hasData && state.searchQuery) {
      await get().fetchInitialTypeResults(state.searchQuery, type);
    }
  },

  /* ======================================================
   * 무한 스크롤
   * ====================================================== */
  loadMore: async (type, limit = 50) => {
    const state = get();
    if (!state.searchQuery || state.loading || !state.hasMore[type]) return;

    set({ loading: true });

    const offset = state.offsets[type];
    const data = await typeSearch(state.searchQuery, type, limit, offset);

    const items = {
      artist: data.artists?.items ?? [],
      album: data.albums?.items ?? [],
      track: data.tracks?.items ?? [],
      playlist: data.playlists?.items ?? [],
    }[type];

    set((state) => ({
      artistResults:
        type === 'artist'
          ? [...state.artistResults, ...(items as Artist[])]
          : state.artistResults,
      albumResults:
        type === 'album'
          ? [...state.albumResults, ...(items as Album[])]
          : state.albumResults,
      trackResults:
        type === 'track'
          ? [...state.trackResults, ...(items as Track[])]
          : state.trackResults,
      playlistResults:
        type === 'playlist'
          ? [...state.playlistResults, ...(items as Playlist[])]
          : state.playlistResults,

      /** 🔥 entityMap 누적 */
      entityMap: upsertEntities(type, items as any[], state),

      offsets: {
        ...state.offsets,
        [type]: offset + items.length,
      },

      hasMore: {
        ...state.hasMore,
        [type]: items.length === limit,
      },

      loading: false,
    }));
  },

  /* ======================================================
   * id 기반 단건 조회
   * ====================================================== */
  getEntityById: <T extends SearchCategory>(type: T, id: string) => {
    return get().entityMap[type][id] as EntityByCategory<T> | undefined;
  },
}));
