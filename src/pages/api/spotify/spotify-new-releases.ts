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
