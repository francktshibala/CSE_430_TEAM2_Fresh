"use client";

import { useCart } from "@/app/context/CartContext";
import styles from "@/app/page.module.css"; // optional CSS for styling

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return <div className={styles.toast}>{toastMessage}</div>;
}

