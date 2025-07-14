import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    //console.log(body, "뭐예요");
    if (!body) {
      throw new Error("body 데이터 null");
    }
    const existingId = await prisma.user.findUnique({
      where: {
        userId: body.userId,
      },
    });
    if (!existingId) {
      throw new Error("아이디 존재 안함.");
    }
    const comparedPassword = await bcrypt.compare(
      body.password,
      existingId.password
    );

    console.log(comparedPassword, "비교");
    if (!comparedPassword) {
      return NextResponse.json({
        ok: false,
        message: "비밀번호 일치하지 않음.",
      });
    }

    //token 발급
    const token = signAccessToken({
      id: existingId.id,
      userId: existingId.userId,
      name: existingId.name,
      email: existingId.email,
    });
    if (!token) {
      throw new Error("token 이 생성되지 않음.");
    }

    const refreshToken = signRefreshToken({
      id: existingId.id,
      userId: existingId.userId,
      name: existingId.name,
      email: existingId.email,
    });
    if (!refreshToken) {
      throw new Error("refreshToken 이 생성되지 않음.");
    }
    return NextResponse.json({
      ok: true,
      message: "로그인 성공",
      token,
      refreshToken,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          ok: false,
          error: `Error:${error.message}`,
        },
        { status: 401 }
      );
    }
  }
}
