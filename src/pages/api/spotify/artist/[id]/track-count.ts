// /api/spotify/artist/[id]/track-count.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Album } from '@/types/spotify';
import { getSpotifyAccessToken } from '@/lib/spotify';

type ArtistAlbumsResponse = {
  items: Album[];
  next: string | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'artist id 필요' });
  }

  try {
    const token = await getSpotifyAccessToken();

    let albums: Album[] = [];
    let url: string | null =
    `https://api.spotify.com/v1/artists/${id}/albums?` +
    `include_groups=album,single&limit=50`;
    //정규앨범 + 싱글앨범만 조회

    while (url) {
      const albumRes: Response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!albumRes.ok) {
        throw new Error('앨범 조회 실패');
      }

      const albumData = (await albumRes.json()) as ArtistAlbumsResponse;

      albums = albums.concat(albumData.items ?? []);
      url = albumData.next;
    }

    //Album.total_tracks 사용
    const trackCount = albums.reduce(
      (sum, album) => sum + (album.total_tracks ?? 0),
      0
    );

    return res.status(200).json({ trackCount });
  } catch (error) {
    console.error('track-count error:', error);
    return res.status(500).json({ error: '발매곡 수 조회 실패' });
  }
}
