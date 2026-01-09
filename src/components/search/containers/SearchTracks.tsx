'use client';

import Tracks from '@/components/entities/track/ui/TrackList';
import { useSearchStore } from '@/store/searchStore';

const SearchTracks = () => {
  const { trackResults, loadMore, loading, hasMore } = useSearchStore();

  return (
    <Tracks
      tracks={trackResults}
      loading={loading}
      hasMore={hasMore.track}
      onLoadMore={() => loadMore('track', 50)}
    />
  );
};

export default SearchTracks;
