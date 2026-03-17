import { Track as LastFmTrack } from '@/pages/api/lastfm/lastfm';
import type { TrackItemData } from '@/types/trackItem';

export function mapLastFmTrack(track: LastFmTrack): TrackItemData {
  let imageUrl = '/placeholder.png';

  if (Array.isArray(track.image)) {
    const img = track.image.find(
      (img) => img.size === 'extralarge' && img['#text']
    );
    if (img) imageUrl = img['#text'];
  } else if (typeof track.image === 'string' && track.image) {
    imageUrl = track.image;
  }

  return {
    image: imageUrl,
    name: track.name,                                        // 트랙 이름
    artist: { 
      name: typeof track.artist === 'string'
        ? track.artist
        : track.artist.name,
     },  // 첫 번째 아티스트
  };
}