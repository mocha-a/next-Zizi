import TrackSkeleton from '@/components/loading/item/TrackSkeleton';
import { getChart } from '@/lib/api/chart';
import { Track } from '@/types/deezer/deezer';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TrackSelectItem from '../ui/TrackSelectItem';
import { useTrackStore } from '@/store/useSelectedTrackStore';

const Recommendation = () => {
  const toggleSelect = useTrackStore(state => state.toggleSelect);
  const selectedIds = useTrackStore(state => state.selectedIds);

  const { data, isLoading, error } = useQuery<Track[], Error>({
    queryKey: ['Recommendation'],
    queryFn: () => getChart.getGlobalTracks(),
    staleTime: 1000 * 60 * 30,
  });

  return (
    <ul className='chart-section-list-box tracklist'>
      {isLoading
        ? Array.from({ length: 20 }).map((_, i) => (
            <TrackSkeleton key={i} index={i} />
          ))
        : data?.map((track: Track) => (
            <TrackSelectItem
              key={track.id}
              track={track}
              isSelected={selectedIds.includes(track.id)}
              onToggle={() => toggleSelect(track)}
            />
          ))}
    </ul>
  );
};

export default Recommendation;