import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    console.log(body);
    if (!body || !body.name || !body.email || !body.userId) {
      return NextResponse.json(
        {
          ok: false,
          message: "데이터 입력이 제대로 되지 않았습니다.",
        },
        { status: 400 }
      );
    }
    const hashPassword = await bcrypt.hash(body.password, 10);
    await prisma.user.create({
      data: {
        userId: body.userId,
        name: body.name,
        password: hashPassword,
        email: body.email,
      },
    });
    return NextResponse.json({
      ok: true,
      message: "정상적으로 아이디가 생성되었습니다.",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 400 }
      );
    }
  }
}
