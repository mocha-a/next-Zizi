import type { NextApiRequest, NextApiResponse } from 'next';
import { getSpotifyAccessToken } from '@/lib/spotify';

interface Album {
  id: string;
  name: string;
  release_date: string;
  total_tracks: number;
  artists: { name: string }[];
  images: { url: string; height: number; width: number }[];
}

interface MoodTracksResponse {
  playlists: {
    items: Album[];
    total: number;
    limit: number;
    offset: number;
    href: string;
  };
}

interface Category {
  id: string;
  name: string;
  href: string;
}

interface MoodResponse {
    categories: {
        items: Category[];
        total: number;
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { mood } = req.query;
  try {
    const accessToken = await getSpotifyAccessToken();

    // 1. 카테고리 목록 가져오기
    const categoryRes = await fetch(
        'https://api.spotify.com/v1/browse/categories?limit=50&locale=*',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    const moodData: MoodResponse = await categoryRes.json();

    // 2. 특정 무드 플레이리스트 가져오기
    let playlistData: MoodTracksResponse | null = null;
    if (mood) {
        const apiRes = await fetch(
          `https://api.spotify.com/v1/browse/categories/${mood}/playlists`,
          {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!apiRes.ok) {
          const err = await apiRes.json();
          return res.status(apiRes.status).json({ 
            error: err.error || 'Failed to fetch mood tracks'
          });
        }

        playlistData = await apiRes.json();
    }

    // 3. JSON 응답
    res.status(200).json({
        categoryRes: moodData.categories,
        playlists: playlistData ? playlistData.playlists : null,
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
}
