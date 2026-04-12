import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const { data } = await axios.get(
      `https://api.deezer.com/track/${id}`
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'track 조회 실패' },
      { status: 500 }
    );
  }
}