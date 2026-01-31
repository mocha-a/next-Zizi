'use client';

import { useEffect, useState } from 'react';
import { typeSearch } from '@/lib/search';
import { useSearchStore } from '@/store/searchStore';

import Tracks from '@/components/entities/track/ui/TrackList';
import { Track } from '@/types/spotify';

const LIMIT = 50;

const SearchTracks = () => {
  const { searchQuery } = useSearchStore(); // 검색어만 전역에서 사용

  const [ tracks, setTracks ] = useState<Track[]>([]); // 트랙 목록
  const [ offset, setOffset ] = useState(0); // 페이지네이션 offset
  const [ hasMore, setHasMore ] = useState(true); // 더 불러올 데이터 여부
  const [ loading, setLoading ] = useState(false); // 로딩 상태

  useEffect(() => {
    if (!searchQuery) return;

    const fetchInitial = async () => {
      setLoading(true);
      const data = await typeSearch(searchQuery, 'track', LIMIT, 0);
      const items = data.tracks?.items ?? [];

      setTracks(items);
      setOffset(items.length);
      setHasMore(items.length === LIMIT);
      setLoading(false);
    };

    fetchInitial();
  }, [searchQuery]);

  const loadMore = async () => {
    if (!searchQuery || loading || !hasMore) return;

    setLoading(true);
    const data = await typeSearch(searchQuery, 'track', LIMIT, offset);
    const items = data.tracks?.items ?? [];

    setTracks((prev) => [...prev, ...items]);
    setOffset((prev) => prev + items.length);
    setHasMore(items.length === LIMIT);
    setLoading(false);
  };

  return (
    <Tracks
      tracks={tracks}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={loadMore}
    />
  );
};

export default SearchTracks;