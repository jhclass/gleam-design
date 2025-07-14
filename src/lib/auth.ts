import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET;
const refreshKey = process.env.JWT_REFRESH_SECRET;
export function signAccessToken(payload: object, expiresIn = "15m") {
  if (!secretKey) {
    throw new Error("JWT SECRET 없음.");
  }
  return jwt.sign(payload, secretKey, { expiresIn });
}

export function signRefreshToken(payload: object, expiresIn = "12h") {
  if (!refreshKey) {
    throw new Error("Refresh secret 키 없음.");
  }
  return jwt.sign(payload, refreshKey, { expiresIn });
}
