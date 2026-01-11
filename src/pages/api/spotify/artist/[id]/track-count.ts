// /api/spotify/artist/[id]/track-count.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Album } from '@/types/spotify';
import { getSpotifyAccessToken } from '@/lib/spotify';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'artist id 필요' });

  try {
    const token = await getSpotifyAccessToken();

    // 앨범 전체 가져오기
    let albums: Album[] = [];
    let url = `https://api.spotify.com/v1/artists/${id}/albums?limit=50`;
    while (url) {
      const albumRes = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const albumData = await albumRes.json();
      albums = albums.concat(albumData?.items);
      url = albumData?.next;
    }

    // 트랙 수 계산
    let trackCount = 0;
    await Promise.all(
      albums.map(async (album) => {
        const tracksRes = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tracksData = await tracksRes.json();
        trackCount += tracksData?.items?.length;
      })
    );

    res.status(200).json({ trackCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '발매곡 수 조회 실패' });
  }
}
