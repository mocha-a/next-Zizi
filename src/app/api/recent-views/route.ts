import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
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

    if (!/^\d+$/.test(targetId)) {
      return NextResponse.json(
        { message: "targetId는 숫자만 가능합니다." },
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

    // 같은 타입의 최신 20개만 유지
    const MAX_RECENT = 20;

    const oldViews = await prisma.recentView.findMany({
      where: {
        userId: session.user.id,
        type: typeMap[type],
      },
      orderBy: {
        viewedAt: 'desc',
      },
      skip: MAX_RECENT,
      select: {
        id: true,
      },
    });

    if (oldViews.length > 0) {
      await prisma.recentView.deleteMany({
        where: {
          id: {
            in: oldViews.map(item => item.id),
          },
        },
      });
    }

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Deezer에서 최근 기록 상세 정보 가져오기
export const getRecentDetail = async ( type: TypeKey, targetId: string ) => {
  let endpoint = '';

  switch (type) {
    case 'track':
      endpoint = `https://api.deezer.com/track/${targetId}`;
      break;

    case 'album':
      endpoint = `https://api.deezer.com/album/${targetId}`;
      break;

    case 'artist':
      endpoint = `https://api.deezer.com/artist/${targetId}`;
      break;

    case 'playlist':
      endpoint = `https://api.deezer.com/playlist/${targetId}`;
      break;

    default:
      throw new Error(`지원하지 않는 타입: ${type}`);
  }

  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error(`${type} 조회 실패`);
  }

  return res.json();
};

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

    const recentWithDetail = await Promise.all(
      result.map(async (item) => {
        const detail = await getRecentDetail(
          type,
          item.targetId
        );

        return {
          ...detail,
          recentId: item.id,
          viewedAt: item.viewedAt,
        };
      })
    );

    return NextResponse.json(
      recentWithDetail,
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}