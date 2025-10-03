import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret";

// JWT payload type
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

// GET: list seller's products
export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const products = await prisma.product.findMany({ where: { userId } });
    return NextResponse.json({ products });
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

// POST: add a new product
export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, description, price, image, categoryId } = body;

    const product = await prisma.product.create({
      data: { name, description, price, image, categoryId, userId }
    });

    return NextResponse.json({ product });
  } catch (err) {
    console.error("Failed to add product:", err);
    return NextResponse.json({ message: "Failed to add product" }, { status: 500 });
  }
}

// PUT: update a product
export async function PUT(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id, name, description, price, image, categoryId } = body;

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product || product.userId !== userId) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, price, image, categoryId }
    });

    return NextResponse.json({ product: updatedProduct });
  } catch (err) {
    console.error("Failed to update product:", err);
    return NextResponse.json({ message: "Failed to update product" }, { status: 500 });
  }
}

// DELETE: delete a product
export async function DELETE(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const url = new URL(req.url);
    const id = parseInt(url.searchParams.get("id") || "0");
    if (!id) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product || product.userId !== userId) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("Failed to delete product:", err);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}
