"use client";

import React, { useEffect, useState } from "react";
import { Track } from "@/pages/api/lastfm/lastfm";
import Image from "next/image";
import PlayBk from "../icons/PlayBk";
import Dot3 from "../icons/Dot3";

export default function TopTracksList() {
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetch('/api/lastfm/lastfm')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch tracks');
        return res.json();
      })
      .then(data => setTracks(data))
      .catch(err => console.error(err));
  }, []);

  // useEffect(() => {
  //   console.log(tracks);
  // }, [tracks]); // tracks가 바뀔 때마다 로그

  return (
    <div className='chart-container'>
      <h2><span>Hot</span> 트랙_맛보기.zip</h2>
      <ul>
        {tracks.map((track, i) => (
          <li key={i}>
            <div className='chart-left'>
              <span className='chart-num'>{i + 1}</span>
              <div className='chart-image'>
                <Image
                  src={track.image}
                  alt="album"
                  width={45}
                  height={45}
                />
              </div>
            </div>
            <div className='chart-right'>
              <div className='track-info'>
                <p>{track.name}</p>
                <span>{track.artist.name}</span>
              </div>
              <div className='track-icons'>
                <PlayBk className={"icons-play"}/>
                <Dot3 className={"icons-dot"}/>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
