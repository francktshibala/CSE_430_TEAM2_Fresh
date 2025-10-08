import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function CategoryDetailPage({ params }: { params: { id: string } }) {
  const categoryId = parseInt(params.id, 10);

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: { products: { include: { user: true } } },
  });

  if (!category) {
    return <div className="category-detail">Category not found.</div>;
  }

  return (
    <div className="category-detail">
      <h1>{category.name}</h1>
      {category.products.length === 0 ? (
        <p>No products in this category yet.</p>
      ) : (
        <div className="products-grid">
          {category.products.map((p) => (
            <div key={p.id} className="product-card">
              <Image
                src={p.image ?? "/placeholder.png"}
                alt={p.name}
                width={300}
                height={200}
              />
              <h2 className="product-name">{p.name}</h2>
              <p>{p.description}</p>
              <p className="product-price">${p.price.toFixed(2)}</p>
              <p className="product-seller">Seller: {p.user.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
