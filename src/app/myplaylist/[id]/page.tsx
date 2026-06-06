'use client';

import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MyPlaylist } from '@/types/user/myPlaylist';
import { mapUserToBadge } from '@/types/userBadge';
import { formatUpDate, formatYYYYMMDD } from '@/lib/format';
import { deletePlaylists, getMyPlaylist } from '@/lib/api/myPlaylist';

import Back from '@/components/icons/Back';
import Popup from '@/components/common/Popup';
import ReadMore from '@/components/entities/playlist/ui/ReadMore';
import CreatorBadge from '@/components/entities/playlist/ui/playlist/CreatorBadge';
import PlaylistTrackList from '@/components/entities/playlist/container/PlaylistTrackList';
import MediaPageSkeleton from '@/components/loading/page/MediaPageSkeleton';
import ThumbnailGrid from '@/components/myPage/myplaylist/ThumbnailGrid';

import '@/styles/myPlaylist/newPlaylist.scss';

const Page = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { id } = useParams() as { id: string };

  const [ showDeletePopup, setShowDeletePopup ] = useState(false);

  const numericId = Number(id);

  const deleteMutation = useMutation({
    mutationFn: deletePlaylists,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['myplaylists']
      });

      router.push('/mypage?tab=myplaylist');
    }
  });

  // 내 플리 가져오기
  const { data: myplaylist, isLoading } = useQuery<MyPlaylist>({
    queryKey: ['myplaylist', numericId],
    queryFn: () => getMyPlaylist(id),
    enabled: !!id,
  });

  // 내 플리 트랙
  const tracks = myplaylist?.tracks ?? [];

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
console.log(myplaylist);
  return (
    <div className='playlist-detail'>
      <div className='playlist-header detailHeader'>
        <Back />
        <div className='playlist-header-actions'>
          <button onClick={() => setShowDeletePopup(true)}>
            삭제
          </button>
          <Link href={`/myplaylist/${id}/edit`} className='submit'>
            편집
          </Link>
        </div>
      </div>
      {isLoading ? (
        <MediaPageSkeleton/>
      ): !myplaylist ? (
        <div>플레이리스트 없음</div>
      ): (
      <>
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
          <span>{formatYYYYMMDD(createdDate)} </span>
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
      </>
      )}
      <PlaylistTrackList track={tracks} duration={Duration} isLoading={isLoading} />


      {showDeletePopup && (
        <Popup
          showPopup={showDeletePopup}
          setShowPopup={setShowDeletePopup}
          type={"delete"}
          onConfirm={() => {
            deleteMutation.mutate([Number(id)]); 
          }}
          onCancel={() => {
            setShowDeletePopup(false);
          }}
          isLoading={deleteMutation.isPending}
          loadingText= "삭제 중..."
        />
      )}
    </div>
  )
}

export default Page