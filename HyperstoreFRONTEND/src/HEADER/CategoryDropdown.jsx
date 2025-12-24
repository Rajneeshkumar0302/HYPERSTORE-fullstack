import React from "react";
import { Link } from "react-router-dom";

const CategoryDropdown = () => {
  const categories = [
    { name: "Men", path: "/category/men" },
    { name: "Women", path: "/category/women" },
    { name: "Kids", path: "/category/kids" },
    { name: "Grocery", path: "/category/grocery" },
    { name: "Electronics", path: "/category/electronics" },
    { name: "Medical", path: "/category/medical" },
    { name: "Furniture", path: "/category/furniture" },
    
  ];

  return (
    <div className=" mt-2 bg-white text-black rounded-lg shadow-xl p-4 
                  transition-all duration-300 ease-in-out  "
      style={{
        width: "clamp(130px, 23vw, 330px)",
        padding: "clamp(0.4rem, 0.1vw, 0.1rem)", zIndex:"9999"}}>

      <div
        className="grid gap-3"
        style={{gridTemplateColumns: "repeat(auto-fit, minmax(clamp(90px, 20%, 150px), 1fr))",}}>
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={cat.path}
            className="text-center rounded-md hover:bg-gray-300 transition"
            style={{fontSize: "clamp(0.7rem, 1vw, 1rem)",
                    padding: "clamp(0.2rem, 0.4vw, 0.3rem)",}}>{cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryDropdown;
