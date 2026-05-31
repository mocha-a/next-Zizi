'use client';

import { usePlayerStore } from '@/store/usePlayerStore';
import React, { useState } from 'react'
import DeezerPlayer from './DeezerPlayer';
import Close from '../icons/Close';

export default function MainPlayer() {
    const { trackId, trackTitle, artist, isOpen, closePlayer } = usePlayerStore();
    const [ isHovered, setIsHovered ] = useState(false);

    const handleYouTubeSearch = () => {
        const query = `${artist} ${trackTitle}`;
        const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    if (!trackId || !isOpen) return null;

  return (
    <div className='main-player-wrapper'>
        <div className='player-inner'>
            <div>
                <Close onClick={closePlayer} className='close-btn'/>
            </div>

            <DeezerPlayer trackId={trackId}/>

            <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} 
                onClick={handleYouTubeSearch}
                className="youtube-btn"
            >
                {isHovered ? '유튜브에서 듣기 →' : 'ⓘ 재생에 문제가 있나요?'}
            </button>
        </div>
    </div>
  )
}
