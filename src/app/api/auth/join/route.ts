import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'; // 비밀번호 암호화 + 비교

// 회원가입
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, username, password, email, nickname, birth, gender } = body;

    // 필수값 체크
    if (!username || !password || !email) {
      return NextResponse.json(
        { message: '필수값이 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 아이디 중복 체크
    const existUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existUsername) {
      return NextResponse.json(
        { message: '이미 사용 중인 아이디입니다.' },
        { status: 409 }
      );
    }

    // 이메일 중복 체크
    const existEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existEmail) {
      return NextResponse.json(
        { message: '이미 가입된 이메일입니다.' },
        { status: 409 }
      );
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 회원 생성
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        nickname,
        birth,
        gender,
      },
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          nickname: user.nickname,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('회원가입 에러:', error);

    return NextResponse.json(
      { message: '회원가입에 실패했습니다.' },
      { status: 500 }
    );
  }
}