import { NextResponse } from 'next/server';
import axios from 'axios';

interface Props {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Props) {
  const { id } = params;

  const { searchParams } = new URL(req.url);
  const limit = searchParams.get('limit') ?? '20';
  const index = searchParams.get('index') ?? '0';

  try {
    const { data } = await axios.get(
      `https://api.deezer.com/artist/${id}/albums`,
      {
        params: {
          limit,
          index,
        },
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Album 조회 실패' },
      { status: 500 }
    );
  }
}