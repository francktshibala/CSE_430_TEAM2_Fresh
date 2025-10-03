'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId?: number;
}

export default function ManagePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({});

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products', { 
        cache: 'no-store',
        credentials: 'include', // ✅ send JWT cookie
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      const json = await res.json();
      setProducts(json.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = form.id ? 'PUT' : 'POST';
      const res = await fetch('/api/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials: 'include', // ✅ send JWT cookie
      });
      if (!res.ok) throw new Error('Failed to save product');
      await res.json();
      setForm({});
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
        credentials: 'include', // ✅ send JWT cookie
      });
      if (!res.ok) throw new Error('Failed to delete product');
      await res.json();
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product: Product) => setForm(product);

  return (
    <div className="manage-page">
      <h1 className="page-title">Manage Products</h1>

      <form className="product-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name || ''} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={form.description || ''} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={form.price || ''} onChange={handleChange} required />
        <input type="number" name="categoryId" placeholder="Category ID" value={form.categoryId || ''} onChange={handleChange} />
        <input type="text" name="image" placeholder="Image URL" value={form.image || ''} onChange={handleChange} />
        <button type="submit">{form.id ? 'Update' : 'Add'} Product</button>
      </form>

      {loading ? (
        <p className="loading-text">Loading products...</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Description</th><th>Price</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.name}</td><td>{p.description}</td><td>${p.price.toFixed(2)}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
