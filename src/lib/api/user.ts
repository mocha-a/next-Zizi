import { api } from "./axios";

// 마지막 접속 업데이트
export const updateLastVisited = async () => {
  const res = await api.patch('/user/visit');

  return res.data;
};