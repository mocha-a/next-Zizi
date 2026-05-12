import { api } from '@/lib/api/axios';
import { RecentItem } from '@/types/recent';
import { CategoryType } from '@/types/deezer/search';

interface Props {
  type: CategoryType;
  id: string;
  isLoggedIn: boolean;
}

// 최근기록 추가
export const recent = async ({ type, id, isLoggedIn }: Props) => {
  const item: RecentItem = {
    type,
    id,
    viewedAt: Date.now(),
  };

  try {
    if (isLoggedIn) {
      await api.put('/recent-views', {
        targetId: id,
        type,
      });
    } else {
      const prev: RecentItem[] = JSON.parse(
        localStorage.getItem('recent') || '[]'
      );

      const updated = [
        item,
        ...prev.filter(
          (v) => !(v.type === type && v.id === id)
        ),
      ].slice(0, 20);

      localStorage.setItem( 'recent', JSON.stringify(updated));
    }
  } catch (error) {
    console.error(error);
  }
};