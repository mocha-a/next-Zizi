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

    if (!playlist) {
      return NextResponse.json(
        { message: '플레이리스트 없음' },
        { status: 404 }
      );
    }

    // Deezer API로 트랙 상세 정보 
    // lib/api/track.ts에 있는 getTrack()함수를 사용하려고 했으나, 서버에서는 /api 경로 불가로 직접 호출
    const getTrack = async (id: number) => {
      const res = await fetch(`https://api.deezer.com/track/${id}`);
      return res.json();
    };

    // 서버에서 deezer api 호출하여 트랙 정보 병합
    const tracksWithDetail = await Promise.all(
      playlist.tracks.map(async (track) => {
        const detail = await getTrack(Number(track.trackId));

        return {
          ...detail,
          trackId: track.trackId,
          order: track.order,
        };
      })
    );

    return NextResponse.json({
      ...playlist,
      tracks: tracksWithDetail,
    });

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