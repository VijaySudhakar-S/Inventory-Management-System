import React, { useState } from "react";
import axios from "axios";

function AddItem({ onClose, onAdd }) {
  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
    price: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/items`, form).then(() => {
      onAdd();
      onClose();
    });
  };

  return (
    <div className="admin-modal-backdrop">
      <div className="admin-modal">
        <h3>Add Item</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Item Name</label>
            <input
              name="itemName"
              className="form-control"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              name="quantity"
              type="number"
              className="form-control"
              placeholder="Quantity"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              name="price"
              type="number"
              className="form-control"
              placeholder="Price"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              name="description"
              className="form-control"
              placeholder="Description"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              name="category"
              className="form-control"
              placeholder="Category"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
