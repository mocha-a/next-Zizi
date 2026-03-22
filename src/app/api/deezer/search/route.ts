import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  // URL에서 쿼리 파라미터 추출 (Request 객체 활용)
  const { searchParams } = new URL(request.url);

  const query = searchParams.get('query');
  const type = searchParams.get('type');
  const limit = searchParams.get('limit') || '5';
  const index = searchParams.get('index') || '0';

  // 유효성 검사
  if (!query) {
    return NextResponse.json(
      { error: '검색어가 필요합니다.' }, 
      { status: 400 });
  }

  try {
    // 타입 검색
    if (type) {
      const { data } = await axios.get( `https://api.deezer.com/search/${type}`,
        {
          params: {
            q: query,
            limit,
            index,
          },
        }
      );

      return NextResponse.json(data);
    }

    // 전체 검색
    const [artists, tracks, albums, playlists] = await Promise.all([
      axios.get('https://api.deezer.com/search/artist', {
        params: { q: query, limit },
      }),
      axios.get('https://api.deezer.com/search/track', {
        params: { q: query, limit },
      }),
      axios.get('https://api.deezer.com/search/album', {
        params: { q: query, limit },
      }),
      axios.get('https://api.deezer.com/search/playlist', {
        params: { q: query, limit },
      }),
    ]);

    return NextResponse.json({
      artists: artists.data.data,
      tracks: tracks.data.data,
      albums: albums.data.data,
      playlists: playlists.data.data,
    });


  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Deezer API 요청 실패' }, 
      { status: 500 }
    );
  }
}