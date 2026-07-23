import { api } from "./axios";

interface ChartParams {
  type?: 'tracks' | 'playlists';
  genreId?: string;
  pageParam?: number;
}

export const getChart = { 
  // 1. 전 세계 트랙 차트만 가져오기
  getGlobalTracks: async ({ type = 'tracks', pageParam = 0 }: ChartParams = {}) => {
    const res = await api.get('/deezer/chart', { 
      params: { 
        type,
        index: pageParam,
        limit: 50
      } 
    });
    return res.data.data;
  },

  // 2. 특정 장르의 트랙 차트만 가져오기
  getGenreTracks: async ({ genreId, pageParam = 0 }: ChartParams = {}) => {
    const res = await api.get(`/deezer/chart`, { 
      params: { 
        genreId ,
        index: pageParam,
        limit: 50
      } 
    });
    return res.data.data; // 필요한 tracks 데이터만 골라서 반환
  }
};