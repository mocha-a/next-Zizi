"use-client";

import PlayBk from "../icons/PlayBk";
import Dot3 from "../icons/Dot3";
import { PlayableTrack } from "@/types/trackItem";

interface PropsType {
    trackData: PlayableTrack;  // data
    onMoreClick: (track: any) => void;
    onPlayClick: (track: any) => void;
}

export default function TrackItemRight({ trackData, onMoreClick, onPlayClick }: PropsType) {
    
  return (
    <>
      <button onClick={() => onPlayClick(trackData)}>
        <PlayBk className="icons-play" />
      </button>
      <button onClick={() => onMoreClick(trackData)}>
        <Dot3 className="icons-dot" />
      </button>
    </>
  );
}
