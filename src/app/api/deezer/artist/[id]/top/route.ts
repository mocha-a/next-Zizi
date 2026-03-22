import { NextResponse } from 'next/server';
import axios from 'axios';

interface Props {
  params: {
    id: string;
  };
}

export async function GET(_: Request, { params }: Props) {
  const { id } = params;

  try {
    const { data } = await axios.get(
      `https://api.deezer.com/artist/${id}/top`,
        {
          params: { limit: 50 },
        }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Top tracks 조회 실패' },
      { status: 500 }
    );
  }
}