'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTabStore } from '@/store/tabStore';
import { useQuery } from '@tanstack/react-query';
import { getArtist } from '@/lib/api/artist';
import { Artist } from '@/types/deezer/deezer';

import Recent from '@/components/tracking/Recent';
import TabsContainer from '@/components/common/TabsContainer';
import DetailHeader from '@/components/common/DetailHeader';
import ArtistAlbums from '@/components/entities/artist/container/ArtistAlbums';
import ArtistTracks from '@/components/entities/artist/container/ArtistTrack';

import '@/styles/artist/artist.scss';

const Page = () => {
  // URL에서 아티스트 id 추출
  const { id } = useParams() as { id: string };

  // 탭 상태
  const { tabValue, setTabValue } = useTabStore();

  const { data: artist, isLoading } = useQuery<Artist>({
    queryKey: ['artist', id],
    queryFn: () => getArtist(Number(id)),
    enabled: !!id,
  });

  // 탭 정의
  const tabs = [
    { label: '앨범', content: <ArtistAlbums id={id} artist={artist}/> },
    { label: '인기곡', content: <ArtistTracks id={id} /> }
  ];

  useEffect(() => {
    setTabValue(0);
  }, [setTabValue]);

  if (isLoading) return <div>로딩중...</div>;
  if (!artist) return <div>아티스트 없음</div>;

  return (
    <div className="artist-detail">
      <Recent type="artist" id={id} />
      <section className="artist-top">
        <div className="artist-img">
          <Image
            src={artist.picture_xl ?? '/imgs/default.png'}
            alt={artist?.name || 'artist image'}
            fill
            style={{ objectFit: 'cover' }}
          />

          <div className="artist-backBtn">
            <DetailHeader />
          </div>

          <h1 className="artist-name">{artist.name}</h1>
        </div>

        <div className="artist-info">
          <p className="artist-nb_album">
            {artist.nb_album.toLocaleString()}장의 앨범 발매
          </p>
          <p className="artist-followers">
            {artist.nb_fan.toLocaleString()}명이 밤새 덕질 중...zZ
          </p>
        </div>
      </section>

      <div className="artist-down">
        <TabsContainer
          tabs={tabs}
          tabValue={tabValue}
          setTabValue={setTabValue}
          fullWidth
          width
        />
      </div>
    </div>
  );
};

export default Page;