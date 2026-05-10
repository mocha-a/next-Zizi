'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getMyPlaylist } from '@/lib/api/myPlaylist';
import { getTrack } from '@/lib/api';
import { MyPlaylist } from '@/types/user/myPlaylist';

import MyPlaylistEditor from '@/components/entities/playlist/container/MyPlaylistEditor';

const Page = () => {
  const { id } = useParams() as { id: string };

  const { data: myplaylist } = useQuery<MyPlaylist>({
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

  if (!myplaylist) return null;

  return (
    <MyPlaylistEditor
      mode="edit"
      myplaylistData={myplaylist}
      tracksData={tracks}
    />
  );
};

export default Page;