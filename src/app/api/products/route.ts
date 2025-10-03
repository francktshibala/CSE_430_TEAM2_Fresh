// app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        category: true,
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET /products error:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ✅ CREATE product
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.userId || !body.categoryId) {
      return NextResponse.json(
        { message: "userId and categoryId are required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description || "",
        price: Number(body.price),
        image: body.image || null,
        user: { connect: { id: Number(body.userId) } },
        category: { connect: { id: Number(body.categoryId) } },
      },
      include: { user: true, category: true },
    });

    return NextResponse.json({ product, message: "Product created" });
  } catch (error) {
    console.error("POST /products error:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE product
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id: Number(body.id) },
      data: {
        name: body.name,
        description: body.description || "",
        price: Number(body.price),
        image: body.image || null,
        ...(body.categoryId
          ? { category: { connect: { id: Number(body.categoryId) } } }
          : {}),
      },
      include: { user: true, category: true },
    });

    return NextResponse.json({ product, message: "Product updated" });
  } catch (error) {
    console.error("PUT /products error:", error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

// ✅ DELETE product
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("DELETE /products error:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
