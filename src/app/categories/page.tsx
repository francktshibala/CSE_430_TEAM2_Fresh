import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany();

  return (
    <div className="categories-container">
      <h1 className="categories-title">Browse Categories</h1>
      <div className="categories-grid">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/categories/${cat.id}`}>
            <div className="category-card">
              <span className="category-name">{cat.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
