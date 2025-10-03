'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  categoryId?: number;
}

interface ProductsResponse {
  products: Product[];
  message?: string;
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({});

  // ✅ Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch products');
      const json: ProductsResponse = await res.json();
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

  // ✅ Handle form changes with type safety (convert numbers correctly)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Convert to numbers where required
    if (name === 'price' || name === 'categoryId') {
      setForm({ ...form, [name]: value ? Number(value) : undefined });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ✅ Add or update product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = form.id ? 'PUT' : 'POST';
      const res = await fetch('/api/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to save product');
      await res.json();
      setForm({});
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete product
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      await res.json();
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fill form for editing
  const handleEdit = (product: Product) => setForm(product);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products Manager</h1>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name || ''}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description || ''}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price ?? ''}
          onChange={handleChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="number"
          name="categoryId"
          placeholder="Category ID"
          value={form.categoryId ?? ''}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image || ''}
          onChange={handleChange}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {form.id ? 'Update' : 'Add'} Product
        </button>
      </form>

      {/* Products List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="border-collapse border w-full">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="border p-2">{p.id}</td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.description}</td>
                <td className="border p-2">{p.price}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-500 text-white p-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white p-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
