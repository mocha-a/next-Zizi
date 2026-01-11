// /api/spotify/artist/[id]/albums.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSpotifyAccessToken } from '@/lib/spotify';
import type { Album } from '@/types/spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'artist id 필요' });

  try {
    const token = await getSpotifyAccessToken();
    let albums: Album[] = [];
    let url = `https://api.spotify.com/v1/artists/${id}/albums?limit=50`;

    while (url) {
      const albumRes = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const albumData = await albumRes.json();
      albums = albums.concat(albumData.items);
      url = albumData.next;
    }

    res.status(200).json({ albums });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '앨범 조회 실패' });
  }
}