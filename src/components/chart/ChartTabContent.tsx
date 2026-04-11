"use client";

import React, { useState } from 'react'
// import { Track } from '@/pages/api/lastfm/lastfm';
import { allTags } from '@/constants/chartTags';
import TrackItem from '@/components/common/TrackItem';
import Check from '@/components/icons/Check';
import PlayBorder from '@/components/icons/PlayBorder';
import ChartTagSwiper from './ChartTagSwiper';
import { IconButton } from '../common/IconButton';
import { useQuery } from '@tanstack/react-query';
import { Track } from '@/types/deezer/deezer';
import { getChart } from '@/lib/api/chart';

interface ChartTabContentProps {
    tabType: 'top' | 'genre';
}

function ChartTabContent({ tabType }: ChartTabContentProps) {
    const [selectedTag, setSelectedTag] = useState<string>(
      tabType === 'top' ? '0' : allTags.genre[0].id);

    const { data: chartData, isLoading, error } = useQuery<any, Error>({
      queryKey: ['chart', selectedTag],
      queryFn: () => {
        // 탭 타입에 따라 다른 API 호출
        if (tabType === 'top') return getChart.getGlobalTracks();
        return getChart.getGenreTracks(selectedTag);
      },
      staleTime: 1000 * 60 * 30,
    });
  
    if (isLoading) return <div>로딩중...</div>;
    if (error) return <div>데이터 로딩 실패</div>;
    
    // selectedTag가 바뀔 때마다 데이터 fetch
    // useEffect(() => {
    //     if (!selectedTag) return; // 초기화 시 빈 값 방지

    //     fetch(`/api/lastfm/lastfm?tag=${selectedTag}`)
    //     .then(res => {
    //         if (!res.ok) throw new Error('Failed to fetch tracks');
    //         return res.json();
    //     })
    //     .then(data => setTopTracks(data))
    //     .catch(err => console.error(err));
    // }, [selectedTag]);

  return (
    <>
      {tabType === 'genre' && (
        <ChartTagSwiper tagList={allTags.genre} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>
      )}

      <div className='chart-topmenu-box'>
        <IconButton
          icon={<Check className="chart-icon-check"/>}
          text="전체선택"
        />
        <IconButton
          icon={<PlayBorder className='chart-icon-play'/>}
          text="전체듣기"
        />
      </div>

      <ul className='tracklist'>
        {chartData?.data?.map((track: Track, i: number) => (
            <TrackItem key={track.id || i} 
              track={track}
              index={i}
              page="chart"
            />
        ))}
      </ul>
    </>
  )
}

export default ChartTabContent