"use client";

import React, { useEffect, useState } from "react";
import { fetchTopTracks, Track } from "@/pages/api/lastfm";

export default function TopTracksList() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetchTopTracks()
      .then(setTracks)
      .catch((err) => console.error("API 호출 실패:", err));
  }, []);

  console.log(tracks)

  return (
    <div className='chart-container'>
      <h2><span>Hot</span> 트랙_맛보기.zip</h2>
      <ul>
        {tracks.map((track, i) => (
          <li key={i}>
            {i + 1}. {track.name} - {track.artist.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
