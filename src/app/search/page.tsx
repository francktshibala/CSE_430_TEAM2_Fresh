"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/page.module.css";
import type { Product } from "@prisma/client";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className={styles.page}>
      <h1 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1.5rem" }}>
        Search Results for &quot;{query}&quot;
      </h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : results.length > 0 ? (
        <div className={styles.featuredProducts}>
          {results.map((item) => (
            <div key={item.id} className={styles.featuredcard}>
              <Image
                src={item.image && item.image.startsWith("http") ? item.image : "/product.jpg"}
                alt={item.name}
                width={600}
                height={450}
              />
              <div className={styles.productInfo}>
                <h3>{item.name}</h3>
                <p>{item.description || "Beautiful handmade item"}</p>
                <div className={styles.cardPrice}>
                  <p>
                    <strong>${item.price}</strong>
                  </p>
                  <button className={styles.productButton}>Add to cart</button>
                </div>
              </div>
              <Link href={`/product/${item.id}`} className={styles.link}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>No products found.</p>
      )}
    </div>
  );
}
