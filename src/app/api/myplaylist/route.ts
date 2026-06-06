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

    const lastPlaylist = await prisma.playlist.findFirst({
      where: {
        userId,
      },
      orderBy: {
        order: 'desc',
      },
    });

    const playlist = await prisma.playlist.create({
      data: {
        title,
        description,
        userId,
        thumbnails,

        order: lastPlaylist
          ? lastPlaylist.order + 1
          : 0,
        updatedAt: new Date(),
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
        order: 'asc',
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

// 내 플리 삭제
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const body = await req.json();
    const ids: number[] = body.ids;

    // 내 플리만 찾기
    const playlists = await prisma.playlist.findMany({
      where: {
        id: { in: ids }, userId,
      },
      select: {
        id: true,
      },
    });

    const validIds = playlists.map((playlist) => playlist.id);

    await prisma.playlistTrack.deleteMany({
      where: {
        playlistId: {
          in: validIds,
        },
      },
    });

    await prisma.playlist.deleteMany({
      where: {
        id: { in: validIds }, userId,
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: '삭제 실패' },
      { status: 500 }
    );
  }
}

// 내 플리 순서 저장
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const body = await req.json();

    const playlists: {
      id: number;
      order: number;
    }[] = body.playlists;

    await Promise.all(
      playlists.map((playlist) =>
        prisma.playlist.updateMany({
          where: {
            id: playlist.id,
            userId,
          },
          data: {
            order: playlist.order,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: '순서 저장 실패' },
      { status: 500 }
    );
  }
}