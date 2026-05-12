import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useUserProfile } from '@/hooks/useUserProfile';
import { getPlaylists } from '@/lib/api/myPlaylist';
import { usePlaylistEditStore } from '@/store/usePlaylistEditStore';
import { MyPlaylist } from '@/types/user/myPlaylist';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';
import ThumbnailGrid from './ThumbnailGrid';
import Popup from '../../common/Popup';
import PlaylistCard from '../../entities/playlist/ui/PlaylistCard';

import '@/styles/myPlaylist/newPlaylist.scss';

const MyPlaylistsSection = () => {
  const { isEditMode, selectedIds, toggleSelect, setEditMode } = usePlaylistEditStore();
  const { data: session } = useSession();
  const { data: user } = useUserProfile(session);
  const [ showPopup, setShowPopup ] = useState(false);
  const router = useRouter();

  const { data: myplaylist, isLoading } = useQuery<MyPlaylist[]>({
    queryKey: ['myplaylist', user?.id],
    queryFn: () => getPlaylists(),
    enabled: !!user?.id,
    staleTime: 0,
  });

  const handleClick = () => {
    // 로그인 안된 상태
    if (!session) {
      setShowPopup(true);
      return;
    }

    router.push('/myplaylist/new');
  };

  return (
    <div>
      <div className='myplaylist-btn'>
        <div onClick={handleClick}> + 내 플리 추가</div>
        <div className='submit' onClick={() => setEditMode(!isEditMode)}>
          {isEditMode ? '완료' : '편집'}
        </div>
      </div>

    {isLoading ? (
      <div className="playlist-list myplaylist-list">
        {Array.from({ length: 10 }).map((_, i) => (
          <MediaSkeleton key={`init-${i}`} />
        ))}
      </div>
    ) : (
      <>
        <ul className="playlist-list myplaylist-list">
          {myplaylist?.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              id={playlist.id}
              thumbnail={
                <ThumbnailGrid thumbnails={playlist.thumbnails || []} className='small-thumbnail'/>
              }
              title={playlist.title}
              user={playlist.user.name}
              tracks={playlist.tracks.length}
              isSelected={selectedIds.includes(playlist.id)}
              onClick={() => {
                if (isEditMode) {
                  toggleSelect(playlist.id);
                  return;
                }

                router.push(`/myplaylist/${playlist.id}`);
              }}
            />
          ))}
        </ul>

        {showPopup && (
          <Popup
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            type={"login"}
            onConfirm={() => router.push(`/login`)}
            onCancel={() => {
              router.back();
              setShowPopup(false);
            }}
          />
        )}
      </>
    )}
  </div>
  )
}

export default MyPlaylistsSection