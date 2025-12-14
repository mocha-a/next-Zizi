'use client';

import React, { useEffect, useState } from 'react';
import { useSearchStore } from '@/store/searchStore';
import PlaylistCard from '../card/PlaylistCard';

import SortSelect from '@/components/common/SortSelect';
import { sortBy } from '@/lib/sortBy';
import type { PlaylistSortType } from '@/types/sort';

const Playlists = () => {
    const { playlistResults, fetchSectionIfNeeded } = useSearchStore();
    const [ sortType, setSortType ] = useState<PlaylistSortType>(null);

    const playlistSortOptions = [
      { label: '가나다 순', value: 'name' },
      { label: '곡 많은 순', value: 'tracks' },
    ] as const
  
    useEffect(() => {
      fetchSectionIfNeeded('playlist');
    }, []);
  
    if (!playlistResults) return <div>로딩 중...</div>;
  
    const sortedPlaylists = sortType
      ? sortBy(
          playlistResults,
          (playlist) => {
            switch (sortType) {
              case 'name':
                return playlist.name
              case 'tracks':
                return playlist.tracks.total
            }
          },
          sortType === 'tracks' ? 'desc' : 'asc'
        )
      : playlistResults

  return (
    <div>
      <SortSelect
        value={sortType}
        options={playlistSortOptions}
        onChange={setSortType}
      />
      <div className='playlist-container'>
        {sortedPlaylists.map((playlist)=>
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
            images={playlist.images}
            name={playlist.name}
            owner={playlist.owner}
            tracks={playlist.tracks}
          />
        )}
      </div>
    </div>
  )
}

export default Playlists