import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "", image: "", category: "", stock: "" });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/products");
      const contentType = res.headers.get("content-type");
      if (!res.ok) throw new Error("Failed to fetch products");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setProducts(data);
      } else {
        const text = await res.text();
        throw new Error("Unexpected response from server: " + text.substring(0, 100));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: form.stock ? Number(form.stock) : undefined,
        }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Failed to add product: " + errorText);
      }
      setForm({ name: "", price: "", description: "", image: "", category: "", stock: "" });
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleAddProduct} className="admin-form">
        <input name="name" value={form.name} onChange={handleInputChange} placeholder="Name" required className="admin-input" />
        <input name="price" value={form.price} onChange={handleInputChange} placeholder="Price" required type="number" min="0" className="admin-input" />
        <input name="description" value={form.description} onChange={handleInputChange} placeholder="Description" required className="admin-input" />
        <input name="image" value={form.image} onChange={handleInputChange} placeholder="Image URL" required className="admin-input" />
        <select name="category" value={form.category} onChange={handleInputChange} required className="admin-input">
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input name="stock" value={form.stock} onChange={handleInputChange} placeholder="Stock (optional)" type="number" min="0" className="admin-input" />
        <button type="submit" className="admin-add-btn">Add Product</button>
      </form>
      <table className="admin-product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>${prod.price}</td>
              <td>{prod.description}</td>
              <td><img src={prod.image} alt={prod.name} style={{width: '60px', height: '60px', objectFit: 'cover'}} /></td>
              <td>{prod.category?.name || prod.category}</td>
              <td>{prod.stock}</td>
              <td>
                <button onClick={() => handleDeleteProduct(prod._id)} className="admin-delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard; 