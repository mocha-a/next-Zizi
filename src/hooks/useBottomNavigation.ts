'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

const NAV_ITEMS = [
  {
    path: '/',
    match: (p: string) => p === '/',
  },
  {
    path: '/chart',
    match: (p: string) => p.startsWith('/chart'),
  },
  {
    path: '/search',
    match: (p: string) =>
      ['/search', '/album', '/artist', '/track', '/playlist']
        .some((prefix) => p.startsWith(prefix)),
  },
  {
    path: '/mypage',
    match: (p: string) => p.startsWith('/mypage'),
  },
];

export const useBottomNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  // 현재 경로 → index 변환
  const value = useMemo(() => {
    const index = NAV_ITEMS.findIndex(({ match }) => match(pathname));
    return index === -1 ? 0 : index;
  }, [pathname]);

  // 클릭 시 라우팅
  const onChange = (_: React.SyntheticEvent, newValue: number) => {
    const targetPath = NAV_ITEMS[newValue]?.path;
    if (targetPath && targetPath !== pathname) {
      router.push(targetPath);
    }
  };

  return {
    value,
    onChange,
  };
};