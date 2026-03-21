// TanStack Query의 중앙 캐시 관리자
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,    // 5분 동안 fresh
      retry: 1,                    // 실패 시 1번 재시도
      refetchOnWindowFocus: false, // 탭 이동 시 재요청 방지
    },
  },
});