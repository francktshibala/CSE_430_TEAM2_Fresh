import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - single category by id
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
    include: { products: true }
  });
  return NextResponse.json(category);
}

// PUT - update category
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { name } = await req.json();
  const updated = await prisma.category.update({
    where: { id: Number(id) },
    data: { name }
  });
  return NextResponse.json(updated);
}

// DELETE - remove category
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.category.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: "Category deleted" });
}
