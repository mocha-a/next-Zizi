import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/auth.config";
import { typeMap } from "@/constants/metadata";
import prisma from "@/lib/prisma";

//type의 타입을 typeMap의 key로 정의
type TypeKey = keyof typeof typeMap; 

// 최근 기록 db저장
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
    const { type, targetId } = body as {
      type: TypeKey; 
      targetId: string;
    };

    if (!targetId) {
      return NextResponse.json(
        { message: "targetId는 필수입니다." },
        { status: 400 }
      );
    }

    const result = await prisma.recentView.upsert({
      //where : DB에서 어떤 데이터를 기준으로 찾을 거냐
      where: {
        userId_targetId_type: {
          userId: session.user.id,
          targetId,
          type : typeMap[type],
        },
      },
      update: {}, // viewedAt은 @updatedAt이라 자동 갱신됨
      create: {
        userId: session.user.id,
        targetId,
        type : typeMap[type],
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

// 최근 기록 가져오기
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") as TypeKey;

    const result = await prisma.recentView.findMany({
      where: {
        userId: session.user.id,
        type: typeMap[type],
      },
      orderBy: {
        viewedAt: "desc", // 최근 본 순
      },
      take: 20, // 최근 20개만
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