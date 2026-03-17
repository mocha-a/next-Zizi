import { authOptions } from "@/auth.config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

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
    const { birth, gender } = body;

    await prisma.user.update({
      where: { id: session.user.id },
      data: { birth, gender },
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
            name: true,
            email: true,
            birth: true,
            gender: true,
        },
    });

    return NextResponse.json(user);
}