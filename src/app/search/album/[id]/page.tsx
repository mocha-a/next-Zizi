"use client";
import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import DetailHeader from '@/components/common/DetailHeader';
import TabsContainer from '@/components/common/TabsContainer';
import StarRating from '@/components/search/StarRating';
import AlbumInfo from '@/components/entities/album/container/AlbumInfo';
import AlbumTrack from '@/components/entities/album/container/AlbumTrack';
import ArtistBadge from '@/components/entities/artist/ui/ArtistBadge';
import { useTabStore } from '@/store/tabStore';

import '@/styles/album/album.scss';
import '@/styles/entitiesUI/ArtistBadge.scss';
import { getAlbum } from '@/lib/api/album';
import { useQuery } from '@tanstack/react-query';

const Page = () => {
  const { id } = useParams() as { id: string };
  const { tabValue, setTabValue } = useTabStore();

  const { data: album, isLoading } = useQuery({
    queryKey: ['album', id],
    queryFn: () => getAlbum(Number(id)),
    enabled: !!id,
  });

  // 탭 메뉴
  const tabs = [
    { label: '수록곡', content: <AlbumTrack album={album} /> },
    { label: '상세정보', content: <AlbumInfo album={album} /> },
  ];

  console.log(album);
  if (isLoading) return <div>로딩중...</div>;
  if (!album) return <div>아티스트 없음</div>;

  return (
    <div className="album-detail">
      <DetailHeader />
      <div className='album-img'>
        <Image
          src={album.cover_medium ?? '/imgs/default-artist.png'}
          alt={album.name}
          width={200}
          height={200}
        />
      </div>
      {/* <StarRating popularity={album.popularity} /> */}
      <h2>{album.title}</h2>
      <div className='album-release'>
        <span>{album.release_date.replace(/-/g, ".")}</span>
        <span>{album.record_type}</span>
      </div>
      <div className='album-artist'>
        <ArtistBadge contributors={album.contributors}/>
      </div>
      <TabsContainer
        tabs={tabs}
        tabValue={tabValue}
        setTabValue={setTabValue}
        fullWidth
        width
      />
    </div>
  );
};

export default Page;
