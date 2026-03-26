'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTabStore } from '@/store/tabStore';

import TabsContainer from '@/components/common/TabsContainer';
import DetailHeader from '@/components/common/DetailHeader';
import ArtistAlbums from '@/components/entities/artist/container/ArtistAlbums';
import ArtistTracks from '@/components/entities/artist/container/ArtistTrack';
import { useQuery } from '@tanstack/react-query';
import { getArtist } from '@/lib/api/artist';

import { mapGenres } from '@/types/deezer/search';

import '@/styles/artist/artist.scss';

const Page = () => {
  // URL에서 아티스트 id 추출
  const { id } = useParams() as { id: string };

  // 탭 상태
  const { tabValue, setTabValue } = useTabStore();

  const { data: artist, isLoading } = useQuery({
    queryKey: ['artist', id],
    queryFn: () => getArtist(Number(id)),
    enabled: !!id,
  });

  // 발매곡 수
  const [ trackCount, setTrackCount ] = useState<number | null>(null);
  const [ loadingTracks, setLoadingTracks ] = useState(false);

  // 탭 정의
  const tabs = [
    { label: '인기곡', content: <ArtistTracks id={id} /> },
    { label: '앨범', content: <ArtistAlbums id={id} artist={artist}/> },
  ];

  useEffect(() => {
    setTabValue(0);
  }, [setTabValue]);

  console.log(artist)

  if (isLoading) return <div>로딩중...</div>;
  if (!artist) return <div>아티스트 없음</div>;

  return (
    <div className="artist-detail">
      <section className="artist-top">
        <div className="artist-img">
          <Image
            src={artist.picture_xl ?? '/imgs/default-artist.png'}
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
          <p className="artist-genres">{mapGenres(artist.genres)}</p>
          <p className="artist-tracks">
            총 {loadingTracks ? '로딩중...' : trackCount ?? 0}곡
          </p>
          <p className="artist-followers">
            팔로워 {artist.nb_fan}명
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