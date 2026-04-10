"use client";

import React, { useEffect } from 'react'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useTabStore } from '@/store/tabStore';
import DetailHeader from '@/components/common/DetailHeader';
import CreatorBadge from '@/components/entities/playlist/ui/CreatorBadge';
import PlaylistTrackList from '@/components/entities/playlist/container/PlaylistTrackList';
import PlaylistFlow from '@/components/entities/playlist/container/PlaylistFlow';
import TabsContainer from '@/components/common/TabsContainer';
import { getCreator, getPlaylist } from '@/lib/api/playlist';
import { formatDate } from '@/lib/format';
import { Playlist } from '@/types/deezer/deezer';

import '@/styles/playlist/playlist.scss';

const Page = () => {
  const { id } = useParams() as { id: string };
  const { tabValue, setTabValue } = useTabStore();

  const { data: playlist, isLoading } = useQuery<Playlist>({
    queryKey: ['playlist', id],
    queryFn: () => getPlaylist(Number(id)),
    enabled: !!id,
  });

  const creatorId = playlist?.creator?.id;

  const { data: creator } = useQuery({
    queryKey: ['creator', playlist?.creator?.id],
    queryFn: () => getCreator(creatorId!),
    enabled: !!creatorId
  });

    // 탭 메뉴
  const tabs = [
    { label: '곡', content: <PlaylistTrackList />},
    { label: '취향저격', content: <PlaylistFlow /> },
  ];

  useEffect(() => {
    setTabValue(0);
  }, [setTabValue]);

  console.log(playlist, creator);

  if (isLoading) return <div>로딩중...</div>;
  if (!playlist) return <div>아티스트 없음</div>;

  return (
    <div className='playlist-detail'>
      <DetailHeader />
      <div className='playlist-detail-img'>
        <Image
          src={playlist.picture_medium ?? '/imgs/default-user.png'}
          alt={playlist.title}
          width={200}
          height={200}
        />
      </div>
      <p className='playlist-detail-fans-count'>
        {playlist.fans > 0
          ? `${playlist.fans.toLocaleString()}명이 무한재생 중...`
          : "무한재생 앨범으로 찜해봐 -!"}
      </p>
      <h2>{playlist.title}</h2>
      <div className='playlist-detail-info'>
        <span>{formatDate(playlist.creation_date)}</span>
      </div>
      <div className='playlist-detail-creator'>
        <CreatorBadge creator={creator ?? []} />
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