'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TrackList from '@/components/entities/track/ui/TrackList';
import { Track } from '@/types/spotify';

interface ArtistTopTracksProps {
  id: string;
}

const ArtistTracks = ({ id }: ArtistTopTracksProps) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false); // Top Tracks는 고정 10곡
  const router = useRouter();

  const fetchTracks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/spotify/artist/${id}/track`);
      setTracks(res.data.tracks);
      setHasMore(false); // Top Tracks는 10곡 고정이라 더 없음
    } catch (err) {
      console.error('대표곡 조회 실패', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, [id]);

  console.log(tracks);
  console.log(id);

  return (
    <TrackList
      tracks={tracks}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={() => {}} // Top Tracks는 추가 로딩 없음
    />
  );
};

export default ArtistTracks;
