import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const products = await prisma.product.findMany({
    where: { categoryId: Number(params.id) },
    include: { user: true, ratings: true, reviews: true }
  });
  return NextResponse.json(products);
}
