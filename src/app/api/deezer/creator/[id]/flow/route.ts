import { NextResponse } from 'next/server';
import axios from 'axios';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;

  try {
    const { data } = await axios.get(
      `https://api.deezer.com/user/${id}/flow`
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'flow 조회 실패' },
      { status: 500 }
    );
  }
}