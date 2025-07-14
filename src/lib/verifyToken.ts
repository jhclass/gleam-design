import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function verifyToken(req: NextRequest) {
  const getToken = req.headers.get("authorization");
  console.log(getToken, "getToken");
  if (!getToken?.startsWith("Bearer ")) {
    throw new Error("Authorization header malformed");
  }
  const onlyToken = getToken?.replace("Bearer ", "");
  if (!onlyToken) {
    throw new Error(`token is missing`);
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }
  const context = jwt.verify(onlyToken, process.env.JWT_SECRET);
  return context;
}
