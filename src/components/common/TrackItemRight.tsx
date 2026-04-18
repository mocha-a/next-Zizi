"use client";

import PlayBk from "../icons/PlayBk";
import Dot3 from "../icons/Dot3";
import { Track } from "@/types/deezer/deezer";

import { useTrackDialog } from "@/store/useTrackDialog";
import { usePlayerStore } from "@/store/usePlayerStore";

interface PropsType {
  trackData: Track;  // data
}

export default function TrackItemRight({ trackData }: PropsType) {
  const openDialog = useTrackDialog((s) => s.openDialog);
  const playTrack = usePlayerStore((s) => s.play);

  // const handlePlayPreview = () => {
  //   const audio = new Audio(trackData.preview);
  //   audio.play();
  // };
    
  return (
    <>
      <button onClick={() => playTrack(trackData.id)}>
        <PlayBk className="icons-play" />
      </button>
      <button onClick={() => openDialog(trackData)}>
        <Dot3 className="icons-dot" />
      </button>
    </>
  );
}
