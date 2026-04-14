'use client';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '@/lib/api/axios';
import { RecentItem } from '@/types/recent';
import { CategoryType } from '@/types/deezer/search';

interface Props{
  type: CategoryType;
  id: string;
};

const Recent = ({ type, id }: Props) => {
  const { data: session } = useSession();

  useEffect(() => {
    // localStorage는 시간 자동 처리 안되니까 viewedAt 직접 넣어줌
    // DB는 @updatedAt으로 자동 갱신되므로 서버 전송 시 필요 없음
    const item: RecentItem = {
      type,
      id,
      viewedAt: Date.now(),
    };

    if (session) {
      api.put('/recent-views', {targetId: id, type}).catch(console.error);
    } else {
      const prev: RecentItem[] = JSON.parse(
        localStorage.getItem('recent') || '[]'
      );

      const updated = [
        item,
        ...prev.filter((v) => !(v.type === type && v.id === id)),
      ].slice(0, 20);

      localStorage.setItem('recent', JSON.stringify(updated));
    }
  }, [id, session, type]);

  return null;
}

export default Recent;