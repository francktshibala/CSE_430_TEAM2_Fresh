'use client';

import React, { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

const navlinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/product" },
  { name: "About", path: "/about" },
  { name: "Categories", path: "/categories" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  
  
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        setSearchQuery(""); // optional: clear search after submit
      }
    };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const { cart } = useCart();
  const cartTotal = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">Handcrafted Haven</Link>
      </div>

      <nav className={`nav ${isMobileMenuOpen ? "nav-open" : ""}`}>
        <ul>
          {navlinks.map((link) => (
            <li key={link.name}>
              <Link href={link.path} onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-icons">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    
        <Link
          href="/cart"
          className="icon cart-icon"
          aria-label="Shopping Cart"
          title="Shopping Cart"
        >
          <FaShoppingCart />
          <span className="cart-count">{cartTotal}</span>
        </Link>
        <Link
          href="/login"
          className="icon"
          aria-label="User Account"
          title="Account"
        >
          <FaUser />
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
