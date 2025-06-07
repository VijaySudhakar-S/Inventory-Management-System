import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./admin.css";
import { FaBoxOpen } from "react-icons/fa";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/orders`).then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <div className="admin-orders-container container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center">
          <FaBoxOpen /> Orders Summary
        </h2>
        <Link to="/admin/dashboard" className="btn btn-primary ">
          ← Back to Dashboard
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders found.</p>
      ) : (
        <div className="row g-4">
          {orders.map((order, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="admin-order-card p-3 border rounded shadow-sm bg-white">
                <h5 className="admin-order-item-name text-primary mb-2">
                  {order.itemName}
                </h5>
                <p className="mb-1">
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p className="mb-0 text-muted">
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
