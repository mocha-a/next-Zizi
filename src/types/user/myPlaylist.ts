import { User } from "../userBadge";

export interface MyPlaylist {
  id: number;
  userId: string;
  title: string;
  description: string;
  thumbnails: string[];

  createdAt: string;
  updatedAt: string;

  user: User;

  tracks: {
    id: number;
    playlistId: number;
    trackId: string;
    order: number;
    createdAt: string;
  }[];
}

// 플리 수정
export interface UpdatePlaylist {
  title: string;
  description: string;
  thumbnails: string[];
  tracks: {
    id: number;
  }[];
}

export interface UpdatePlaylistParams {
  id: number;
  data: UpdatePlaylist;
}