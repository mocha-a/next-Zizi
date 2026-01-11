"use-client";

import PlayBk from "../icons/PlayBk";
import Dot3 from "../icons/Dot3";
import { useState } from "react";

interface Artist {
    name: string;
}

interface Track {
    image: string;
    name: string;
    artist: Artist;
}

interface TrackItemRightProps {
  track: Track;
}

export default function TrackItemRight({ track }: TrackItemRightProps) {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    
  const handlePlay = () => {
    console.log("재생:", track.name);
  };

  const handleMenu = () => {
    console.log("메뉴:", track.name);
  };

  return (
    <>
      <button onClick={handlePlay}>
        <PlayBk className="icons-play" />
      </button>
      <button onClick={handleMenu}>
        <Dot3 className="icons-dot" />
      </button>
    </>
  );
}
