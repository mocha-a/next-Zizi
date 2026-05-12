"use client";

import PlayBk from "../icons/PlayBk";
import Dot3 from "../icons/Dot3";
import { useSession } from 'next-auth/react';
import { Track } from "@/types/deezer/deezer";
import { recent } from "@/lib/recent";

import { useTrackDialog } from "@/store/useTrackDialog";
import { usePlayerStore } from "@/store/usePlayerStore";

interface PropsType {
  trackData: Track;  // data
}

export default function TrackItemRight({ trackData }: PropsType) {
  const { data: session } = useSession();
  const openDialog = useTrackDialog((s) => s.openDialog);
  const playTrack = usePlayerStore((s) => s.play);

  // const handlePlayPreview = () => {
  //   const audio = new Audio(trackData.preview);
  //   audio.play();
  // };
    
  return (
    <>
      <button
        onClick={() => {
          playTrack({
            id: trackData.id,
            title: trackData.title,
            artist: trackData.artist.name,
          });

          recent({
            type: 'track',
            id: String(trackData.id),
            isLoggedIn: !!session,
          });
        }}
      >
        <PlayBk className="icons-play" />
      </button>
      <button onClick={() => openDialog(trackData)}>
        <Dot3 className="icons-dot" />
      </button>
    </>
  );
}