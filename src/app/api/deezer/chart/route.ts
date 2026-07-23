import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genreId = searchParams.get('genreId');
  const type = searchParams.get('type') || 'tracks'; // track or playlists
  const index = searchParams.get('index') || '0';
  const limit = searchParams.get('limit') || '50';

  try {
    let targetUrl = ( genreId && genreId !== '0' )
    ? `https://api.deezer.com/editorial/${genreId}/charts` // 장르별 차트
    : 'https://api.deezer.com/chart/0';                    // 기본 차트

    const { data } = await axios.get(targetUrl, {
      params: {
        index,
        limit,
      },
    });

    let result;
    if (type === 'playlists') {
      result = data.playlists;
    } else {
      result = data.tracks;
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: '차트 데이터 조회 실패' },
      { status: 500 }
    );
  }
}