import { NextResponse } from 'next/server';
import axios from 'axios';

interface Props {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;

  try {
    const { data } = await axios.get(
      `https://api.deezer.com/artist/${id}`
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Artist 조회 실패' },
      { status: 500 }
    );
  }
}