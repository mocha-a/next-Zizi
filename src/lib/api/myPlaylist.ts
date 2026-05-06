import { api } from "./axios";

interface DTO {
  title: string;
  description?: string;
  userId: string;
  tracks: { id: number }[];
}

export const createPlaylist = async (data: DTO) => {
  const res = await api.post('/playlists', data);

  return res.data;
};