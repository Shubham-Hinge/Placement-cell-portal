import jwt from "jsonwebtoken";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateToken(
  payload: TokenPayload
): string {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
}

export function verifyToken(
  token: string
): TokenPayload | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    console.log("JWT VERIFIED:", decoded);

    return decoded as TokenPayload;
  } catch (error) {
    console.error(
      "JWT VERIFY ERROR:",
      error
    );

    return null;
  }
}