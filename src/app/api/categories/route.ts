import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - fetch all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
// POST - create a new category
export async function POST(req: Request) {
  const { name } = await req.json();
  const newCategory = await prisma.category.create({
    data: { name },
  });
  return NextResponse.json(newCategory, { status: 201 });
}
