import { CategoryType } from "@/types/deezer/search";
import { getAlbum, getArtist, getPlaylist, getTrack } from '@/lib/api';
import { api } from "./axios";

// 최근기록
export const getRecentViews = async (type: string) => {

  const res = await api.get(`/recent-views?type=${type}`);

  return res.data;
};

// 최근기록 타입 별
export const getDetailByType = (type: CategoryType, id: string) => {
  switch (type) {
    case 'album':
      return getAlbum(Number(id));
    case 'track':
      return getTrack(Number(id));
    case 'artist':
      return getArtist(Number(id));
    case 'playlist':
      return getPlaylist(Number(id));
  }
};