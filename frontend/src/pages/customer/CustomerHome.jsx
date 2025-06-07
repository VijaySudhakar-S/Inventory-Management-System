import React, { useEffect, useState } from "react";
import axios from "axios";
import "./customer.css";
import { TiShoppingCart } from "react-icons/ti";

function CustomerHome() {
  const [items, setItems] = useState([]);
  const [orderQty, setOrderQty] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/items`).then((res) => {
      setItems(res.data);
    });
  }, []);

  const handleOrder = (item) => {
    const quantity = parseInt(orderQty[item._id] || "1");
    if (!quantity || quantity <= 0) return alert("Enter valid quantity");

    axios
      .post(`${process.env.REACT_APP_API_URL}/orders`, {
        itemName: item.itemName,
        quantity,
      })
      .then(() => {
        alert("Order placed!");
        setOrderQty({ ...orderQty, [item._id]: "" });
      });
  };

  return (
    <div className="customer-main container">
      <h2 className="customer-title">
        <TiShoppingCart /> Order Items
      </h2>
      <div className="customer-grid">
        {items.map((item) => (
          <div key={item._id} className="customer-card">
            <h5 className="item-name">{item.itemName}</h5>
            <p className="item-price">₹{item.price}</p>
            <div className="order-section">
              <input
                type="number"
                min="1"
                className="qty-input"
                placeholder="Qty"
                value={orderQty[item._id] || ""}
                onChange={(e) =>
                  setOrderQty({ ...orderQty, [item._id]: e.target.value })
                }
              />
              <button className="order-btn" onClick={() => handleOrder(item)}>
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerHome;
