"use client";

import TrackItemRight from "@/components/common/TrackItemRight";

interface Artist {
  name: string;
}

interface AlbumTrack {
  name: string;
  artists: Artist[];
}

interface Props {
  track: AlbumTrack;
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
        <p className="album-track-name">{track.name}</p>
        <span className="album-track-artist">
          {track.artists.map(a => a.name).join(", ")}
        </span>
      </div>

      <div className="album-track-right">
        <TrackItemRight
          track={{
            name: track.name,
            artist: { name: track.artists.map(a => a.name).join(", ") }
          }}
        />
      </div>
    </li>
  );
}
