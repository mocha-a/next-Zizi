import { api } from "./axios";

interface ChartTypes {
  getGlobalTracks: () => Promise<any>; // 일단 any로 두고, 나중에 API 응답 데이터 타입으로 교체 가능
  getGenreTracks: (genreId: string) => Promise<any>;
}

export const getChart: ChartTypes = { 
  // 1. 전 세계 트랙 차트만 가져오기
  getGlobalTracks: async () => {
    const res = await api.get('/deezer/chart');
    return res.data;
  },

  // 2. 특정 장르의 트랙 차트만 가져오기
  getGenreTracks: async (genreId: string) => {
    const res = await api.get(`/deezer/chart`, { params: { genreId } });
    return res.data; // 필요한 tracks 데이터만 골라서 반환
  }
};

