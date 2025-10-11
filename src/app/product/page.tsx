export const dynamic = "force-dynamic";

import styles from "@/app/page.module.css";
import { getAllCategories, getAllProducts, getUserById } from "@/lib/data";
import { Product } from "@/lib/interfaces";
import { calculateAverage } from "@/lib/utils";
import ProductList from "@/app/ui/products/product-list";

export default async function ProductPage() {
  const products: Product[] = await getAllProducts();
  const categories = await getAllCategories();

  const productsWithRatings = await Promise.all(
    products.map(async (product) => {
      console.log(product);
      const ratings = product.reviews.map((review) => review.rating);
      const average = calculateAverage(ratings);
      const user = await getUserById(product.userId);
      return {
        ...product,
        average,
        user,
      };
    })
  );

  return (
    <section className={styles.featuredSection}>
      <h2>Explore Our Products</h2>
      <p>From artisan hands to your home</p>
      <ProductList products={productsWithRatings} categories={categories} />
    </section>
  );
}
