"use client";

import React, { useEffect, useState } from 'react'
import { Track } from '@/pages/api/lastfm/lastfm';
import { allTags } from '@/constants/chartTags';
import TrackItem from '@/components/common/TrackItem';
import Check from '@/components/icons/Check';
import PlayBorder from '@/components/icons/PlayBorder';
import ChartTagSwiper from './ChartTagSwiper';

interface ChartTabContentProps {
    tabType: 'top' | 'genre' | 'mood';
}

function ChartTabContent({ tabType }: ChartTabContentProps) {
    const tagByenteredTab = allTags[tabType];

    const [selectedTag, setSelectedTag] = useState<string>(
      tabType === 'top'
        ? allTags.top[0]
        : allTags[tabType][0].eng
    );
    
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    
    // selectedTag가 바뀔 때마다 데이터 fetch
    useEffect(() => {
        if (!selectedTag) return; // 초기화 시 빈 값 방지

        fetch(`/api/lastfm/lastfm?tag=${selectedTag}`)
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch tracks');
            return res.json();
        })
        .then(data => setTopTracks(data))
        .catch(err => console.error(err));
    }, [selectedTag]);

  return (
    <>
      <ChartTagSwiper tabType={tabType} tagList={tagByenteredTab} selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>

      <div className='chart-topmenu-box'>
        <div>
          <Check className='chart-icon-check'/>
          <p>전체선택</p>
        </div>
        <div>
          <PlayBorder className='chart-icon-play'/>
          <p>전체듣기</p>
        </div>
      </div>

      <ul className='tracklist'>
        {topTracks.slice(0, 50).map((top, i) => (
          <TrackItem key={i} trackData={top} index={i} page="chart"/>
        ))}
      </ul>
    </>
  )
}

export default ChartTabContent