// /api/spotify/artist/[id]/albums.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSpotifyAccessToken } from '@/lib/spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, offset = '0' } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'artist id 필요' });
  }

  const limit = 50;

  try {
    const token = await getSpotifyAccessToken();

    const url = `https://api.spotify.com/v1/artists/${id}/albums?limit=${limit}&offset=${offset}`;

    const albumRes = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await albumRes.json();

    res.status(200).json({
      items: data.items,
      next: data.next,        // 다음 페이지 존재 여부
      total: data.total,      // 전체 앨범 수
      offset: data.offset,
      limit: data.limit,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '앨범 조회 실패' });
  }
}
