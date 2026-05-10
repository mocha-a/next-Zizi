'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { DropResult } from '@hello-pangea/dnd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTrackStore } from '@/store/useSelectedTrackStore';
import { useUserProfile } from '@/hooks/useUserProfile';
import { createPlaylist } from '@/lib/api/myPlaylist';
import { MyPlaylist } from '@/types/user/myPlaylist';
import { Track } from '@/types/deezer/deezer';

import NewPlaylistForm from '@/components/entities/playlist/ui/NewPlaylistForm';
import NewPlaylistActions from '@/components/entities/playlist/ui/NewPlaylistActions';
import NewPlaylistTrackList from '@/components/entities/playlist/ui/NewPlaylistTrackList';

import '@/styles/myplaylist/NewPlaylist.scss';

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
  const reorder = useTrackStore(state => state.reorder);

  const playlist = orderIds.map(id => tracks[id]);

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPlaylist,
    onSuccess: () => {
      useTrackStore.getState().reset();
      queryClient.invalidateQueries({ queryKey: ['myplaylist'] });
      router.push('/mypage?tab=myplaylist');
    },
  });

  useEffect(() => {
    if (mode !== 'edit' || !tracksData?.length) return;

    useTrackStore.getState().setTracks(tracksData);
  }, [mode, tracksData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) return;

    const trackIds = playlist.map(track => ({
      id: track.id,
    }));

    const thumbnails = playlist
    .slice(0, 4)
    .map(track => track.album.cover_medium);

    mutate({
      title: name,
      description,
      userId,
      thumbnails,
      tracks: trackIds,
    });
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
        isPending={isPending}
        onChangeName={setName}
        onChangeDescription={setDescription}
        onSubmit={handleSubmit}
        onBack={clearSelection}
      />

      <NewPlaylistActions
        selectedCount={selectedIds.length}
        onAddTrack={() => router.push('/myplaylist/add-track')}
        onDelete={clearSelection}
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