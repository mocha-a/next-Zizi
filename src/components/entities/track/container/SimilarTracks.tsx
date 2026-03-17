import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SearchTrack } from '@/types/deezer/search';

interface Props {
  id: string;
}

const SimilarTracks = ({ id }: Props) => {
  const [ track, setTrack ] = useState<SearchTrack[]>([]);
  const [ hasMore, setHasMore ] = useState(false); // Top Tracks는 고정 10곡

  const similar = async () => {
    try {
      const res = await axios.get(`/api/spotify/track/${id}/recommendations?limit=12`);
      setTrack(res.data.tracks);
      setHasMore(false);
    } catch (err) {
      console.error('대표곡 조회 실패', err);
    }
  };

  useEffect(()=>{
    similar();
  },[])

  console.log(track);

  return (
    <div>SimilarTracks</div>
  )
}

export default SimilarTracks