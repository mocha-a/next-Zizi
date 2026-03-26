"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import DetailHeader from '@/components/common/DetailHeader';
import TabsContainer from '@/components/common/TabsContainer';
import AlbumInfo from '@/components/entities/album/container/AlbumInfo';
import AlbumTrack from '@/components/entities/album/container/AlbumTrack';
import ArtistBadge from '@/components/entities/artist/ui/ArtistBadge';
import { useTabStore } from '@/store/tabStore';
import { getAlbum } from '@/lib/api/album';
import { useQuery } from '@tanstack/react-query';
import { excludedGenres, genreMap } from '@/lib/genre';

import '@/styles/album/album.scss';

import { Album } from '@/types/deezer/deezer';

const Page = () => {
  const { id } = useParams() as { id: string };
  const { tabValue, setTabValue } = useTabStore();

  const { data: album, isLoading } = useQuery<Album>({
    queryKey: ['album', id],
    queryFn: () => getAlbum(Number(id)),
    enabled: !!id,
  });

  // 탭 메뉴
  const tabs = [
    { label: '수록곡', content: <AlbumTrack track={album?.tracks?.data ?? []} /> },
    { label: '비슷한 분위기', content: <AlbumInfo album={album} /> },
  ];

  useEffect(() => {
    setTabValue(0);
  }, [setTabValue]);

  console.log(album);

  if (isLoading) return <div>로딩중...</div>;
  if (!album) return <div>아티스트 없음</div>;

  return (
    <div className="album-detail">
      <DetailHeader />
      <div className='album-detail-img'>
        <Image
          src={album.cover_medium ?? '/imgs/default-artist.png'}
          alt={album.title}
          width={200}
          height={200}
        />
      </div>
      <p className='album-detail-fans-count'>{album.fans}명이 무한재생 중</p>
      <h2>{album.title}</h2>
      <div className='album-detail-info'>
        <span>{album.release_date.replace(/-/g, ".")}</span>
        <span>{album.record_type}</span>
        {album.genres.data
          .filter(genre => !excludedGenres.includes(genre.name))
          .map((genre) => (
            <span key={genre.name}>{genreMap[genre.name] || genre.name}</span>
        ))}
      </div>
      <div className='album-detail-artist'>
        <ArtistBadge contributors={album.contributors ?? []} />
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