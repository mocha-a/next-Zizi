"use client";

import TrackItemRight from "@/components/common/TrackItemRight";
import { Track } from "@/types/deezer/deezer";

interface Props {
  track: Track;
  index: number;
}

export default function AlbumTrackItem({ track, index }: Props) {
  return (
    <li className="album-track-item">
      <div className="album-track-left">
        <span className="album-track-num">
          {(index + 1).toString().padStart(2, "0")}
        </span>
      </div>

      <div className="album-track-center">
        <p className="album-track-name">{track.title}</p>
        <span className="album-track-artist">
          {track.artist.name}
        </span>
      </div>

      <div className="album-track-right">
        <TrackItemRight
          trackData={{
            title: track.title,
            artist: { name: track.artist.name },
            image: track.album.cover_medium
          }}
        />
      </div>
    </li>
  );
}
