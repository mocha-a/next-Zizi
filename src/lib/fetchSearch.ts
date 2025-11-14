import axios from 'axios';
import { AllResults, Artist, Album, Track, Playlist } from '@/types/spotify';

export const fetchSearch = async (
  query: string,
  type?: string,
  limit: number = 50,
  offset: number = 0
): Promise<AllResults> => {
  const { data } = await axios.get('/api/spotify/search', {
    params: { query, type, limit, offset },
  });

  const cleanData: AllResults = {
    artists: data.artists
      ? { items: data.artists.items.filter((item): item is Artist => item != null) }
      : undefined,
    albums: data.albums
      ? { items: data.albums.items.filter((item): item is Album => item != null) }
      : undefined,
    tracks: data.tracks
      ? { items: data.tracks.items.filter((item): item is Track => item != null) }
      : undefined,
    playlists: data.playlists
      ? { items: data.playlists.items.filter((item): item is Playlist => item != null) }
      : undefined,
  };

  return cleanData;
};
