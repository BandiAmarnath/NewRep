import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "" });
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:3000/items");
    setItems(res.data);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:3000/items/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:3000/items", form);
    }
    setForm({ name: "", quantity: "" });
    fetchItems();
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, quantity: item.quantity });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/items/${id}`);
    fetchItems();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>{editId ? "Edit Item" : "Add Item"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>
      <h3>Items</h3>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.quantity}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
