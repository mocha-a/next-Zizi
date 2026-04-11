'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import React from 'react'
import DeezerPlayer from './DeezerPlayer';

export default function MainPlayer() {
    const { currentTrack, closePlayer } = usePlayerStore();

    // 재생 중인 곡이 없으면 렌더링 X
    if (!currentTrack) return null;

  return (
    <div className='main-player-wrapper'>
        <div className='player-inner'>
            <button onClick={closePlayer}>
                닫기
            </button>

            <DeezerPlayer trackId={currentTrack.id}/>
        </div>
    </div>
  )
}
