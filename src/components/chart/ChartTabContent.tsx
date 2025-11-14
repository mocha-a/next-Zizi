"use client";

import React, { useEffect, useState } from 'react'
import { Track } from '@/pages/api/lastfm/lastfm';
import { allTags } from '@/constants/chartTags';
import TagBtn from '@/components/common/TagBtn';
import TrackItem from '@/components/common/TrackItem';
import Check from '@/components/icons/Check';
import PlayBorder from '@/components/icons/PlayBorder';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

interface ChartTabContentProps {
    tabType: 'top' | 'genre' | 'mood';
}

function ChartTabContent({ tabType }: ChartTabContentProps) {
    const tagByenteredTab = allTags[tabType];

    const [selectedTag, setSelectedTag] = useState<string>('');
    const [topTracks, setTopTracks] = useState<Track[]>([]);

      // tabType이 바뀔 때마다 기본 태그 설정
    useEffect(() => {
        if (tabType === 'top') {
            setSelectedTag(allTags.top[0].toLowerCase()); // ex. 'GLOBAL' → 'global'
        } else {
            setSelectedTag(allTags[tabType][0].eng); // genre나 mood일 경우 첫 번째 eng 값
        }
    }, [tabType]);
    
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
      <div className='chart-tagbtn-box'>
        <Swiper
          modules={[FreeMode]}
          slidesPerView={'auto'}
          freeMode={true}
        >
          {tabType === 'top' ? (
              (tagByenteredTab as string[]).map((tag) => (
                  <SwiperSlide key={tag}>
                    <button onClick={() => {setSelectedTag(tag)}}>
                        <TagBtn tagbtn={tag} className='chart-tagbtn'/>
                    </button>
                  </SwiperSlide>
              ))
          ) : (
              (tagByenteredTab as { kor: string, eng: string }[]).map((tag) => (
                  <SwiperSlide key={tag.kor}>
                    <button onClick={() => {setSelectedTag(tag.eng)}}>
                        <TagBtn tagbtn={tag.kor} className='chart-tagbtn'/>
                    </button>
                  </SwiperSlide>
              ))
          )}
        </Swiper>
      </div>

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