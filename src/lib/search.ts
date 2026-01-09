// API 호출
import axios from 'axios';
import { AllResults, Artist, Album, Track, Playlist } from '@/types/spotify';

export const fetchSearch = async (
  query: string,
  type?: string,
  limit: number = 50,
  offset: number = 0
): Promise<AllResults> => {
  const { data } = await axios.get('/api/spotify/search', {
    params: { query, type, limit, offset },
  });

  const cleanData: AllResults = {
    artists: data.artists
      ? { items: data.artists.items.filter((item: Artist | null | undefined): item is Artist => item != null) }
      : undefined,
    albums: data.albums
      ? { items: data.albums.items.filter((item: Album | null | undefined): item is Album => item != null) }
      : undefined,
    tracks: data.tracks
      ? { items: data.tracks.items.filter((item: Track | null | undefined): item is Track => item != null) }
      : undefined,
    playlists: data.playlists
      ? { items: data.playlists.items.filter((item: Playlist | null | undefined): item is Playlist => item != null) }
      : undefined,
  };

  return cleanData;
};

// 전체 탭
// 타입별 usable items만 뽑기
const getUsableItems = <T>(items?: (T | null | undefined)[]): T[] =>
  items?.filter((i): i is T => i != null) || [];

// targetCount까지 채우는 반복 fetch
const fetchUntilFilled = async <T>(
  fetcher: (limit: number, offset: number) => Promise<(T | null | undefined)[]>,
  targetCount = 5,
  step = 10
): Promise<T[]> => {
  let results: T[] = [];
  let offset = 0;

  while (results.length < targetCount) {
    const items = await fetcher(step, offset);
    const usable = getUsableItems(items);
    results = [...results, ...usable];
    offset += step;
    if (items.length < step) break;
  }

  return results.slice(0, targetCount);
};

// **각 타입별 5개씩 채우는 allSearch**
export const allSearch = async (query: string) => {
  const [artists, albums, tracks, playlists] = await Promise.all([
    fetchUntilFilled<Artist>(async (limit, offset) => {
      const data = await fetchSearch(query, 'artist', limit, offset);
      return data.artists?.items || [];
    }),
    fetchUntilFilled<Album>(async (limit, offset) => {
      const data = await fetchSearch(query, 'album', limit, offset);
      return data.albums?.items || [];
    }),
    fetchUntilFilled<Track>(async (limit, offset) => {
      const data = await fetchSearch(query, 'track', limit, offset);
      return data.tracks?.items || [];
    }),
    fetchUntilFilled<Playlist>(async (limit, offset) => {
      const data = await fetchSearch(query, 'playlist', limit, offset);
      return data.playlists?.items || [];
    }),
  ]);

  return {
    artists: { items: artists },
    albums: { items: albums },
    tracks: { items: tracks },
    playlists: { items: playlists },
  };
};

// 타입 탭
export const typeSearch = async (
  query: string,
  type: 'artist' | 'album' | 'track' | 'playlist',
  limit = 50,
  offset = 0,
) => {
  return fetchSearch(query, type, limit, offset);
};

// 무한스크롤
export const moreSearch = async (
  query: string,
  type: 'artist' | 'album' | 'track' | 'playlist',
  limit: number,
  offset: number
) => {
  return fetchSearch(query, type, limit, offset);
};

// 검색 실행 + 상태 업데이트 + 라우팅 처리
import { useSearchStore } from '@/store/searchStore';
import { useTabStore } from '@/store/tabStore';

export const doSearch = async (query: string, router: any) => {
  const { setSearchQuery, allSearchResults } = useSearchStore.getState();
  const { setTabValue } = useTabStore.getState();

  // 탭 초기화
  setTabValue(0);
  
  // 검색어 zustand에 저장
  setSearchQuery(query); 

  // 검색 페이지로 이동
  router.push(`/search/${encodeURIComponent(query)}`); 

  // API 호출 후 zustand에 검색 결과 저장
  await allSearchResults(query); 
}; 

// ======================
// ====== Artist ========
// ======================

export const artistById = async (id: string): Promise<Artist> => {
  const { data } = await axios.get(`/api/spotify/artist/${id}`);
  return data;
};