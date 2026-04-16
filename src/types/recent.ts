import { CategoryType } from "./deezer/search";

export type RecentItem = {
  type: CategoryType;
  id: string;
  viewedAt: number;
};

// 최근기록 db Type
export type RecentView = {
  id: number;
  targetId: string;
  type: 'ALBUM' | 'TRACK' | 'ARTIST' | 'PLAYLIST';
  userId: string;
  viewedAt: string;
};