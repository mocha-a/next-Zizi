import { api } from "./axios";

export const getNewRelease = async () => { 
  const res = await api.get('/deezer/new');

  return res.data;
};