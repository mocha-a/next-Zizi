'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { DropResult } from '@hello-pangea/dnd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTrackStore } from '@/store/useSelectedTrackStore';
import { useUserProfile } from '@/hooks/useUserProfile';
import { createPlaylist, updatePlaylist } from '@/lib/api/myPlaylist';
import { MyPlaylist } from '@/types/user/myPlaylist';
import { Track } from '@/types/deezer/deezer';

import NewPlaylistForm from '@/components/entities/playlist/ui/NewPlaylistForm';
import NewPlaylistActions from '@/components/entities/playlist/ui/NewPlaylistActions';
import NewPlaylistTrackList from '@/components/entities/playlist/ui/NewPlaylistTrackList';

import '@/styles/myPlaylist/newPlaylist.scss';

interface Props {
  mode?: 'create' | 'edit';
  myplaylistData?: MyPlaylist;
  tracksData?: Track[];
}

const MyPlaylistEditor = ({ mode='create', myplaylistData, tracksData } : Props) => {
  const { data: session } = useSession();
  const { data: user } = useUserProfile(session);
  const userId = user?.id;

  const [ name, setName ] = useState(myplaylistData?.title || '');
  const [ description, setDescription ] = useState(myplaylistData?.description || '');
  
  const tracks = useTrackStore(state => state.tracks);
  const orderIds = useTrackStore(state => state.orderIds);
  const selectedIds = useTrackStore(state => state.selectedIds);

  const toggleSelect = useTrackStore(state => state.toggleSelect);
  const clearSelection = useTrackStore(state => state.clearSelection);
  const removeFromPlaylist = useTrackStore(state => state.removeFromPlaylist);
  const reorder = useTrackStore(state => state.reorder);

  const playlist = orderIds.map(id => tracks[id]);

  const router = useRouter();

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPlaylist,

    onSuccess: () => {
      useTrackStore.getState().reset();
      queryClient.invalidateQueries({ queryKey: ['myplaylist']});

      router.push('/mypage?tab=myplaylist');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: any;
    }) => updatePlaylist(id, data),

    onSuccess: () => {
      useTrackStore.getState().reset();

      queryClient.invalidateQueries({ queryKey: ['myplaylist'] });

      router.push('/mypage?tab=myplaylist');
    },
  });

  useEffect(() => {
    if (mode !== 'edit' || !tracksData?.length) return;

    const { orderIds } = useTrackStore.getState();

    // 이미 store에 데이터 있으면 실행 안함
    if (orderIds.length > 0) return;

    useTrackStore.getState().setTracks(tracksData);
  }, [mode, tracksData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trackIds = playlist.map(track => ({
      id: track.id,
    }));

    const thumbnails = playlist
      .slice(0, 4)
      .map(track => track.album.cover_medium);

    const payload = {
      title: name,
      description,
      thumbnails,
      tracks: trackIds,
    };

    // 수정 모드
    if (mode === 'edit' && myplaylistData) {
      updateMutation.mutate({
        id: myplaylistData.id,
        data: payload,
      });

      return;
    }

    // 생성 모드
    createMutation.mutate(payload);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    reorder(result.source.index, result.destination.index);
  };

  return (
    <div className='new-playlist-page'>
      <NewPlaylistForm
        name={name}
        description={description}
        isPending={
          createMutation.isPending ||
          updateMutation.isPending
        }
        onChangeName={setName}
        onChangeDescription={setDescription}
        onSubmit={handleSubmit}
        onBack={clearSelection}
      />

      <NewPlaylistActions
        selectedCount={selectedIds.length}
        onAddTrack={() => router.push('/myplaylist/add-track')}
        onDelete={removeFromPlaylist}
      />

      <NewPlaylistTrackList
        playlist={playlist}
        selectedIds={selectedIds}
        onToggle={toggleSelect}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
}

export default MyPlaylistEditor