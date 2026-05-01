import React from 'react'
import { useRouter } from 'next/navigation';
import TagBtn from '../common/TagBtn';

const MyPlaylistsSection = () => {
  const router = useRouter();

  return (
    <div>
      <TagBtn tagbtn={`+ 플레이리스트 추가`} onClick={() => router.push(`/playlist/new`)}/>
    </div>
  )
}

export default MyPlaylistsSection