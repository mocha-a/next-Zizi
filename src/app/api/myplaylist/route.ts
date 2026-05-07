import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";
import { Track } from "@/types/deezer/deezer";
import prisma from "@/lib/prisma";

// 내 플리 저장
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const body = await req.json();
    const { title, description, thumbnails, tracks } = body;

    if (!title || !tracks || tracks.length === 0) {
      return NextResponse.json(
        { message: "필수값 누락" },
        { status: 400 }
      );
    }

    const playlist = await prisma.playlist.create({
      data: {
        title,
        description,
        userId,
        thumbnails,
        tracks: {
          create: tracks.map((track: Track, index: number) => ({
            trackId: String(track.id),
            order: index,
          })),
        },
      },
      
      include: {
        tracks: true,
      },
    });

    return NextResponse.json(playlist, { status: 201 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "서버 에러" },
      { status: 500 }
    );
  }
}

// 내 플리 목록
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const playlists = await prisma.playlist.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        user: true,
        tracks: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(playlists);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: '플레이리스트 조회 실패' },
      { status: 500 }
    );
  }
}