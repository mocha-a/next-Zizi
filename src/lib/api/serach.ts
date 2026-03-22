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