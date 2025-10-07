"use client";

import { useCart } from "@/app/context/CartContext";
import styles from "@/app/page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuth from "@/app/api/auth/useAuth";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // auth for checkout
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      alert("You must be logged in to checkout!");
      return;
    }
    router.push("/payment");
  };

    const handleDecrease = (id: number, currentQty: number) => {
      if (currentQty === 1) {
        removeFromCart(id); // remove if quantity would go below 1
      } else {
        updateQuantity(id, currentQty - 1);
      }
    };

    const handleIncrease = (id: number, currentQty: number) => {
      updateQuantity(id, currentQty + 1);
    };

  return (
    <section className={styles.cartSection}>
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                />
                <div>
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price.toFixed(2)}</p>

                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => handleDecrease(item.id, item.quantity)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id, item.quantity)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total: ${total.toFixed(2)}</h3>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0 || loading || !user}
          >
            {loading ? "Checking login..." : "Checkout"}
          </button>

          {!loading && !user && (
            <p style={{ color: "red", marginTop: "1rem" }}>
              You must be logged in to checkout.
            </p>
          )}
        </>
      )}
    </section>
  );
}
