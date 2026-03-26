"use-client";

import PlayBk from "../icons/PlayBk";
import Dot3 from "../icons/Dot3";
import { TrackItemData } from "@/types/trackItem";
import { useTrackDialog } from "@/store/useTrackDialog";

interface PropsType {
    trackData: TrackItemData;  // data
}

export default function TrackItemRight({ trackData }: PropsType) {
  const openDialog = useTrackDialog((s) => s.openDialog);

  const handleYouTubeSearch = ({ artist, title }: TrackItemData) => {
    // console.log(artist.name, name);
    const query = `${artist.name} ${title}`;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };
    
  return (
    <>
      <button onClick={() => handleYouTubeSearch(trackData)}>
        <PlayBk className="icons-play" />
      </button>
      <button onClick={() => openDialog(trackData)}>
        <Dot3 className="icons-dot" />
      </button>
    </>
  );
}
