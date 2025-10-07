"use client"

import styles from "@/app/page.module.css";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { CartItem } from "@/lib/interfaces";

export default function Card({
  id,
  title,
  creator,
  image,
  price,
  rating,
  ratingAmount,
}: {
  id: number;
  title: string;
  creator: string;
  image: string;
  price: number;
    rating: number;
    ratingAmount: number;
  }) {
  
  const { addToCart } = useCart();
  
  const stars =
    rating > 4.9
      ? "★★★★★"
      : rating > 3.9
      ? "★★★★"
      : rating > 2.9
      ? "★★★"
      : rating > 1.9
      ? "★★"
      : "★";

  const handleAddToCart = () => {
    console.log("added to cart!!!")
    const item: CartItem = {
      id,
      name: title,
      price,
      image,
      quantity: 1,
    };
    addToCart(item);
  }

  return (
    <div className={styles.featuredcard}>
      <div className={styles.imageContainer}>
        <Image
          src={`${image}`}
          alt={`${title} image`}
          width={600}
          height={450}
        />
      </div>
      <div className={styles.productInfo}>
        <div>
          <h3>{title}</h3>
          <p>{`by ${creator}`}</p>
        </div>
        <p>
          <span className={styles.stars}> {`${stars}`}</span>
          {`  ${rating.toFixed(1)} (${ratingAmount})`}
        </p>
        <div className={styles.cardPrice}>
          <p>
            <strong>{`$${price}`}</strong>
          </p>
          <button
            className={styles.productButton}
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            Add to cart
          </button>
        </div>
      </div>
      <Link
        className={styles.link}
        href={`/product/${id}`}
        aria-label="View Details"
        title="View Details"
      >
        View Details
      </Link>
    </div>
  );
}
