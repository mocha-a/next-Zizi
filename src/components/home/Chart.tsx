"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import { useTrackDialog } from "@/store/useTrackDialog";
import { getChart } from "@/lib/api/chart";
import { Track } from '@/types/deezer/deezer';

import TrackSkeleton from "../loading/item/TrackSkeleton";
import TrackDialogContent from "../common/TrackDialogContent";
import TrackItem from "../common/TrackItem";

export default function TopTracksList() {
  const pathname = usePathname();
  // const [tracks, setTracks] = useState<Track[]>([]);
  const { open, track, closeDialog } = useTrackDialog();

  const { data: chartData, isLoading, error } = useQuery<Track[], Error>({
    queryKey: ['chart'],
    queryFn: () => getChart.getGlobalTracks(),
    staleTime: 1000 * 60 * 30,
  });

  useEffect(() => {
    closeDialog();
  },[pathname, closeDialog]);

  // useEffect(() => {
  //   fetch('/api/lastfm/lastfm')
  //     .then(res => {
  //       if (!res.ok) throw new Error('Failed to fetch tracks');
  //       return res.json();
  //     })
  //     .then(data => setTracks(data))
  //     .catch(err => console.error(err));
  // }, []);

  if (error) return <div>데이터 로딩 실패</div>;

  return (
    <div className='chart-section-container'>
      <h2><span>Hot</span> 트랙_맛보기.zip</h2>
      <ul className='chart-section-list-box tracklist'>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <TrackSkeleton key={i} index={i} page="home" />
            ))
          : chartData?.slice(0, 5).map((track: Track, i: number) => (
              <TrackItem
                key={track.id || i}
                track={track}
                index={i}
                page="home"
              />
            ))}
      </ul>

      <Dialog open={open} onClose={closeDialog}>
        {track && (
          <TrackDialogContent trackData={track}/>
        )}
      </Dialog>
    </div>
  );
}
