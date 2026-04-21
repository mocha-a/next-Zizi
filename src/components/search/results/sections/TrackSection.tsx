'use client';
import React from 'react';
import { SearchTrack } from '@/types/deezer/search';
import TrackItem from '@/components/common/TrackItem';
import TrackSkeleton from '@/components/loading/item/TrackSkeleton';
import SectionHeader from '../../ui/SectionHeader';

interface Props {
  data: SearchTrack[];
  loading: boolean;
}

const TrackSection = ({ data, loading }: Props) => {
  return (
    <div className='allReslts allReslts-track tracklist'>
      <SectionHeader title="곡" targetIndex={2} type="track" />

      {/* 로딩 상태 */}
      {loading &&
        Array.from({ length: 5 }).map((_, i) => (
          <TrackSkeleton key={`track-skeleton-${i}`} index={i} />
        ))
      }

      {/* 실제 데이터 */}
      {!loading &&
        data.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={index}
            page=""
          />
        ))
      }
    </div>
  );
};

export default TrackSection;