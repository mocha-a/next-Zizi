import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useUserProfile } from '@/hooks/useUserProfile';
import { getPlaylists } from '@/lib/api/myPlaylist';
import { MyPlaylist } from '@/types/user/myPlaylist';
import TagBtn from '../common/TagBtn';
import Popup from '../common/Popup';
import PlaylistCard from '../entities/playlist/ui/PlaylistCard';

const MyPlaylistsSection = () => {
  const { data: session } = useSession();
  const { data: user } = useUserProfile(session);
  const [ showPopup, setShowPopup ] = useState(false);
  const router = useRouter();

  const { data: myplaylist, isLoading } = useQuery<MyPlaylist[]>({
    queryKey: ['myplaylist', user?.id],
    queryFn: () => getPlaylists(),
    enabled: !!user?.id,
    staleTime: 1000 * 60,
  });
  console.log(myplaylist);

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
      <TagBtn tagbtn={`+ 플레이리스트 추가`} onClick={handleClick}/>

      <div className="playlist-list">
        {myplaylist?.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
            picture={playlist.thumbnails?.[0] || ''}
            title={playlist.title}
            user={playlist.user.name}
            tracks={playlist.tracks.length}
            onClick={() => router.push(`/myplaylist/${playlist.id}`)}
          />
        ))}
      </div>

      {showPopup && 
        <Popup 
          showPopup={showPopup} 
          setShowPopup={setShowPopup} 
          type={"login"}  
          onConfirm={() => {
            router.push(`/login`)
          }}
          onCancel={()=>{
            router.back()
            setShowPopup(false)
          }}
        />
      }
    </div>
  )
}

export default MyPlaylistsSection