import type { NextApiRequest, NextApiResponse } from 'next';
import { getSpotifyAccessToken } from '@/lib/spotify';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

interface Album {
  id: string;
  name: string;
  release_date: string;
  total_tracks: number;
  artists: { name: string }[];
  images: { url: string; height: number; width: number }[];
}

interface NewReleasesResponse {
  albums: {
    items: Album[];
    total: number;
    limit: number;
    offset: number;
    href: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const accessToken = await getSpotifyAccessToken();

    const apiRes = await fetch(
      `${SPOTIFY_API_URL}/browse/new-releases?country=KR&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!apiRes.ok) {
      const err = await apiRes.json();
      return res
        .status(apiRes.status)
        .json({ error: err.error || 'Failed to fetch new releases' });
    }

    const data: NewReleasesResponse = await apiRes.json();
    res.status(200).json(data);

  } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}


// last.fm API의 아티스트 및 트랙 이름을 이용해 앨범 커버 이미지 URL 가져오기
export async function searchSpotifyForAlbumCover(
  artistName: string, trackName: string
) : Promise<string | null> {
  try {
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) return null;

    const query = `track:"${trackName}" artist:"${artistName}"`;

    const apiRes = await fetch(
      `${SPOTIFY_API_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 60 * 60 * 24 } // 24시간 캐싱
      } 
    );

    if (!apiRes.ok) return null;

    const data = await apiRes.json();
    const firstTrack = data.tracks?.items[0];
    
    if (firstTrack && firstTrack.album && firstTrack.album.images.length > 0) {
        return firstTrack.album.images[2].url; // 이미지 추출
    }

    return null;
  } catch (err) {
    console.error('Spotify track search error:', err);
    return null;
  }
}
