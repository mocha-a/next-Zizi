"use client";

import React, { useEffect, useState } from 'react'
import { Track } from '@/pages/api/lastfm/lastfm';
import PageTitle from '@/components/common/PageTitle'
import TagBtn from '@/components/common/TagBtn'
import TrackItem from '@/components/common/TrackItem';
import Footer from '@/components/common/Footer';
import Check from '@/components/icons/Check';
import PlayBorder from '@/components/icons/PlayBorder';

import '../../styles/chart/chart.scss';

type Album = {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
  artists: {
    name: string;
  }[];
};

interface MoodTag {
  kor: string;
  eng: string;
}

function page() {
  const topTags = ['GLOBAL', 'K-POP', 'J-POP', 'POP'];
  const moodTags: MoodTag[] = [
    {
      kor: '여유로운',
      eng: 'Chill'
    },
    {
      kor: '집중',
      eng: 'Focus'
    },
    {
      kor: '수면',
      eng: 'Sleep'
    },
    {
      kor: '파티',
      eng: 'Party'
    },
    {
      kor: '사랑',
      eng: 'Love'
    },
    {
      kor: '새해',
      eng: "New Year's"
    },
    {
      kor: '여행',
      eng: 'Travel'
    }
  ];

  const [mood, setMood] = useState<string[]>([]);
  const [genre, setGenre] = useState<string[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [moodTracks, setMoodTracks] = useState<Album[]>();
  
  useEffect(() => {
    fetch('/api/lastfm/lastfm')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch tracks');
        return res.json();
      })
      .then(data => setTopTracks(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch('/api/spotify/spotify-mood-tracks')
      .then(res => res.json())
      .then(data => {
        const filteredMoods = data?.categoryRes?.items?.filter((cat: any) =>
          moodTags.some(tag => tag.eng === cat.name)
        );

        setMood(filteredMoods);
      })
      .catch(console.error);
  }, []);

  // console.log(mood);

  // useEffect(() => {
  //   fetch(`/api/spotify/spotify-mood-tracks?mood=${mood}`)
  //     .then(res => {
  //       if (!res.ok) throw new Error('Failed to fetch mood tracks');
  //       return res.json();
  //     })
  //     .then(data => setMoodTracks(data.albums.items))
  //     .catch(err => console.error(err))
  // }, []);
  
  return (
    <div className='chart-container'>
      <PageTitle text='차트'/>

      <div className='chart-tagbtn-box'>
        {/* {
          topTags.map((tag, i) => (
            <button
              key={i}                                                                         onClick={() => {
                const filtered = topTracks.
              }}
            >
              <TagBtn tagbtn={tag} className='chart-tagbtn'/>
            </button>
          ))
        } */}
        {
          moodTags?.map((tag, i) => (
            <button 
              key={i}
              onClick={() => setMood([tag.eng])} // 클릭한 무드만 배열로 저장
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