import { CategoryType } from "./deezer/search";
import { Track } from '@/types/deezer/deezer';
import { Artist } from '@/types/deezer/deezer';
import { Album } from '@/types/deezer/deezer';
import { Playlist } from '@/types/deezer/deezer';

export interface RecentTrack extends Track {
  recentId: number;
  viewedAt: string;
}

export interface RecentArtist extends Artist {
  recentId: number;
  viewedAt: string;
}

export interface RecentAlbum extends Album {
  recentId: number;
  viewedAt: string;
}

export interface RecentPlaylist extends Playlist {
  recentId: number;
  viewedAt: string;
}

export type RecentItem = {
  type: CategoryType;
  id: string;
  viewedAt: number;
};