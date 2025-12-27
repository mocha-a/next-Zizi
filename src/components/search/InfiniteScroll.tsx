'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { useSearchStore } from '@/store/searchStore';

interface InfiniteScrollProps {
  type: 'artist' | 'album' | 'track' | 'playlist';
  children: React.ReactNode;
}

const InfiniteScroll = ({ type, children }: InfiniteScrollProps) => {
  const { fetchSectionIfNeeded, fetchMore, 
          artistResults, albumResults, trackResults, playlistResults,
          hasMoreArtists, hasMoreAlbums, hasMoreTracks, hasMorePlaylists } = useSearchStore();

  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const results = {
    artist: artistResults,
    album: albumResults,
    track: trackResults,
    playlist: playlistResults
  }[type];

  const hasMore = {
    artist: hasMoreArtists,
    album: hasMoreAlbums,
    track: hasMoreTracks,
    playlist: hasMorePlaylists
  }[type];

  useEffect(() => {
    fetchSectionIfNeeded(type);
  }, [type]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    console.log('스크롤 감지!', target.isIntersecting); // 여기에 찍기
    console.log(target.isIntersecting && hasMore);
    if (target.isIntersecting && hasMore) {
      console.log('바닥 도달, fetchMore 호출'); // 여기에 찍어도 좋아
      fetchMore(type);
    }
  }, [hasMore, type]);


  useEffect(() => {
    if (!loadMoreRef.current) return;
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });
    observer.current.observe(loadMoreRef.current);

    return () => {
      if (observer.current && loadMoreRef.current) {
        observer.current.unobserve(loadMoreRef.current);
      }
    };
  }, [handleObserver]);

  if (!results) return <div>로딩 중...</div>;

  return (
    <>
      {children}
      <div ref={loadMoreRef} /> {/* 스크롤 바닥 감지용 */}
    </>
  );
};

export default InfiniteScroll;
