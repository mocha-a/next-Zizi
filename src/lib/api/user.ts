import { api } from "./axios";

export const updateLastVisited = async () => {
  const res = await api.patch('/user/visit');

  return res.data;
};