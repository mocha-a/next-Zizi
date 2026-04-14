import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/auth.config";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions); //next-auth에서 현재 로그인 유저 가져옴

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json(); //프론트에서 데이터 받음
    const { targetId, type } = body;

    if (!targetId || !type) {
      return NextResponse.json(
        { message: "targetId와 type은 필수입니다." },
        { status: 400 }
      );
    }

    const result = await prisma.recentView.upsert({
      where: {
        userId_targetId_type: {
          userId: session.user.id,
          targetId,
          type,
        },
      },
      update: {}, // viewedAt은 @updatedAt이라 자동 갱신됨
      create: {
        userId: session.user.id,
        targetId,
        type,
      },
    });

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}