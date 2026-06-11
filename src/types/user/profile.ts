export interface UserProfile {
  id: string;
  name: string | null;
  nickname: string | null;
  email: string | null;
  image: string | null;
  birth: string | null;
  gender: string | null;
  createdAt: string;
  lastVisitedAt: string | null;
}

export interface JoinData {
  name: string;
  username: string;
  password: string;
  email: string;
  nickname?: string;
  birth?: string;
  gender?: string;
}

export const GENDER_OPTIONS = [
  { label: '여성', value: 'female' },
  { label: '남성', value: 'male' },
  { label: '기타', value: 'etc' },
] as const;