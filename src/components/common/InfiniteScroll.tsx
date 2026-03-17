import React, { useEffect, useRef } from 'react';

/*
  InfiniteScroll 컴포넌트 props
  - children : 렌더링할 리스트 아이템들
  - loadMore : 마지막 아이템 노출 시 다음 데이터 요청 함수
  - loading  : 현재 데이터 로딩 중 여부 (중복 호출 방지)
  - hasMore  : 더 불러올 데이터가 있는지 여부 (마지막 페이지 방어)
 */
interface InfiniteScrollProps {
  children: React.ReactNode[];
  loadMore: () => void;
  loading: boolean;
  hasMore: boolean;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  loadMore,
  loading,
  hasMore,
}) => {
  /*
    IntersectionObserver 인스턴스를 저장
    - 컴포넌트가 다시 렌더링되어도 observer 유지
    - cleanup 시 disconnect 하기 위함
   */
  const observerRef = useRef<IntersectionObserver | null>(null);

  /*
    리스트의 "마지막 아이템" DOM 참조
    - 이 요소가 화면에 보이면 loadMore 트리거
   */
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  /*
    무한 스크롤 핵심 로직
    - 마지막 아이템이 화면에 들어오면 다음 데이터 요청
   */
  useEffect(() => {
    // 마지막 아이템이 없거나, 더 불러올 데이터가 없으면 observer 생성 안 함
    if (!lastItemRef.current || !hasMore) return;

    // IntersectionObserver 생성
    observerRef.current = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];

      // 마지막 아이템이 보이고
      // 현재 로딩 중이 아니며
      // 더 불러올 데이터가 있을 때만 loadMore 호출
      if (firstEntry.isIntersecting && !loading && hasMore) {
        loadMore();
      }
    });

    // 마지막 아이템 관찰 시작
    observerRef.current.observe(lastItemRef.current);

    // 컴포넌트 언마운트 또는 의존성 변경 시 observer 정리
    return () => observerRef.current?.disconnect();
  }, [children, loading, hasMore, loadMore]);

  return (
    <>
      {/* 리스트 렌더링 */}
      {children.map((child, index) => {
        // 현재 아이템이 마지막인지 판별
        const isLast = index === children.length - 1;

        return (
          <div
            key={index}
            // 마지막 아이템 + 더 불러올 데이터가 있을 때만 ref 연결
            ref={isLast && hasMore ? lastItemRef : null}
          >
            {child}
          </div>
        );
      })}

      {/* 로딩 중 표시 (마지막 페이지에서는 숨김) */}
      {loading && hasMore && (
        <div style={{ textAlign: 'center', padding: 10 }}>
          Loading...
        </div>
      )}
    </>
  );
};

export default InfiniteScroll;
