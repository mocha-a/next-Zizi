"use client";

import React, { useEffect, useState } from 'react'
import { Track } from '@/pages/api/lastfm/lastfm';
import PageTitle from '@/components/common/PageTitle'
import TagBtn from '@/components/common/TagBtn'
import TrackItem from '@/components/common/TrackItem';
import Footer from '@/components/common/Footer';
import Check from '@/components/icons/Check';
import PlayBorder from '@/components/icons/PlayBorder';
import { useTabStore } from '@/store/tabStore';
import TabsContainer from '@/components/common/TabsContainer';

import '../../styles/chart/chart.scss';

function page() {

  const topTags = ['GLOBAL', 'K-POP', 'J-POP', 'POP'];
  const genreTags = [
    {
      kor: 'POP',
      eng: 'pop'
    },
    {
      kor: 'K-POP',
      eng: 'k-pop'
    },
    {
      kor: '댄스',
      eng: 'dance'
    },
    {
      kor: '락',
      eng: 'rock'
    },
    {
      kor: '인디',
      eng: 'Indie'
    },
    {
      kor: '재즈',
      eng: "Jazz"
    },
    {
      kor: '알앤비',
      eng: 'r&b'
    },
    {
      kor: '힙합',
      eng: 'hip-hop'
    },
    {
      kor: '클래식',
      eng: 'classical'
    }
  ];
  const moodTags = [
    {
      kor: '여유로운',
      eng: 'chill'
    },
    {
      kor: '행복한',
      eng: 'happy'
    },
    {
      kor: '수면',
      eng: 'sleep'
    },
    {
      kor: '공부',
      eng: 'study'
    },
    {
      kor: '사랑',
      eng: 'love'
    },
    {
      kor: '슬픈',
      eng: "sad"
    },
    {
      kor: '운동',
      eng: 'workout'
    },
    {
      kor: '드라이브',
      eng: 'driving'
    },
    {
      kor: '어두운',
      eng: 'dark'
    },
    {
      kor: '휴식',
      eng: "relaxing"
    }
  ];

  const [selectedTag, setSelectedTag] = useState<string>('k-pop');
  const [topTracks, setTopTracks] = useState<Track[]>([]);
      
  const tabs = [
    { label: '인기차트', content: topTracks },
    { label: '장르별', content: topTracks },
    { label: '무드별', content: topTracks },
  ];
  
  useEffect(() => {
    fetch(`/api/lastfm/lastfm?tag=${selectedTag}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch tracks');
        return res.json();
      })
      .then(data => setTopTracks(data))
      .catch(err => console.error(err));
  }, [selectedTag]);
  
  return (
    <div className='chart-container'>
      <PageTitle text='차트'/>
      
      
      
      <div className='chart-tagbtn-box'>
        {
          topTags.map((tag, i) => (
            <button
              key={i}
              onClick={() => {setSelectedTag(tag)}}
            >
              <TagBtn tagbtn={tag} className='chart-tagbtn'/>
            </button>
          ))
        }
        {
          genreTags?.map((tag, i) => (
            <button 
              key={i}
              onClick={() => setSelectedTag(tag.eng)}
            >
              <TagBtn tagbtn={tag.kor} className='chart-tagbtn'/>
            </button>
          ))
        }
        {
          moodTags?.map((tag, i) => (
            <button 
              key={i}
              onClick={() => setSelectedTag(tag.eng)}
            >
              <TagBtn tagbtn={tag.kor} className='chart-tagbtn'/>
            </button>
          ))
        }
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

      <div className='chart-footer'>
        <Footer/>
      </div>
    </div>
  )
}

export default page