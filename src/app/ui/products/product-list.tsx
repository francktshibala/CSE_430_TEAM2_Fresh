"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import Card from "@/app/ui/products/card";
import PriceSlider from "../slider";
import { CiFilter } from "react-icons/ci";

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string;
  userId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  average: number;
  reviews: { rating: number }[];
  user:{ name: string } | null;
}

interface Category {
  id: number;
  name: string;
}

interface Props {
  products: Product[];
  categories: Category[];
}
export default function ProductList({ products, categories }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<"all" | number>(
    "all"
  );
  const maxPrice = Math.max(...products.map((p) => p.price));
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [selectedCreatorId, setSelectedCreatorId] = useState<"all" | number>(
    "all"
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategoryId === "all" || product.categoryId === selectedCategoryId;

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesCreator = selectedCreatorId === "all" || product.userId === selectedCreatorId;

    return matchesCategory && matchesPrice && matchesCreator;
  });

  const uniqueCreators = Array.from(
    new Map(
      products.filter((p) => p.user)
      .map((p) => [p.userId, p.user?.name])
    )
  ).map(([userId, name]) => ({userId, name}))

  return (
    <>
      <button
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label="Toggle filters"
        style={{
          position: "fixed",
          top: 120,
          left: 20,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <CiFilter size="1.5rem" />
        Filter
      </button>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 90,
          }}
        />
      )}

      <aside
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : "-280px",
          width: "280px",
          height: "100vh",
          backgroundColor: "#fff",
          boxShadow: "2px 0 5px rgba(0,0,0,0.3)",
          padding: "1rem",
          transition: "left 0.3s ease",
          zIndex: 100,
          overflowY: "auto",
        }}
      >
        <h3 style={{ paddingBottom: "2rem" }}>Filters</h3>
        <div className={styles.categoryfilter}>
          <h4 className={styles.label}>Categories</h4>
          <select
            aria-label="categories"
            value={selectedCategoryId}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedCategoryId(value === "all" ? "all" : parseInt(value));
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <PriceSlider
            min={0}
            max={maxPrice}
            onChangeAction={(range) => setPriceRange(range)}
          />
        </div>
        <div className={styles.creatorFilter}>
          <h4 className={styles.label}>Creators</h4>
          <label className={styles.creatorRadio}>
            <input
              type="radio"
              name="creator"
              value="all"
              checked={selectedCreatorId === "all"}
              onChange={() => setSelectedCreatorId("all")}
            />
            All Creators
          </label>
          {uniqueCreators.map((creator) => (
            <label key={creator.userId} className={styles.creatorRadio}>
              <input
                type="radio"
                name="creator"
                value={creator.userId}
                checked={selectedCreatorId === creator.userId}
                onChange={() => setSelectedCreatorId(creator.userId)}
              />
              {creator.name ?? "Unknown"}
            </label>
          ))}
        </div>
      </aside>
      <main>
        <div className={styles.featuredProducts}>
          {filteredProducts.length === 0 ? (
            <p>No products found with this filter.</p>
          ) : (
            filteredProducts.map((item) => {
              console.log(item);
              return (
                <Card
                  id={item.id}
                  key={item.name}
                  title={item.name}
                  creator={item.user?.name ?? "Unknown"}
                  image={item.image}
                  price={item.price}
                  rating={item.average}
                  ratingAmount={item.reviews.length}
                  userId={item.userId}
                />
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
