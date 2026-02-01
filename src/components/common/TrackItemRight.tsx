"use-client";

import PlayBk from "../icons/PlayBk";
import Dot3 from "../icons/Dot3";
import Tooltip from "@mui/material/Tooltip";
import { PlayableTrack } from "@/types/trackItem";

interface PropsType {
    trackData: PlayableTrack;  // data
    onMoreClick: (track: any) => void;
    onPlayClick: (track: any) => void;
}

export default function TrackItemRight({ trackData, onMoreClick, onPlayClick }: PropsType) {
    
  return (
    <>
      <Tooltip title="유튜브 검색 결과로 이동합니다" arrow>
        <button onClick={() => onPlayClick(trackData)}>
          <PlayBk className="icons-play" />
        </button>
      </Tooltip>
      <button onClick={() => onMoreClick(trackData)}>
        <Dot3 className="icons-dot" />
      </button>
    </>
  );
}
