import { api } from "./axios";

export const getArtist = async (id: number) => { 
  const res = await api.get(`/deezer/artist/${id}`);

  return res.data;
};

export const getTop = async (id: number) => { 
  const res = await api.get(`/deezer/artist/${id}/top`);


  return res.data.data;
};

interface Params {
  id: number;
  limit?: number;
  index?: number;
}

export const getArtistAlbums = async ({ id, limit = 10, index = 0 }: Params) => {
  const res = await api.get(`/deezer/artist/${id}/albums`, {
    params: { limit, index },
  });

  return res.data.data;
};