import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const { data } = await axios.get(
      'https://api.deezer.com/genre', {
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: '전체 장르 데이터 조회 실패' },
      { status: 500 }
    );
  }
}