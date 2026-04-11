import { useInfiniteQuery } from '@tanstack/react-query';

interface Props<T> {
  queryKey: unknown[];
  queryFn: (pageParam: number) => Promise<{ items: T[] }>;
  limit: number;
  enabled?: boolean;
}

export function useInfiniteList<T>({
  queryKey,
  queryFn,
  limit,
  enabled = true,
}: Props<T>) {
  // React Query의 useInfiniteQuery 사용
  const {
    data,               // 서버에서 받아온 페이지별 데이터
    fetchNextPage,      // 다음 페이지 불러오는 함수
    hasNextPage,        // 다음 페이지가 있는지 여부
    isFetchingNextPage, // 다음 페이지 로딩 중 여부
    isLoading,          // 전체 첫 로딩 여부
  } = useInfiniteQuery({
    queryKey,

    // pageParam은 React Query가 자동으로 넣어줌, 기본값 0
    queryFn: ({ pageParam = 0 }) => queryFn(pageParam),

    initialPageParam: 0,

    // 다음 페이지 계산 함수
    getNextPageParam: (lastPage, allPages) => {
      const items = lastPage.items ?? [];
      if (items.length < limit) return undefined;
      return allPages.length * limit;
    },

    enabled,
  });

  // pages 배열을 하나의 리스트로 평탄화
  // data.pages = [{ items: [...] }, { items: [...] }, ...]
  const list =
    data?.pages.flatMap((page) => page.items ?? []) ?? [];

  // loadMore: 다음 페이지 불러오기
  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    list,
    loadMore,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  };
}