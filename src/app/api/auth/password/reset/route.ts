import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// 비밀번호 재설정
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, newPassword } = body;

    // 필수값 체크
    if (!username || !newPassword) {
      return NextResponse.json(
        { message: '필수값을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 회원 조회
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // 회원이 존재하지 않는 경우
    if (!user) {
      return NextResponse.json(
        { message: '비밀번호 변경에 실패했습니다.' },
        { status: 404 }
      );
    }

    // 새 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 비밀번호 변경
    await prisma.user.update({
      where: { username },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      {
        success: true,
        message: '비밀번호가 변경되었습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('비밀번호 재설정 에러:', error);

    return NextResponse.json(
      { message: '비밀번호 변경에 실패했습니다.' },
      { status: 500 }
    );
  }
}