'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DropResult } from '@hello-pangea/dnd';
import { useUIStore } from '@/store/useUIStore';
import { usePlaylistEditStore } from '@/store/usePlaylistEditStore';
import { useUserProfile } from '@/hooks/useUserProfile';
import { getPlaylists, deletePlaylists, updatePlaylistOrder } from '@/lib/api/myPlaylist';
import { MyPlaylist } from '@/types/user/myPlaylist';
import TrashButton from '@/components/common/TrashButton';
import MediaSkeleton from '@/components/loading/item/MediaSkeleton';
import PlaylistListDnD from '@/components/entities/playlist/ui/playlist/PlaylistListDnD';
import Check from '@/components/icons/Check';
import Plus from '@/components/icons/Plus';
import ThumbnailGrid from './ThumbnailGrid';
import Popup from '../../common/Popup';
import PlaylistCard from '../../entities/playlist/ui/playlist/PlaylistCard';

import '@/styles/myPlaylist/newPlaylist.scss';

const MyPlaylistsSection = () => {
  const { isEditMode, selectedIds, toggleSelect, setEditMode, setSelectedIds } = usePlaylistEditStore();
  const { setHideBottomNav } = useUIStore();

  const { data: session } = useSession();
  const { data: user } = useUserProfile(session);
  const router = useRouter();
  
  const queryClient = useQueryClient();

  // DnD 상태
  const [ localList, setLocalList ] = useState<MyPlaylist[]>([]);

  const [ showLoginPopup, setShowLoginPopup ] = useState(false);
  const [ showDeletePopup, setShowDeletePopup ] = useState(false);

  // 내 플리 삭제
  const deleteMutation = useMutation({
    mutationFn: deletePlaylists,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myplaylist', user?.id],
      });

      setSelectedIds([]);
    },
  });

  // 내 플리 순서 변경
  const orderMutation = useMutation({
    mutationFn: updatePlaylistOrder,
  });

  // 내 플리 가져오기
  const { data: myplaylist, isLoading } = useQuery<MyPlaylist[]>({
    queryKey: ['myplaylist', user?.id],
    queryFn: () => getPlaylists(),
    enabled: !!user?.id,
    staleTime: 0,
  });

  useEffect(() => {
    if (myplaylist) setLocalList(myplaylist);
  }, [myplaylist]);

  useEffect(() => {
    setHideBottomNav(selectedIds.length > 0);

    return () => {
      setHideBottomNav(false);
    };
  }, [selectedIds, setHideBottomNav]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(localList);

    const [removed] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, removed);

    setLocalList(items);
  };

  const handleClick = () => {
    if (!session) {
      setShowLoginPopup(true);
      return;
    }

    router.push('/myplaylist/new');
  };

  const handleEditMode = () => {
    // 편집 종료 시 저장
    if (isEditMode) {
      const reordered = localList.map((item, index) => ({
        id: item.id,
        order: index,
      }));

      orderMutation.mutate(reordered);
    }

    setEditMode(!isEditMode);
  };

  const isAllSelected =
    localList.length > 0 && selectedIds.length === localList.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(localList.map((item) => item.id));
    }
  };

  return (
    <div>
      <div className='myplaylist-btn'>
        <div onClick={isEditMode ? handleSelectAll : handleClick} className='action-btn'>
          {isEditMode ? (
            <>
              <Check />
              {isAllSelected ? '전체 해제' : '전체 선택'}
            </>
          ) : (
            <>
              <Plus />
              내 플리 추가
            </>
          )}
        </div>
        <div className='submit' onClick={handleEditMode}>
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
          {localList?.map((playlist) => (
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

      {selectedIds.length > 0 && (
        <div
          className='delete-bar'
          onClick={() => setShowDeletePopup(true)}
        >
          <TrashButton />
        </div>
      )}

      {showLoginPopup && (
        <Popup
          showPopup={showLoginPopup}
          setShowPopup={setShowLoginPopup}
          type={"login"}
          onConfirm={() => router.push(`/login`)}
          onCancel={() => {
            router.back();
            setShowLoginPopup(false);
          }}
        />
      )}

      {showDeletePopup && (
        <Popup
          showPopup={showDeletePopup}
          setShowPopup={setShowDeletePopup}
          type='delete'
          onConfirm={() => {
            deleteMutation.mutate(selectedIds);
            setShowDeletePopup(false);
          }}
          onCancel={() => {
            setShowDeletePopup(false);
          }}
        />
      )}
    </div>
  );
};

export default MyPlaylistsSection;