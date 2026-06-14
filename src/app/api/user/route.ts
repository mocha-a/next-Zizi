import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import prisma from '@/lib/prisma';
import { authOptions } from "@/auth.config";

// 회원탈퇴
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });

    return NextResponse.json({
      message: '회원탈퇴 완료',
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: '회원탈퇴 실패' },
      { status: 500 }
    );
  }
}