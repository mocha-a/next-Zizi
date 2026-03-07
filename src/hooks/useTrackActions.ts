import { useState } from 'react';
import { mapLastFmTrack } from '@/types/trackMapperForLastFm';
import { TrackItemData, PlayableTrack } from '@/types/trackItem';

export default function useTrackActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackItemData | null>(null);

  const handleYouTubeSearch = ({ artist, name }: PlayableTrack) => {
    const query = `${artist.name} ${name}`;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenDialog = (track: unknown) => {
    const popupTrack = mapLastFmTrack(track as any);
    setSelectedTrack(popupTrack);
    setIsOpen(true);
  };

  return {
    isOpen,
    selectedTrack,
    setIsOpen,
    handleYouTubeSearch,
    handleOpenDialog,
  };
}
