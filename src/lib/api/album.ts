import { api } from "./axios";

export const getAlbum = async (id: number) => { 
  const res = await api.get(`/deezer/album/${id}`);

  return res.data;
};