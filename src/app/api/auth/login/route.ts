import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs'; // 비밀번호 암호화 + 비교

// 로그인
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { message: '필수값이 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 1. 유저 찾기
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: '존재하지 않는 아이디입니다.' },
        { status: 404 }
      );
    }

    // 2. 소셜 로그인 계정 체크 (password 없는 경우)
    if (!user.password) {
      return NextResponse.json(
        { message: '소셜 로그인으로 가입된 계정입니다.' },
        { status: 400 }
      );
    }

    // 3. 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: '비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // 4. 성공 (여기서 JWT or session 처리 가능)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        nickname: user.nickname,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: '로그인 실패' },
      { status: 500 }
    );
  }
}