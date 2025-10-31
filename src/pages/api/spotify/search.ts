// /api/spotify/search.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSpotifyAccessToken } from '@/lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, type, limit } = req.query;

  if (!query) return res.status(400).json({ error: '검색어(q)가 필요합니다.' });

  try {
    const token = await getSpotifyAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query as string
      )}&type=${type || 'artist,album,track,playlist'}&limit=${limit || 5}`,
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
    res.status(500).json({ error: 'Spotify API 요청 실패' });
  }
}
