// API 호출
import axios from 'axios';
import { AllResults, SearchArtist, SearchAlbum, SearchTrack, SearchPlaylist } from '@/types/deezer/search';

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
export const allSearch = async (query: string) => {
  const res = await fetch(`/api/deezer/search?query=${query}`);
  return res.json();
};

// 타입 탭
export const typeSearch = async (
  query: string,
  type: 'artist' | 'album' | 'track' | 'playlist',
  limit = 50,
  index = 0,
) => {
  const res = await fetch(
    `/api/deezer/search?query=${encodeURIComponent(query)}&type=${type}&limit=${limit}&index=${index}`
  );
  const data = await res.json();

  return {
    items: data.data ?? data
  };
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
  const { setSearchQuery } = useSearchStore.getState();
  const { setTabValue } = useTabStore.getState();

  // 탭 초기화
  setTabValue(0);
  
  // 검색어 zustand에 저장
  setSearchQuery(query); 

  // 검색 페이지로 이동
  router.push(`/search/${encodeURIComponent(query)}`); 

}; 

// ======================
// ====== Artist ========
// ======================

export const artistById = async (id: string): Promise<Artist> => {
  const { data } = await axios.get(`/api/spotify/artist/${id}`);
  return data;
};