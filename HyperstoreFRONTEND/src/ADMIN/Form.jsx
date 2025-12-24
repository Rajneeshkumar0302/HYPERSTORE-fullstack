import React, { useState, useEffect } from "react";

const Form = ({ onSave, editingProduct, setEditingProduct }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  // Prefill when editing
  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    }
  }, [editingProduct]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

 // ✅ Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!onSave || typeof onSave !== "function") {
       if (import.meta.env.DEV) {
      console.error("onSave prop is missing");
       }
      return;
    }

    const cleanedProduct = {
      ...product,
      name: product.name.trim(),
      category: product.category.trim(),
      image: product.image.trim(),
      description: product.description.trim(),
      price: Number(product.price),
    };

    onSave(cleanedProduct);

    // ✅ Reset form
    setProduct({
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    });

    // ✅ Only call if exists (important!)
    if (setEditingProduct) {
      setEditingProduct(null);
    }
  };
  return (
    <div
      className="max-h-screen flex flex-col items-center  bg-amber-600 gap-4"
      style={{ margin: "0% 4%", padding: "3%", borderRadius: "50%" }}>
      <form
        onSubmit={handleSubmit}
        className="bg-[rgb(244,240,225)] flex flex-col items-center justify-between p-8
                   rounded-2xl shadow-2xl
                   w-[41%] sm:w-[38%] md:w-[34%] lg:w-[30%]
                   transition-all duration-300 ease-in-out
                   transform hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]
                   overflow-hidden ">
        <h2
          className="text-xl sm:text-xl md:text-2xl lg:text-3xl gap-4 font-bold text-black"
          style={{ margin: "4% 12% 12% 12%" }}   >
          {editingProduct ? "Update Product" : "Add Product"}
        </h2>

        <div
          className="w-full h-[65%] flex flex-col items-center gap-6"
          style={{ margin: "2%" }}
        >
          {/* Product Name */}
          <input
            name="name"
            type="text"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="border-b-2 border-gray-400 w-4/5 mb-6 focus:outline-none py-2"
            required
          />

          {/* Price */}
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="border-b-2 border-gray-400 w-4/5 mb-6 focus:outline-none py-2"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border-b-2 border-gray-400 w-4/5 mb-6 bg-transparent py-2 focus:outline-none"
            required
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
            <option value="electronics">Electronics</option>
            <option value="grocery">Grocery</option>
            <option value="medical">Medical</option>
            <option value="furnitures">Furnitures</option>
          </select>

          {/* Image URL */}
          <input
            name="image"
            type="text"
            value={product.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="border-b-2 border-gray-400 w-4/5 mb-6 focus:outline-none py-2"
            required />

          {/* Description */}
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="border-b-2 border-gray-400 w-4/5 mb-6 focus:outline-none py-2"
            rows="2"
            required ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[rgb(215,120,25)] text-black font-semibold 
                       w-[40%] sm:w-[40%] md:w-[40%] lg:w-[50%]
                       h-[3vh] sm:h-[3.5vh] md:h-[4vh] lg:h-[4.5vh]
                       rounded-2xl shadow-md hover:scale-105 
                       transition-all duration-300" >


            {editingProduct ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;


