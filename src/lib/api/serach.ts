import { api } from "./axios";

export const allSearch = async (query: string) => {
  const { data } = await api.get('/deezer/search', {
    params: { query },
  });

  return data;
};

export const typeSearch = async (
  query: string,
  type: 'artist' | 'album' | 'track' | 'playlist',
  limit = 50,
  index = 0,
) => {
  const { data } = await api.get('/deezer/search', {
    params: {
      query,
      type,
      limit,
      index,
    },
  });

  return {
    items: data.data ?? data,
    next: data.next ?? null,
  };
};

// 인기 검색어 저장
export const postPopularSearch = async (keyword: string) => {
  const res = await api.post('/popular-search', { keyword });

  return res.data;
};

// 인기 검색어 조회
export const getPopularSearch = async () => {
  const res = await api.get('/popular-search');
  
  return res.data;
};

