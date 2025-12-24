import Product from "../models/Productmodel.js";

// ================= CREATE PRODUCT (Admin Only) ==================
export const addProduct = async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;

    if (!name || !price || !category || !image || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({
      name,
      price,
      category: category.toLowerCase(),
      image,
      description,
    });

    await newProduct.save();

    res.status(201).json({
      message: "✅ Product added successfully",
      newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error while adding product" });
  }
};

// ================= GET ALL PRODUCTS ==================
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

// ================= GET PRODUCTS BY CATEGORY ==================
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const products = await Product.find({
      category: category.toLowerCase(),
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching category products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET SINGLE PRODUCT ==================
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= DELETE PRODUCT (Admin Only) ==================
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "🗑️ Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};

