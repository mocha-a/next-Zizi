import { CategoryType } from "./deezer/search";
import { Track } from '@/types/deezer/deezer';

export interface RecentTrack extends Track {
  recentId: number;
  viewedAt: string;
}

import { Album } from '@/types/deezer/deezer';

export interface RecentAlbum extends Album {
  recentId: number;
  viewedAt: string;
}

import { Artist } from '@/types/deezer/deezer';

export interface RecentArtist extends Artist {
  recentId: number;
  viewedAt: string;
}

import { Playlist } from '@/types/deezer/deezer';

export interface RecentPlaylist extends Playlist {
  recentId: number;
  viewedAt: string;
}

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