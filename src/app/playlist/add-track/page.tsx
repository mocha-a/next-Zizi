'use client';
import React, { useState } from 'react'
import { useInfiniteList } from '@/hooks/useInfiniteList';
import { SearchTrack } from '@/types/deezer/search';
import { typeSearch } from '@/lib/api/serach';
import Back from '@/components/icons/Back'
import SearchBar from '@/components/search/ui/SearchBar';
import TrackSelectList from '@/components/entities/track/ui/TrackSelectList';

import '@/styles/playlist/NewPlaylist.scss';


const LIMIT = 50;

const Page = () => {
  const [query, setQuery] = useState('');

  const {
    list: tracks,
    loadMore,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteList<SearchTrack>({
    queryKey: ['search', 'track', query],
    queryFn: (page) =>
      typeSearch(query, 'track', LIMIT, page),
    limit: LIMIT,
    enabled: !!query,
  });

  return (
    // TODO: 곡 선택 상태 관리 + 완료 버튼 연결 하자
    <div className="add-track new-playlist-page">
      <div className="new-playlist-header">
        <Back />
        <p className='sub-title'>곡 추가하기</p>
        <button className='sub-title'>완료</button>
      </div>
      <SearchBar placeholder="한 곡 담아볼까? –♡" onSearch={(q) => setQuery(q)}/>

      <TrackSelectList
        tracks={tracks}
        loading={isLoading || isFetchingNextPage}
        hasMore={hasNextPage}
        onLoadMore={loadMore}
      />
    </div>
  )
}

export default Page