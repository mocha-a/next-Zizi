"use client";
import React, { useEffect } from 'react'
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useTabStore } from '@/store/tabStore';
import { formatDate, formatUpDate } from '@/lib/format';
import { getCreator, getPlaylist, getTranslate } from '@/lib/api/playlist';
import { Playlist } from '@/types/deezer/deezer';

import DetailHeader from '@/components/common/DetailHeader';
import CreatorBadge from '@/components/entities/playlist/ui/CreatorBadge';
import PlaylistTrackList from '@/components/entities/playlist/container/PlaylistTrackList';
import PlaylistFlow from '@/components/entities/playlist/container/PlaylistFlow';
import TabsContainer from '@/components/common/TabsContainer';
import ReadMore from '@/components/entities/playlist/ui/ReadMore';

import '@/styles/playlist/playlist.scss';

const Page = () => {
  const { id } = useParams() as { id: string };
  const { tabValue, setTabValue } = useTabStore();

  // 플레이리스트 api
  const { data: playlist, isLoading: playlistLoading } = useQuery<Playlist>({
    queryKey: ['playlist', id],
    queryFn: () => getPlaylist(Number(id)),
    enabled: !!id,
  });
  console.log(playlist);

  // 플레이리스트 제작자 api
  const creatorId = playlist?.creator?.id;
  const { data: creator, isLoading: creatorLoading } = useQuery({
    queryKey: ['creator', playlist?.creator?.id],
    queryFn: () => getCreator(creatorId!),
    enabled: !!creatorId
  });

  // 번역 api
  const description = playlist?.description;
  const { data: translated, isLoading: translateLoading } = useQuery({
    queryKey: ["translate", playlist?.id],
    queryFn: () => getTranslate(description!),
    enabled: !!description?.trim(),
  });

  // 업데이트
  const createdDate = playlist?.creation_date;
  const addDate = playlist?.add_date;

  const updatedText =
    createdDate && addDate
      ? formatUpDate(createdDate, addDate)
      : '';

  // 탭 메뉴
  const tabs = [
    { label: '곡', content: <PlaylistTrackList track={playlist?.tracks?.data ?? []} duration={playlist?.duration ?? 0} />},
    { label: '취향저격', content: <PlaylistFlow id={playlist?.creator?.id ?? 0}/> },
  ];

  useEffect(() => {
    setTabValue(0);
  }, [setTabValue]);

  if (playlistLoading || creatorLoading || translateLoading) return <div>로딩중...</div>;
  if (!playlist) return <div>아티스트 없음</div>;

  return (
    <div className='playlist-detail'>
      <DetailHeader />
      <div className='playlist-detail-img'>
        <Image
          src={playlist.picture_medium ?? '/imgs/default.png'}
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
      {translated && (
        <ReadMore description={translated} />
      )}
      <div className='playlist-detail-info'>
        <span>{formatDate(playlist.creation_date)} </span>
        {updatedText && (
          <span className="playlist-updated"> {updatedText} 업데이트</span>
        )}
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