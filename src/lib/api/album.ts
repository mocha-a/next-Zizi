import { Album } from "@/types/deezer/deezer";
import { api } from "./axios";

export const getAlbum = async (id: number) => { 
  const res = await api.get(`/deezer/album/${id}`);

  return res.data;
};

type EditorialItem = {
  id: number;
  type: string;
  title: string;
};

export const getSimilarAlbums = async (genreId: number, id: number) => {
  const safeId = genreId === -1 ? 0 : genreId;

  const res = await api.get(`/deezer/editorial/${safeId}`);

  console.log(res.data.data[0]?.id);
  console.log(id);
  
  const albums =
  res.data.data?.filter(
    (item: EditorialItem): item is Album =>
      item.type === 'album' && item.id !== id
  ) ?? [];

  return albums;
};