const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    console.log("GET ONE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// CREATE
router.post("/", async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body);

    const product = new Product(req.body);
    const saved = await product.save();

    res.status(201).json(saved);
  } catch (err) {
    console.log("❌ CREATE ERROR FULL:", err);

    res.status(500).json({
      message: "Error creating product",
      error: err.message
    });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;