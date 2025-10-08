"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Product } from "@/lib/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";


interface ProductFormState {
  name: string;
  description: string;
  price: string;
  image: string;
  categoryId: string;
}

interface Category {
  id: number;
  name: string;
}

export default function SellerProductsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ProductFormState>({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/seller/${id}/products`);
    const data = await res.json();
    setProducts(data.products as Product[]);
    setLoading(false);
  }, [id]);
  
  useEffect(() => {
    loadProducts();
  
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.categories as Category[]);
    }
  
    fetchCategories();
  }, [id, loadProducts]); ; // no ESLint warning now
  

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `/api/products/${editingId}`
      : `/api/seller/${id}/products`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        image: form.image,
        categoryId: parseInt(form.categoryId),
      }),
    });

    setForm({ name: "", description: "", price: "", image: "", categoryId: "" });
    setEditingId(null);
    loadProducts();
  }

  async function handleDelete(productId: number) {
    await fetch(`/api/products/${productId}`, { method: "DELETE" });
    loadProducts();
  }

  async function handleSignOut() {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) router.push("/login");
    } catch (err) {
      console.error("Error logging out", err);
    }
  }

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="dashboard-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="page-title">Manage Products</h1>
        <button
          onClick={handleSignOut}
          style={{ background: "#e63946", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Sign Out
        </button>
      </div>

      <form onSubmit={handleSubmit} className="product-form-inline">
        <div className="form-group-inline">
          <label>Product Name</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>

        <div className="form-group-inline">
          <label>Description</label>
          <input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        <div className="form-group-inline">
          <label>Price ($)</label>
          <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        </div>

        <div className="form-group-inline">
          <label>Category</label>
          <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group-inline">
          <label>Image URL</label>
          <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </div>

        <button type="submit" className="btn btn-primary">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="product-list">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <div className="product-info">
              {p.image && (
                <Link href={`/products/${p.id}/reviews`}>
                  <Image src={p.image} alt={p.name} width={80} height={80} className="product-thumbnail" style={{ objectFit: "cover", borderRadius: "6px" }} />
                </Link>
              )}
              <div>
                <p className="product-name">{p.name} - ${p.price}</p>
                <p className="product-description">{p.description}</p>
              </div>
            </div>
            <div className="actions">
              <button onClick={() => {
                setForm({ name: p.name, description: p.description ?? "", price: p.price.toString(), image: p.image ?? "", categoryId: p.categoryId.toString() });
                setEditingId(p.id);
              }} className="btn btn-edit">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="btn btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
