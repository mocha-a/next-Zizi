import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/auth.config';
import prisma from '@/lib/prisma';

// 마지막 접속
export async function PATCH() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      lastVisitedAt: new Date(),
    },
  });

  return NextResponse.json({ success: true });
}