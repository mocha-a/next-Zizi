'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSelectedTrackStore } from '@/store/useSelectedTrackStore';
import { useInfiniteList } from '@/hooks/useInfiniteList';
import { SearchTrack } from '@/types/deezer/search';
import { typeSearch } from '@/lib/api/serach';
import Back from '@/components/icons/Back'
import SearchBar from '@/components/search/ui/SearchBar';
import TrackSelectList from '@/components/entities/track/ui/TrackSelectList';
import RecentContent from '@/components/myPage/recent/RecentContent';

import '@/styles/playlist/NewPlaylist.scss';

const LIMIT = 50;

const Page = () => {
  const { tracks } = useSelectedTrackStore();
  const [ query, setQuery ] = useState('');

  const router = useRouter();
  console.log(tracks)
  const {
    list: track,
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
    <div className="add-track new-playlist-page">
      <div className="new-playlist-header">
        <div className='new-playlist-back'><Back /></div>
        <p className='sub-title'>곡 추가하기</p>
        <button className='add-track-btn submit' onClick={() => router.back()}>
          ({track.length}) 완료
        </button>
      </div>
      <SearchBar placeholder="한 곡 담아볼까? –♡" onSearch={(q) => setQuery(q)}/>

      {query ? (
        // 검색했을 때
        <TrackSelectList
          tracks={track}
          loading={isLoading || isFetchingNextPage}
          hasMore={hasNextPage}
          onLoadMore={loadMore}
        />
      ) : (
        <>
          <h3>최근 기록</h3>
          <RecentContent type="track" variant="select" />
        </>
      )}
    </div>
  )
}

export default Page