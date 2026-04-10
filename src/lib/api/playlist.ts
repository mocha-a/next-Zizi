import { api } from "./axios";

// 플레이리스트 상세
export const getPlaylist = async (id: number) => { 
  const res = await api.get(`/deezer/playlist/${id}`);

  return res.data;
};

// 크리에이터
export const getCreator = async (creatorId: number) => { 
  const res = await api.get(`/deezer/creator/${creatorId}`);

  return res.data;
};

