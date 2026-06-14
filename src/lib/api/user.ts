import { JoinData } from "@/types/user/profile";
import { api } from "./axios";

// 마지막 접속 업데이트
export const updateLastVisited = async () => {
  const res = await api.patch('/user/visit');

  return res.data;
};

// 회원가입
export const join = async (data: JoinData) => {
  const res = await api.post('/auth/join', data);

  return res.data;
};

// 회원탈퇴
export const deleteUser = async () => {
  const res = await api.delete('/user');

  return res.data;
};