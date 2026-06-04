'use client';

import React from 'react'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MyPlaylist } from '@/types/user/myPlaylist';
import { mapUserToBadge } from '@/types/userBadge';
import { useQuery } from '@tanstack/react-query';
import { getTrack } from '@/lib/api';
import { getMyPlaylist } from '@/lib/api/myPlaylist';
import { formatUpDate, myplaylistFormatDate } from '@/lib/format';

import Back from '@/components/icons/Back';
import ReadMore from '@/components/entities/playlist/ui/ReadMore';
import CreatorBadge from '@/components/entities/playlist/ui/playlist/CreatorBadge';
import ThumbnailGrid from '@/components/myPage/myplaylist/ThumbnailGrid';
import PlaylistTrackList from '@/components/entities/playlist/container/PlaylistTrackList';

import '@/styles/myPlaylist/newPlaylist.scss';

const Page = () => {
  const { id } = useParams() as { id: string };

  const { data: myplaylist, isLoading } = useQuery<MyPlaylist>({
    queryKey: ['myplaylist', id],
    queryFn: () => getMyPlaylist(id),
    enabled: !!id,
  });

  const { data: tracks = [] } = useQuery({
    queryKey: ['playlistTracks', myplaylist?.id],
    queryFn: async () => {
      if (!myplaylist) return [];

      return Promise.all(
        myplaylist.tracks.map(track =>
          getTrack(Number(track.trackId))
        )
      );
    },
    enabled: !!myplaylist,
  });

  // 업데이트
  const createdDate = myplaylist?.createdAt;
  const addDate = myplaylist?.updatedAt;

  const updatedText =
    createdDate && addDate
      ? formatUpDate(createdDate, addDate)
      : '';
  
  // track 총 재생 시간
  const Duration = tracks.reduce(
    (acc, cur) => acc + cur.duration,
    0
  );

  if (isLoading) return <div>로딩중...</div>;
  if (!myplaylist) return <div>아티스트 없음</div>;

  return (
    <div className='playlist-detail'>
      <div className='playlist-hearder detailHeader'>
        <Back />
        <Link href={`/myplaylist/${id}/edit`} className='submit'>
          편집
        </Link>
      </div>
      <div className='playlist-detail-img'>
        <ThumbnailGrid thumbnails={myplaylist.thumbnails} className='large-thumbnail' />
      </div>
      <p className='playlist-detail-fans-count'>
        나만의 주파수가 흐르는 중 -
      </p>
      <h2>{myplaylist.title}</h2>
      {myplaylist.description && (
        <ReadMore description={myplaylist.description} />
      )}
      <div className='playlist-detail-info'>
        <span>{myplaylistFormatDate(createdDate)} </span>
        {updatedText && (
          <span className="playlist-updated"> {updatedText} 업데이트</span>
        )}
      </div>
      <div className='playlist-detail-creator'>
        <CreatorBadge
          creator={myplaylist.user ? mapUserToBadge(myplaylist.user) : null}
          KRCode="kr"
        />
      </div>

      <PlaylistTrackList track={tracks} duration={Duration}/>
    </div>
  )
}

export default Page