const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const Item = require("./models/Item");
const Order = require("./models/Order");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error: ", err));

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.put("/items/:id", async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

app.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send("Item not found");
    res.json(item);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.post("/orders", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

app.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ orderDate: -1 });
  res.json(orders);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
