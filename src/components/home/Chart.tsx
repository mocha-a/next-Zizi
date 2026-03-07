"use client";

import React, { useEffect, useState } from "react";
import { Track } from "@/pages/api/lastfm/lastfm";
import TrackItem from "../common/TrackItem";
import { PlayableTrack } from '@/types/trackItem';

interface Props {
  onOpenDialog: (track: Track) => void;
  onPlayClick: (track: PlayableTrack) => void;
}

export default function TopTracksList({onOpenDialog, onPlayClick}: Props) {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetch('/api/lastfm/lastfm')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch tracks');
        return res.json();
      })
      .then(data => setTracks(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='chart-section-container'>
      <h2><span>Hot</span> 트랙_맛보기.zip</h2>
      <ul className='chart-section-list-box tracklist'>
        {tracks.slice(0, 5).map((tracks, i) => (
            <TrackItem key={i} trackData={tracks} index={i} page="home"
                        onPlayClick={onPlayClick} onMoreClick={onOpenDialog}
            />
        ))}
      </ul>
    </div>
  );
}
