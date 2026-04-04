"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Track } from "@/pages/api/lastfm/lastfm";
import TrackItem from "../common/TrackItem";
import { useTrackDialog } from "@/store/useTrackDialog";
import Dialog from "@mui/material/Dialog";
import TrackDialogContent from "../common/TrackDialogContent";

export default function TopTracksList() {
  const pathname = usePathname();
  const [tracks, setTracks] = useState<Track[]>([]);
  const { open, track, closeDialog } = useTrackDialog();

  useEffect(() => {
      closeDialog();
    },[pathname])

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
            <TrackItem key={i} track={tracks} index={i} page="home" />
        ))}
      </ul>

      <Dialog open={open} onClose={closeDialog}>
        {track && (
          <TrackDialogContent trackData={track}/>
        )}
      </Dialog>
    </div>
  );
}
