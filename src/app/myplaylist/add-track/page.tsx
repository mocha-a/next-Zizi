'use client';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useTrackStore } from '@/store/useSelectedTrackStore';
import { useInfiniteList } from '@/hooks/useInfiniteList';
import { SearchTrack } from '@/types/deezer/search';
import { typeSearch } from '@/lib/api/serach';
import Back from '@/components/icons/Back'
import TabsContainer from '@/components/common/TabsContainer';
import SearchBar from '@/components/search/ui/SearchBar';
import TrackSelectList from '@/components/entities/track/ui/TrackSelectList';
import Recommendation from '@/components/entities/track/container/Recommendation';
import RecentContent from '@/components/myPage/recent/RecentContent';

import '@/styles/myPlaylist/newPlaylist.scss';

const LIMIT = 50;

const Page = () => {
  const [ query, setQuery ] = useState('');
  const [ tabValue, setTabValue ] = useState(0);
  
  const addSelectedToPlaylist = useTrackStore(state => state.addSelectedToPlaylist);
  const selectedIds = useTrackStore(state => state.selectedIds);
  const router = useRouter();

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

    // 탭 메뉴
  const tabs = [
    { label: '최근 기록', content: <RecentContent type="track" variant="select" /> },
    { label: 'Zizi 추천', content: <Recommendation  /> },
  ];

  return (
    <div className="add-track new-playlist-page">
      <div className="new-playlist-header">
        <div className='new-playlist-back'><Back /></div>
        <p className='sub-title'>곡 추가하기</p>
        <button className='add-track-btn submit'
          onClick={() => {
          addSelectedToPlaylist();
          router.back();
        }}
        >
          ({selectedIds.length}) 완료
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
          <TabsContainer
            tabs={tabs}
            tabValue={tabValue}
            setTabValue={setTabValue}
            fullWidth
            width
          />
        </>
      )}
    </div>
  )
}

export default Page