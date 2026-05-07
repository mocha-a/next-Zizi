'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { DropResult } from '@hello-pangea/dnd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTrackStore } from '@/store/useSelectedTrackStore';
import { useUserProfile } from '@/hooks/useUserProfile';
import { createPlaylist } from '@/lib/api/myPlaylist';

import NewPlaylistForm from '@/components/entities/playlist/ui/NewPlaylistForm';
import NewPlaylistActions from '@/components/entities/playlist/ui/NewPlaylistActions';
import NewPlaylistTrackList from '@/components/entities/playlist/ui/NewPlaylistTrackList';

import '@/styles/playlist/NewPlaylist.scss';

const Page = () => {
  const { data: session } = useSession();
  const { data: user } = useUserProfile(session);
  const userId = user?.id;

  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  
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
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
      router.push('/mypage?tab=myplaylist');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!userId) return;

  const trackIds = playlist.map(track => ({
    id: track.id,
  }));

    mutate({
      title: name,
      description,
      userId,
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
        onAddTrack={() => router.push('/playlist/add-track')}
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
};

export default Page;