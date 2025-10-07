"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/api/auth/useAuth";
import styles from "@/app/page.module.css";
import { useCart } from "../context/CartContext";

export default function PaymentPage() {
  const { user, loading } = useAuth();
  const { clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!loading && !user) {
    router.push("/login");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);

    if (
      !formData.cardNumber ||
      !formData.expiry ||
      !formData.cvv ||
      !formData.name
    ) {
      setError("Please fill out all fields.");
      setSubmitLoading(false);
      return;
    }

    // Mock processing delay
    setTimeout(() => {
      setSubmitLoading(false);
      setSuccess(true);
      clearCart();
    }, 1000);
  };

  if (loading) {
    return <p className={styles.centerText}>Checking authentication...</p>;
  }

  if (success) {
    return (
      <div className={styles.centerText}>
        <h2>Payment Successful!</h2>
        <p>Thank you for your order, {user?.name || "Customer"}.</p>
        <button className={styles.button} onClick={() => router.push("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.heading}>Payment Details</h2>

        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Cardholder Name */}
          <div className={styles.inputGroup}>
            <label>Cardholder Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.flexRow}>
            <div className={styles.flexItem}>
              <label>Expiry</label>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.flexItem}>
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitLoading}
            className={styles.button}
          >
            {submitLoading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
