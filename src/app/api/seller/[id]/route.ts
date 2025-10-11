import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> } // params is async
) {
  try {
    const { id } = await context.params; // must await
    const userId = parseInt(id, 10);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const seller = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        products: {
          include: {
            reviews: true,
            category: true,
          },
        },
        reviews: true,
      },
    });

    if (!seller) {
      return NextResponse.json({ error: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json(seller);
  } catch (error) {
    console.error("Error fetching seller:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
