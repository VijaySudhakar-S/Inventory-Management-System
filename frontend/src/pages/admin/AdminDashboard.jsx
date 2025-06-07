import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditItemModal from "./EditItem";
import AddItemModal from "./AddItem";
import "./admin.css";
import { GoPlusCircle } from "react-icons/go";
import { LuBox } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";

function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/items`).then((res) => {
      setItems(res.data);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/items/${id}`).then(() => {
      setItems(items.filter((item) => item._id !== id));
    });
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditItem(null);
  };

  return (
    <div className="admin-dashboard-container container-fluid p-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <div className="admin-dashboard-actions d-flex flex-wrap justify-content-center gap-3 mb-4">
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={() => setIsAddOpen(true)}
        >
          <GoPlusCircle />
          <span className="ms-1">Add Item</span>
        </button>
        <Link
          to="/admin/orders"
          className="btn btn-secondary d-flex align-items-center"
        >
          <LuBox /> <span className="ms-1">View Orders</span>
        </Link>
      </div>

      <div className="row">
        <h2 className="mb-3">Products : </h2>
        {items.map((item) => (
          <div key={item._id} className="col-md-6 col-lg-4 mb-4">
            <div className="admin-item-card d-flex align-items-center justify-content-between p-4 rounded shadow bg-white h-100 position-relative">
              <div>
                <h5 className="admin-item-name text-primary fw-bold">
                  {item.itemName}
                </h5>
                <div className="d-flex gap-3">
                  <p>
                    <span className="fw-bold">Price :</span> ₹{item.price}
                  </p>
                  <p>
                    <span className="fw-bold">Quantity :</span> {item.quantity}
                  </p>
                </div>
              </div>
              <div className="admin-item-actions d-flex gap-2 position-absolute top-0 end-0 m-2">
                <button
                  className="btn btn-sm btn-primary d-flex align-items-center"
                  onClick={() => openEditModal(item)}
                >
                  <FaRegEdit /> <span className="ms-1">Edit</span>
                </button>
                <button
                  className="btn btn-sm btn-danger align-items-center"
                  onClick={() => handleDelete(item._id)}
                >
                  <IoTrashBinOutline /> <span className="ms-1">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEditOpen && editItem && (
        <EditItemModal
          item={editItem}
          onClose={closeEditModal}
          onUpdate={fetchItems}
        />
      )}

      {isAddOpen && (
        <AddItemModal onClose={() => setIsAddOpen(false)} onAdd={fetchItems} />
      )}

      <div className="back-home-link position-absolute top-0 end-0 m-3">
        <Link to="/" className="btn btn-primary d-none d-md-inline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
