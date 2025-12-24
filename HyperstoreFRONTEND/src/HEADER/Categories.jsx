import React, { useEffect, useState } from "react";
import API from "../API";
import Card from './Card'
import {
    menbannerai,  womenpose,
  twokidsshopping,  grocerybag, healthandmedicen,greenfurnitures,
  electronics,bgpattern
} from '../assets/Index';
const Categories = () => {
  const categories = [
    
    
    {  
      id: 1,
      title: "Men",
      content: "Explore men's clothing & accessories.",
      image:  menbannerai,
      link: "/category/men"
    },
    {
      id: 2,
      title: "Women",
      content: "Fashion and essentials for women.",
      image: womenpose,
      link: "/category/women"
    },
    {
      id: 3,
      title: "Kids",
      content: "Clothes, toys, and essentials for kids.",
      image: twokidsshopping,
      link: "/category/kids"
    },
    {
      id: 4,
      title: "Grocery",
      content: "Fresh groceries delivered daily.",
      image: grocerybag,
      link: "/category/grocery"
    },
    {
      id: 5,
      title: "Electronics",
      content: "Mobiles, laptops, TVs, and more.",
      image: electronics,
      link: "/category/electronics"
    },
    {
      id: 6,
      title: "Medical",
      content: "Healthcare & wellness products.",
      image: healthandmedicen,
      link: "/category/medical"
    },
    {
      id: 7,
      title: "Home & Furniture",
      content: "Sofas, beds, tables, décor and more.",
      image: greenfurnitures,
      link: "/category/furniture"
    },
    
    
  ];
  return (
    <div className="p-6"  style={{
    backgroundImage: `url(${bgpattern})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "",
  }}>
    <h1 className="text-[clamp(1rem,2.2vw,2.9rem)] font-bold flex justify-center mb-4">Categories</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
    lg:grid-cols-4 gap-9" style={{ margin:"4rem 1rem 1rem 11rem",  }}>
    {categories.map((category) => (
    <Card key={category.id} title={category.title} content={category.content}
    image={category.image} link={category.link} />
     ))}
      </div>
    </div>
  );
};

export default Categories