'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useUserProfile } from '@/hooks/useUserProfile';
import { getPlaylists } from '@/lib/api/myPlaylist';
import { usePlaylistEditStore } from '@/store/usePlaylistEditStore';
import { MyPlaylist } from '@/types/user/myPlaylist';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';
import PlaylistListDnD from '@/components/entities/playlist/ui/playlist/PlaylistListDnD';
import ThumbnailGrid from './ThumbnailGrid';
import Popup from '../../common/Popup';
import PlaylistCard from '../../entities/playlist/ui/playlist/PlaylistCard';

import { DropResult } from '@hello-pangea/dnd';

import '@/styles/myPlaylist/newPlaylist.scss';

const MyPlaylistsSection = () => {
  const { isEditMode, selectedIds, toggleSelect, setEditMode } = usePlaylistEditStore();

  const { data: session } = useSession();
  const { data: user } = useUserProfile(session);

  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const { data: myplaylist, isLoading } = useQuery<MyPlaylist[]>({
    queryKey: ['myplaylist', user?.id],
    queryFn: () => getPlaylists(),
    enabled: !!user?.id,
    staleTime: 0,
  });

  // 👉 DnD용 로컬 상태
  const [localList, setLocalList] = useState<MyPlaylist[]>([]);

  useEffect(() => {
    if (myplaylist) setLocalList(myplaylist);
  }, [myplaylist]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(localList);
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);

    setLocalList(items);
  };

  const handleClick = () => {
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
      ) : isEditMode ? (
        // 편집모드
        <ul className="playlist-list myplaylist-list">
          <PlaylistListDnD
            playlists={localList}
            selectedIds={selectedIds}
            onToggle={toggleSelect}
            onDragEnd={handleDragEnd}
            isEditMode={isEditMode}
          />
        </ul>
      ) : (
        <ul className="playlist-list myplaylist-list">
          {myplaylist?.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              thumbnail={
                <ThumbnailGrid
                  thumbnails={playlist.thumbnails || []}
                  className="small-thumbnail"
                />
              }
              title={playlist.title}
              user={playlist.user.name}
              tracks={playlist.tracks.length}
              isEditMode={false}
              onClick={() => {
                router.push(`/myplaylist/${playlist.id}`);
              }}
            />
          ))}
        </ul>
      )}

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
    </div>
  );
};

export default MyPlaylistsSection;