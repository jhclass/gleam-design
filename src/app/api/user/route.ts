import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/verifyToken";
export async function GET(req: NextRequest) {
  try {
    const context = verifyToken(req);
    console.log(context, "context");

    const allUserData = await prisma.user.findMany();
    console.log(allUserData);
    return NextResponse.json({ ok: true, data: allUserData });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "jwt expired") {
        return NextResponse.json(
          {
            ok: false,
            message: "에러발생! 에러메세지를 확인하세요.",
            error: `Error:${error.message}`,
          },
          {
            status: 401,
          }
        );
      }
      return NextResponse.json({
        ok: false,
        message: "에러발생:에러메세지를 확인하세요.",
        error: `Error:${error.message}`,
      });
    }
  }
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

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  console.log(body);
}
