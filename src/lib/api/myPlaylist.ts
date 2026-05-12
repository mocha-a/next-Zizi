import { api } from "./axios";

interface DTO {
  title: string;
  description?: string;
  userId?: string;
  thumbnails: string[];
  tracks: { id: number }[];
}

// 내 플리 저장
export const createPlaylist = async (data: DTO) => {
  const res = await api.post('/myplaylist', data);

  return res.data;
};

// 내 플리 수정
export const updatePlaylist = async (id: number, data: DTO) => {
  const res = await api.patch(`/myplaylist/${id}`, data);

  return res.data;
};

// mypage에서 내 플리 목록
export const getPlaylists = async () => {
  const res = await api.get('/myplaylist');

  return res.data;
};

// 내 플리 상세
export const getMyPlaylist = async (id: string) => {
  const res = await api.get(`/myplaylist/${id}`);

  return res.data;
};

// 내 플리 삭제
export const deletePlaylist = async (id: string) => {
  const res = await api.delete(`/myplaylist/${id}`);

  return res.data;
};