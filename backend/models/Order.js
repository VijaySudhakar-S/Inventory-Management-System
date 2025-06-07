const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
