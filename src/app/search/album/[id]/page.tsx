"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import DetailHeader from '@/components/common/DetailHeader';
import TabsContainer from '@/components/common/TabsContainer';
import StarRating from '@/components/search/StarRating';
import AlbumInfo from '@/components/entities/album/container/AlbumInfo';
import AlbumTrack from '@/components/entities/album/container/AlbumTrack';
import ArtistBadge from '@/components/entities/artist/ui/ArtistBadge';
import { useTabStore } from '@/store/tabStore';
import { Album } from '@/types/spotify';

import '@/styles/album/album.scss';
import '@/styles/entitiesUI/ArtistBadge.scss';

const Page = () => {
  const { id } = useParams() as { id: string };
  const [ album, setAlbum ] = useState<Album | null>(null);
  const { tabValue, setTabValue } = useTabStore();

  const fetchAlbumDetail = async (id: string): Promise<Album> => {
    const res = await fetch(`/api/spotify/album/${id}`);
    if (!res.ok) throw new Error('앨범 조회 실패');
    return res.json();
  };

  // 탭 메뉴
  const tabs = [
    { label: '수록곡', content: <AlbumTrack album={album} /> },
    { label: '상세정보', content: <AlbumInfo /> },
  ];

  useEffect(() => {
    if (!id) return;

    // 탭 초기화
    setTabValue(0);

    fetchAlbumDetail(id)
      .then(setAlbum)
      .catch(console.error);
  }, [id, setTabValue]);

  if (!album) {
    return <div>로딩중...</div>;
  }

  console.log(album);

  return (
    <div className="album-detail">
      <DetailHeader />
      <div className='album-img'>
        <Image
          src={album.images?.[0]?.url ?? '/imgs/default-artist.png'}
          alt={album.name}
          width={200}
          height={200}
        />
      </div>
      <StarRating popularity={album.popularity} />
      <h2>{album.name}</h2>
      <div className='album-release'>
        <span>{album.release_date.replace(/-/g, ".")}</span>
        <span>{album.album_type}</span>
      </div>
      <div className='album-artist'>
        <ArtistBadge artists={album.artists}/>
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
