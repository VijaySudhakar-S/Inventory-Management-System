import React, { useState, useEffect } from "react";
import axios from "axios";

function EditItem({ item, onClose, onUpdate }) {
  const [form, setForm] = useState(item);

  useEffect(() => {
    setForm(item); 
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}/items/${form._id}`, form)
      .then(() => {
        onUpdate();
        onClose(); 
      });
  };

  return (
    <div className="admin-modal-backdrop">
      <div className="admin-modal">
        <h3>Edit Item</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Item Name</label>
            <input
              type="text"
              name="itemName"
              className="form-control"
              value={form.itemName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={form.quantity || ""}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={form.description || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={form.category || ""}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
