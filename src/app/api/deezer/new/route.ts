import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(_: Request) {
  try {
    const { data } = await axios.get(
      'https://api.deezer.com/editorial/0/releases',
      {
        params: {
          limit: 11,
          // index: 0,
        },
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: '최신앨범 데이터 조회 실패' },
      { status: 500 }
    );
  }
}