"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Track } from '@/types/spotify';
import { useParams } from 'next/navigation';
import { useTabStore } from '@/store/tabStore';
import DetailHeader from '@/components/common/DetailHeader';
import ArtistBadge from '@/components/entities/artist/ui/ArtistBadge';
import TrackInfo from '@/components/entities/track/container/TrackInfo';
import TabsContainer from '@/components/common/TabsContainer';

import '@/styles/track/track.scss';
import '@/styles/entitiesUI/ArtistBadge.scss';

const Page = () => {
  const { id } = useParams() as { id: string };
  const [ track, setTrack ] = useState<Track | null>(null);
  const { tabValue, setTabValue } = useTabStore();

  const fetchTrackDetail = async (id: string): Promise<Track> => {
    const res = await fetch(`/api/spotify/track/${id}`);
    if (!res.ok) throw new Error('트랙 조회 실패');
    return res.json();
  };

  // 탭 메뉴
  const tabs = [
    { label: '어떡할까?', content: <TrackInfo />},
    { label: '어떡하지?',content: <TrackInfo />},
  ];

  useEffect(() => {
    if (!id) return;

    // 탭 초기화
    setTabValue(0);

    fetchTrackDetail(id)
      .then(setTrack)
      .catch(console.error);
  }, [id, setTabValue]);
  
  console.log(track);

    if (!track) {
    return <div>로딩중...</div>;
  }

  return (
    <div className="track-detail">
      <DetailHeader />
      <div className='track-header'>
        <div className='track-info'>
          <Link
            href={`/search/album/${track.album.id}`}
            className="track-album-name"
          >
            {track.album.name}
          </Link>
          <h2 className='track-name'>{track.name}</h2>
          <ArtistBadge artists={track.artists}/>
        </div>
        <div className='track-album-img'>
          <Image
          src={track.album.images?.[0]?.url ?? '/imgs/default-artist.png'}
          alt={track.album.name}
          width={123}
          height={123}
          />
        </div>
      </div>

      <TabsContainer
        tabs={tabs}
        tabValue={tabValue}
        setTabValue={setTabValue}
        fullWidth
        width
      />
    </div>
  )
}

export default Page