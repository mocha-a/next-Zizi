'use client';

import React, { useEffect } from 'react';
import { useSearchStore } from '@/store/searchStore';
import ArtistCard from '../card/ArtistCard';
import InfiniteScroll from '../InfiniteScroll';

const Artists = () => {
  const { artistResults, fetchSectionIfNeeded } = useSearchStore();

  useEffect(() => {
    fetchSectionIfNeeded('artist');
  }, []);

  if (!artistResults) return <div>로딩 중...</div>;

  return (
    <InfiniteScroll type="artist">
      {artistResults.map((artist) => (
        <ArtistCard 
          key={artist.id}
          name={artist.name} 
          imageUrl={artist.images[0]?.url} 
          genres={artist.genres} 
          popularity={artist.popularity}
        />
      ))}
    </InfiniteScroll>
  )
}

export default Artists