
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