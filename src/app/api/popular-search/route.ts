import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

// 인기검색어 저장
export async function POST(req: Request) {
  const body = await req.json();

  const keyword = body.keyword?.trim().toLowerCase();

  if (!keyword) {
    return NextResponse.json(
      { message: '검색어가 없습니다.' },
      { status: 400 }
    );
  }

  await prisma.popularSearch.upsert({
    where: {
      keyword,
    },
    update: {
      count: {
        increment: 1,
      },
    },
    create: {
      keyword,
    },
  });

  return NextResponse.json({ success: true });
}

// 인기검색어 조회
export async function GET() {
  const keywords = await prisma.popularSearch.findMany({
    orderBy: {
      count: 'desc',
    },
    take: 10,
  });

  return NextResponse.json(keywords);
}