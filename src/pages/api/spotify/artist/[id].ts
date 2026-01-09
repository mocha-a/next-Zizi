// /api/spotify/artist/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSpotifyAccessToken } from '@/lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'artist id가 필요합니다.' });
  }

  try {
    const token = await getSpotifyAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Spotify Artist 조회 실패' });
  }
}
