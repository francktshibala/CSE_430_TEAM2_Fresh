import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

// Define the shape of your JWT payload
interface JwtPayload {
  id: number;
  email?: string;
  accountType?: string;
}

async function getUserIdFromToken(req: Request): Promise<number | null> {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    return decoded.id;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

// GET: fetch seller profile
export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, accountType: true, about_me: true, createdAt: true }
    });

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
    if (user.accountType !== "SELLER") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch profile" }, { status: 500 });
  }
}

// PUT: update seller profile (About Me)
export async function PUT(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { about_me } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { about_me },
      select: { id: true, name: true, email: true, accountType: true, about_me: true, createdAt: true }
    });

    return NextResponse.json({ user: updatedUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
  }
}
