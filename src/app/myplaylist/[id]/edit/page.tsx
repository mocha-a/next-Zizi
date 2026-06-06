'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { getMyPlaylist } from '@/lib/api/myPlaylist';
import { MyPlaylist } from '@/types/user/myPlaylist';

import MyPlaylistEditor from '@/components/entities/playlist/container/MyPlaylistEditor';

const Page = () => {
  const { id } = useParams() as { id: string };
  const numericId = Number(id);

  const { data: myplaylist } = useQuery<MyPlaylist>({
    queryKey: ['myplaylist', numericId],
    queryFn: () => getMyPlaylist(id),
    enabled: !!id,
  });

  const tracks = myplaylist?.tracks ?? [];

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