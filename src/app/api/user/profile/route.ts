import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/auth.config";
import prisma from '@/lib/prisma';

// 프로필 가져오기
export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          name: true,
          nickname: true,
          email: true,
          image: true,
          birth: true,
          gender: true,
          createdAt: true,
          lastVisitedAt: true,
        }
    });

    return NextResponse.json(user);
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    const { nickname, birth, gender } = body;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { nickname, birth, gender },
    });

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}