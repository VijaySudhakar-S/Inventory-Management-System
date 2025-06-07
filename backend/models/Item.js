const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  price: Number,
  description: String,
  category: String,
});

module.exports = mongoose.model("Item", itemSchema);
