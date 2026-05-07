'use client';

import React from 'react'
import { useParams } from 'next/navigation';
import { MyPlaylist } from '@/types/user/myPlaylist';
import { mapUserToBadge } from '@/types/userBadge';
import { useQuery } from '@tanstack/react-query';
import { getMyPlaylist } from '@/lib/api/myPlaylist';
import { formatUpDate, myplaylistFormatDate } from '@/lib/format';

import DetailHeader from '@/components/common/DetailHeader';
import ThumbnailGrid from '@/components/myPage/myplaylist/ThumbnailGrid';
import ReadMore from '@/components/entities/playlist/ui/ReadMore';
import CreatorBadge from '@/components/entities/playlist/ui/CreatorBadge';

import '@/styles/playlist/playlist.scss';

const Page = () => {
  const { id } = useParams() as { id: string };

  const { data: myplaylist, isLoading } = useQuery<MyPlaylist>({
    queryKey: ['myplaylist', id],
    queryFn: () => getMyPlaylist(id),
    enabled: !!id,
  });

  // 업데이트
  const createdDate = myplaylist?.createdAt;
  const addDate = myplaylist?.updatedAt;

  const updatedText =
    createdDate && addDate
      ? formatUpDate(createdDate, addDate)
      : '';
  
  if (isLoading) return <div>로딩중...</div>;
  if (!myplaylist) return <div>아티스트 없음</div>;

  return (
    <div className='playlist-detail'>
      <DetailHeader />
      <div className='playlist-detail-img'>
        <ThumbnailGrid thumbnails={myplaylist.thumbnails} />
      </div>
      <p className='playlist-detail-fans-count'>
        나만의 주파수가 흐르는 중 
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
    </div>
  )
}

export default Page