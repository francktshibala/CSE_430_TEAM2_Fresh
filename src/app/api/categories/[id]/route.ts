import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - single category by id
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const category = await prisma.category.findUnique({
    where: { id: Number(params.id) },
    include: { products: true }
  });
  return NextResponse.json(category);
}

// PUT - update category
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name } = await req.json();
  const updated = await prisma.category.update({
    where: { id: Number(params.id) },
    data: { name }
  });
  return NextResponse.json(updated);
}

// DELETE - remove category
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.category.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ message: "Category deleted" });
}
