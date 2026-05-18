import React, { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  children: React.ReactNode;
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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;
    if (!lastRef.current) return;

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        loadMore();
      }
    });

    observerRef.current.observe(lastRef.current);

    return () => observerRef.current?.disconnect();
  }, [loading, hasMore, loadMore]);

  return (
    <>
      {children}

      {/* 👇 이게 핵심 (grid 영향 안 받음) */}
      {hasMore && <div ref={lastRef} />}
    </>
  );
};

export default InfiniteScroll;