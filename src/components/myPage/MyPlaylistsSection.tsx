import React from 'react'
import LongBtn from '../common/LongBtn'
import { useRouter } from 'next/navigation';

const MyPlaylistsSection = () => {
  const router = useRouter();

  return (
    <div>
      <LongBtn label={`+ 플레이리스트 추가`} className='active' onClick={() => router.push(`/playlist/new`)}/>
    </div>
  )
}

export default MyPlaylistsSection