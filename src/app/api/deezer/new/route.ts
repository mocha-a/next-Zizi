import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const { data } = await axios.get(
      'https://api.deezer.com/editorial/0/releases', {
        params: {limit: 15,}, // 데이터 누락 방지를 위해 표시할 데이터 보다 더 많이 호출
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: '최신앨범 데이터 조회 실패' },
      { status: 500 }
    );
  }
}