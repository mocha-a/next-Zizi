import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// 비밀번호 찾기 본인 확인
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { username, securityQuestion, securityAnswer } = body;

    // 필수값 체크
    if (!username || !securityQuestion || !securityAnswer) {
      return NextResponse.json(
        { message: '필수값을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    // 아이디로 회원 조회
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // 회원이 존재하지 않는 경우
    if (!user) {
      return NextResponse.json(
        { message: '아이디 또는 비밀번호 찾기 정보가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // 비밀번호 찾기 답변이 없는 경우
    if (!user.securityAnswer) {
      return NextResponse.json(
        { message: '아이디 또는 비밀번호 찾기 정보가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // 비밀번호 찾기 질문 확인
    if (user.securityQuestion !== securityQuestion) {
      return NextResponse.json(
        { message: '아이디 또는 비밀번호 찾기 정보가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // 암호화된 답변 비교
    const isAnswerMatch = await bcrypt.compare(
      securityAnswer,
      user.securityAnswer
    );

    if (!isAnswerMatch) {
      return NextResponse.json(
        { message: '아이디 또는 비밀번호 찾기 정보가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // 본인 확인 성공
    return NextResponse.json(
      {
        success: true,
        message: '본인 확인이 완료되었습니다.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('비밀번호 찾기 본인 확인 에러:', error);

    return NextResponse.json(
      { message: '비밀번호 찾기에 실패했습니다.' },
      { status: 500 }
    );
  }
}