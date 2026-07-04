'use client';
import React from 'react';
import { SearchTrack } from '@/types/deezer/search';
import TrackItem from '@/components/common/TrackItem';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';
import SectionHeader from '../../ui/SectionHeader';
import EmptyState from '@/components/common/EmptyState';

interface Props {
  data: SearchTrack[];
  loading: boolean;
  query: string
}

const TrackSection = ({ data, loading, query }: Props) => {
  return (
    <div className='allReslts allReslts-track tracklist'>
      <SectionHeader title="곡" type="track" />

      {loading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <TrackSkeleton key={`track-skeleton-${i}`} index={i} />
        ))
      ) : data.length > 0 ? (
        data.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={index}
          />
        ))
      ) : (
        <EmptyState
          title="🎵"
          keyword={query}
          description={`와 \n 일치하는 곡이 없어 இᯅஇ`}
          className="search-results"
        />
      )}
    </div>
  );
};

export default TrackSection;