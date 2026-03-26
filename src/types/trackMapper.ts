import { Track as SpotifyTrack } from '@/types/spotify';

export interface TrackItemData {
  image: string;
  name: string;
  artist: { name: string };
}

export function MapTrack(track: SpotifyTrack): TrackItemData {
  return {
    image: track.album.images[0]?.url || '/placeholder.png', // 앨범 이미지
    name: track.name,                                        // 트랙 이름
    artist: { name: track.artists[0]?.name || 'Unknown' },  // 첫 번째 아티스트
  };
}