import type { NextApiRequest, NextApiResponse } from 'next';
import { getSpotifyAccessToken } from '@/lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const limit = Number(req.query.limit) || 10;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'track id 필요' });
  }

  try {
    const token = await getSpotifyAccessToken();

    /* 1. 추천(비슷한 곡) 조회 */
    const recRes = await fetch(
      `https://api.spotify.com/v1/recommendations?seed_tracks=${id}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!recRes.ok) {
      return res.status(recRes.status).json({
        error: 'Spotify 추천 곡 조회 실패',
      });
    }

    const recData = await recRes.json();

    /* 2. 필요한 데이터만 정리해서 반환 */
    res.status(200).json({
      seedTrackId: id,
      tracks: recData.tracks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '추천 곡 조회 실패' });
}
}
