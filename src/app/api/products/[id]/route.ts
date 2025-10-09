import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ GET - fetch single product
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> } // params is now async
) {
  try {
    const { id } = await context.params; // ⬅️ must await params
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        user: true,
        category: true,
      },
    });

    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// ✅ PUT - update product
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ⬅️ await it
    const data = await req.json();

    const updated = await prisma.product.update({
      where: { id: parseInt(id, 10) },
      data,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// ✅ DELETE - remove product
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.product.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
