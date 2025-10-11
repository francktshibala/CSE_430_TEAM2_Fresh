"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "@/lib/interfaces";
import Image from "next/image";
import styles from "@/app/page.module.css";
import Link from "next/link";

export default function SellerProfilePage() {
  const params = useParams();
  const userId = params?.id;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/seller/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch user");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) return <p>Loading seller profile...</p>;
  if (!user) return <p>Seller not found.</p>;

  return (
    <div className={styles.container}>
      <h2>
        <strong>{user.name}</strong>
      </h2>

      <p>
        <strong>About:</strong> {user.about_me || "No bio available."}
      </p>
      <p>
        <strong>Products:</strong>
      </p>

      {user.products && user.products.length > 0 ? (
        <div className={styles.productsGrid}>
          {user.products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className={styles.link}
            >
              <div className={styles.productCard}>
                <Image
                  src={product.image || "/fallback.jpg"}
                  alt={product.name}
                  width={200}
                  height={150}
                  className={styles.productImage}
                />
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>This seller has no products yet.</p>
      )}
    </div>
  );
}
