import type { NextApiRequest, NextApiResponse } from 'next';
import { getSpotifyAccessToken } from '@/lib/spotify';
import type { Track } from '@/types/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'artist id 필요' });
  }

  try {
    const token = await getSpotifyAccessToken();

    // Spotify: 아티스트 대표곡 (Top Tracks)
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=KR`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Spotify API error');
    }

    const data = await response.json();

    // 필요하면 여기서 가공 가능
    const tracks: Track[] = data.tracks;

    res.status(200).json({ tracks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '아티스트 곡 조회 실패' });
  }
}