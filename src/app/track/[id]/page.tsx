"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTabStore } from '@/store/tabStore';
import { useQuery } from '@tanstack/react-query';
import { getTrack } from '@/lib/api/track';
import { Track } from '@/types/deezer/deezer';

import Recent from '@/components/tracking/Recent';
import DetailHeader from '@/components/common/DetailHeader';
import ArtistBadge from '@/components/entities/artist/ui/ArtistBadge';
import SimilarTracks from '@/components/entities/track/container/SimilarTracks';
import TrackInfo from '@/components/entities/track/container/TrackInfo';
import TabsContainer from '@/components/common/TabsContainer';

import '@/styles/track/track.scss';
import '@/styles/entitiesUI/artistBadge.scss';

const Page = () => {
  const { id } = useParams() as { id: string };
  const { tabValue, setTabValue } = useTabStore();

  const { data: track, isLoading } = useQuery<Track>({
    queryKey: ['album', id],
    queryFn: () => getTrack(Number(id)),
    enabled: !!id,
  });

  // 탭 메뉴
  const tabs = [
    { label: '어떡할까?', content: <TrackInfo />},
    { label: '유사한 곡',content: <SimilarTracks id = {id}/>},
  ];

  useEffect(() => {
    setTabValue(0);
  }, [setTabValue]);
  
  console.log(track);

  if (isLoading) return <div>로딩중...</div>;
  if (!track) return <div>아티스트 없음</div>;

  return (
    <div className="track-detail">
      <Recent type="track" id={id} />
      <DetailHeader />
      <div className='track-header'>
        <div className='track-info'>
          <Link
            href={`/album/${track.album.id}`}
            className="track-album-name"
          >
            {track.album.title}
          </Link>
          <h2 className='track-name'>{track.title}</h2>
          <ArtistBadge contributors={track.contributors ?? []}/>
        </div>
        <div className='track-album-img'>
          <Image
          src={track.album.cover_medium ?? '/imgs/default.png'}
          alt={track.album.title}
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