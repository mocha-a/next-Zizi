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

// 내 플리 수정
export async function PATCH(req: Request, { params }: Props) {
  try {
    const body = await req.json();
    
    const { title, description, thumbnails, tracks } = body;

    const playlistId = Number(params.id);

    // 플레이리스트 정보 수정
    await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        title,
        description,
        thumbnails,
        updatedAt: new Date(),
      },
    });

    // 기존 곡 삭제
    await prisma.playlistTrack.deleteMany({
      where: { playlistId },
    });

    // 새 곡 다시 저장
    await prisma.playlistTrack.createMany({
      data: tracks.map(
        (
          track: { id: number },
          index: number
        ) => ({
          playlistId,
          trackId: String(track.id),
          order: index,
        })
      ),
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: '플레이리스트 수정 실패' },
      { status: 500 }
    );
  }
}