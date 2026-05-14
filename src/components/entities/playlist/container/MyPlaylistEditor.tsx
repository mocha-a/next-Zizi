'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DropResult } from '@hello-pangea/dnd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTrackStore } from '@/store/useSelectedTrackStore';
import { createPlaylist, updatePlaylist } from '@/lib/api/myPlaylist';
import { MyPlaylist, UpdatePlaylistParams } from '@/types/user/myPlaylist';
import { Track } from '@/types/deezer/deezer';

import NewPlaylistForm from '@/components/entities/playlist/ui/playlist/NewPlaylistForm';
import NewPlaylistActions from '@/components/entities/playlist/ui/playlist/NewPlaylistActions';
import PlaylistTrackListDnD from '@/components/entities/playlist/ui/track/PlaylistTrackListDnD';

import '@/styles/myPlaylist/newPlaylist.scss';

interface Props {
  mode?: 'create' | 'edit';
  myplaylistData?: MyPlaylist;
  tracksData?: Track[];
}

const MyPlaylistEditor = ({ mode='create', myplaylistData, tracksData } : Props) => {
  const title = useTrackStore(state => state.title);
  const description = useTrackStore(state => state.description);

  const setTitle = useTrackStore(state => state.setTitle);
  const setDescription = useTrackStore(state => state.setDescription);
  
  const tracks = useTrackStore(state => state.tracks);
  const orderIds = useTrackStore(state => state.orderIds);
  const selectedIds = useTrackStore(state => state.selectedIds);

  const toggleSelect = useTrackStore(state => state.toggleSelect);
  const removeFromPlaylist = useTrackStore(state => state.removeFromPlaylist);
  const reorder = useTrackStore(state => state.reorder);
  const reset = useTrackStore(state => state.reset);

  const playlist = orderIds.map(id => tracks[id]);

  const router = useRouter();

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createPlaylist,

    onSuccess: () => {
      useTrackStore.getState().reset();
      
      queryClient.invalidateQueries({ queryKey: ['myplaylist'] });
      
      const id = myplaylistData?.id;
      if (!id) return;

      queryClient.invalidateQueries({ queryKey: ['myplaylist', id] });

      router.push('/mypage?tab=myplaylist');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: UpdatePlaylistParams) =>
      updatePlaylist(id, data),

    onSuccess: () => {
      useTrackStore.getState().reset();

      queryClient.invalidateQueries({ queryKey: ['myplaylist'] });

      router.push('/mypage?tab=myplaylist');
    },
  });

  const initEditor = () => {
    const store = useTrackStore.getState();

    if (store.hasInitialized) return;
    if (!myplaylistData || !tracksData) return;

    store.setTitle(myplaylistData.title);
    store.setDescription(myplaylistData.description);
    store.setTracks(tracksData);

    store.setInitialized(true);
  };

  useEffect(() => {
    if (mode !== 'edit') return;
    if (!myplaylistData || !tracksData) return;

    initEditor();
  }, [mode, myplaylistData, tracksData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trackIds = playlist.map(track => ({
      id: track.id,
    }));

    const thumbnails = playlist
      .slice(0, 4)
      .map(track => track.album.cover_medium);

    const payload = {
      title,
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
        name={title}
        description={description}
        isPending={
          createMutation.isPending ||
          updateMutation.isPending
        }
        onChangeName={setTitle}
        onChangeDescription={setDescription}
        onSubmit={handleSubmit}
        onBack={reset}
      />

      <NewPlaylistActions
        selectedCount={selectedIds.length}
        onAddTrack={() => router.push('/myplaylist/add-track')}
        onDelete={removeFromPlaylist}
      />

      <PlaylistTrackListDnD
        playlist={playlist}
        selectedIds={selectedIds}
        onToggle={toggleSelect}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
}

export default MyPlaylistEditor