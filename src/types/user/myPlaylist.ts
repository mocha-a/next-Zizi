export interface MyPlaylist {
  id: number;
  userId: string;
  title: string;
  description: string;
  thumbnails: string[];

  createdAt: string;
  updatedAt: string;

  user: {
    name: string;
  };

  tracks: {
    id: number;
    playlistId: number;
    trackId: string;
    order: number;
    createdAt: string;
  }[];
}