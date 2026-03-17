// /api/deezer/search.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, type, limit, index } = req.query;

  if (!query) {
    return res.status(400).json({ error: '검색어가 필요합니다.' });
  }

  const q = encodeURIComponent(query as string);
  const l = limit || 5;
  const i = index || 0;

  try {
    // 특정 타입 검색 (탭 페이지용)
    if (type) {

      const response = await fetch(
        `https://api.deezer.com/search/${type}?q=${q}&limit=${l}&index=${i}`
      );

      const data = await response.json();

      return res.status(200).json(data);
    }

    // 전체 검색 (홈 화면용)
    const [artists, tracks, albums, playlists] = await Promise.all([
      fetch(`https://api.deezer.com/search/artist?q=${q}&limit=${l}`).then(r => r.json()),
      fetch(`https://api.deezer.com/search/track?q=${q}&limit=${l}`).then(r => r.json()),
      fetch(`https://api.deezer.com/search/album?q=${q}&limit=${l}`).then(r => r.json()),
      fetch(`https://api.deezer.com/search/playlist?q=${q}&limit=${l}`).then(r => r.json())
    ]);

    return res.status(200).json({
      artists: artists.data,
      tracks: tracks.data,
      albums: albums.data,
      playlists: playlists.data
    });


  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: 'Deezer API 요청 실패'
    });

  }
}