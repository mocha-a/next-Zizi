import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genreId = searchParams.get('genreId');

  try {
    let targetUrl = 'https://api.deezer.com/chart/0/tracks';

    if( genreId && genreId !== '0' ){
      targetUrl = `https://api.deezer.com/editorial/${genreId}/charts`;
    }

    const { data } = await axios.get(targetUrl, {
      params: {limit: 50,},
    });

    const result = genreId ? data.tracks : data;

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: '차트 데이터 조회 실패' },
      { status: 500 }
    );
  }
}