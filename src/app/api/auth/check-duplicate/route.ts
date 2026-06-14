import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { type, value } = await req.json();

    if (!type || !value) {
      return NextResponse.json(
        { message: '필수값이 누락되었습니다.' },
        { status: 400 }
      );
    }

    let user = null;

    switch (type) {
      case 'email':
        user = await prisma.user.findUnique({
          where: { email: value },
        });
        break;

      case 'username':
        user = await prisma.user.findUnique({
          where: { username: value },
        });
        break;

      default:
        return NextResponse.json(
          { message: '잘못된 타입입니다.' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      available: !user, // true = 사용 가능
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: '서버 오류' },
      { status: 500 }
    );
  }
}