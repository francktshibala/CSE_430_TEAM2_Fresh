import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const products = await prisma.product.findMany({
    where: { categoryId: Number(id) },
    include: { user: true, ratings: true, reviews: true }
  });
  return NextResponse.json(products);
}
