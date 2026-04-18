'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import React from 'react'
import DeezerPlayer from './DeezerPlayer';
import Close from '../icons/Close';

export default function MainPlayer() {
    const { trackId, isOpen, closePlayer } = usePlayerStore();

    if (!trackId || !isOpen) return null;

  return (
    <div className='main-player-wrapper'>
        <div className='player-inner'>
            <button>
                <Close onClick={closePlayer}/>
            </button>

            <DeezerPlayer trackId={trackId}/>
        </div>
    </div>
  )
}
