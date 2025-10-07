import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - fetch all products for a seller
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    const sellerId = parseInt(id, 10);

    if (isNaN(sellerId)) {
      return NextResponse.json({ error: "Invalid seller ID" }, { status: 400 });
    }



    const products = await prisma.product.findMany({
      where: { userId: sellerId },
      include: { category: true },
    });



    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching seller products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST - add a new product
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    const sellerId = parseInt(id, 10);

    if (isNaN(sellerId)) {
      return NextResponse.json({ error: "Invalid seller ID" }, { status: 400 });
    }

    const body = await req.json();
    const { name, description, price, image, categoryId } = body;

    if (!name || !description || !price || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        image: image ?? null,
        categoryId,
        userId: sellerId,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
