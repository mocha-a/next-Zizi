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

// 검색 실행 + 상태 업데이트 + 라우팅 처리
import { useSearchStore } from '@/store/searchStore';
import { useTabStore } from '@/store/tabStore';

export const doSearch = async (query: string, router: any, limit = 5) => {
  const { setSearchQuery, fetchSearchResults } = useSearchStore.getState();
  const { setTabValue } = useTabStore.getState();

  // 탭 초기화
  setTabValue(0);
  
  // 검색어 zustand에 저장
  setSearchQuery(query); 

  // 검색 페이지로 이동
  router.push(`/search/${encodeURIComponent(query)}`); 

  // API 호출 후 zustand에 검색 결과 저장
  await fetchSearchResults(query, 'artist,album,track,playlist', limit); 
}; 
