import type { NextApiRequest, NextApiResponse } from 'next';
import type { EntityBase } from '@/types/spotify';
import { getSpotifyAccessToken } from '@/lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'album id 필요' });
  }

  try {
    const token = await getSpotifyAccessToken();

    /* 1. 앨범 조회 */
    const albumRes = await fetch(
      `https://api.spotify.com/v1/albums/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!albumRes.ok) {
      return res.status(albumRes.status).json({
        error: 'Spotify 앨범 조회 실패',
      });
    }

    const albumData = await albumRes.json();

    /* 2. artists에 images 붙이기 */
    const artistsWithImages = await Promise.all(
      albumData.artists.map(async (artist: EntityBase) => {
        try {
          const artistRes = await fetch(
            `https://api.spotify.com/v1/artists/${artist.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!artistRes.ok) {
            return {
              ...artist,
              images: [],
            };
          }

          const artistData = await artistRes.json();

          return {
            ...artist,
            images: artistData.images ?? [],
          };
        } catch {
          return {
            ...artist,
            images: [],
          };
        }
      })
    );

    /* 3. 인터페이스 구조에 맞게 반환 */
    res.status(200).json({
      ...albumData,
      artists: artistsWithImages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '앨범 조회 실패' });
  }
}
