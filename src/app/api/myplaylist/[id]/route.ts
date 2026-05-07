import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Props {
  params: { id: string };
}

// 내 플리 id기준으로 가져오기
export async function GET(_req: Request, { params }: Props) {
  try {
    const playlist = await prisma.playlist.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        user: true,
        tracks: true,
      },
    });

    return NextResponse.json(playlist);

  } catch (error) {
    console.error(error);
    
    return NextResponse.json(
      { message: '조회 실패' },
      { status: 500 }
    );
  }
}