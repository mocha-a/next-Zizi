import { api } from "./axios";

// 트랙 상세
export const getTrack = async (id: number) => { 
  const res = await api.get(`/deezer/track/${id}`);

  return res.data;
};