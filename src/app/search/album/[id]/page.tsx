"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useTabStore } from '@/store/tabStore';
import DetailHeader from '@/components/common/DetailHeader';
import TabsContainer from '@/components/common/TabsContainer';
import ArtistBadge from '@/components/entities/artist/ui/ArtistBadge';
import SimilarAlbums from '@/components/entities/album/container/SimilarAlbums';
import AlbumTrackList from '@/components/entities/album/container/AlbumTrackList';
import { getAlbum } from '@/lib/api/album';
import { getUniqueGenres } from '@/lib/genre';
import { recordTypeMap } from '@/lib/recordType';
import { Album } from '@/types/deezer/deezer';

import '@/styles/album/album.scss';

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
    { label: '수록곡', content: <AlbumTrackList track={album?.tracks?.data ?? []} duration={album?.duration ?? 0} /> },
    { label: '비슷한 느낌', content: <SimilarAlbums genreId={album?.genre_id ?? -1} /> },
  ];

  useEffect(() => {
    setTabValue(0);
  }, [setTabValue]);

  console.log(album);
  // 장르
  const genres = getUniqueGenres(album?.genres.data);

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
      <p className='album-detail-fans-count'>
        {album.fans > 0
          ? `${album.fans.toLocaleString()}명이 무한재생 중`
          : "무한재생 앨범으로 찜해봐-!"}
      </p>
      <h2>{album.title}</h2>
      <div className='album-detail-info'>
        <span>{album.release_date.replace(/-/g, ".")}</span>
        <span>{recordTypeMap[album.record_type]}</span>
        {genres.length > 0 && (
          <span className="album-detail-genres">
            {genres.map((genre, i) => (
              <span key={i}>{genre}</span>
            ))}
          </span>
        )}
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