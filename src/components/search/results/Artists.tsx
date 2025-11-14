'use client';
import React, { useEffect } from 'react';
import { useSearchStore } from '@/store/searchStore';
import ArtistCard from '../card/ArtistCard';

const Artists = () => {
  const { artistResults, fetchSectionIfNeeded } = useSearchStore();

  useEffect(() => {
    fetchSectionIfNeeded('artist');
  }, []);

  if (!artistResults) return <div>로딩 중...</div>;

  console.log(artistResults);

  return (
    <div className='artist-container'>
      {artistResults.map((artist) => (
        <ArtistCard name={artist.name} imageUrl={artist.images[0]?.url} key={artist.id} genres={artist.genres} popularity={artist.popularity}/>
      ))}
    </div>
  )
}

export default Artists