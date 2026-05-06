import { NextResponse } from "next/server";
import { Track } from "@/types/deezer/deezer";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, tracks, userId } = body;

    if (!title || !tracks || tracks.length === 0) {
      return NextResponse.json(
        { message: "필수값 누락" },
        { status: 400 }
      );
    }

    // ✅ Playlist + PlaylistTrack 한 번에 생성
    const playlist = await prisma.playlist.create({
      data: {
        title,
        description,
        userId,

        tracks: {
          create: tracks.map((track: Track, index: number) => ({
            trackId: String(track.id), // 👉 Deezer id string 맞춰줌
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