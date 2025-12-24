import React from 'react';
import { Link } from "react-router-dom";
const Card = ({ title, image, Shopnow,link }) => {
 
 const path = `/category/${title.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`;
  return (
    <div
     style={{
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
    borderRadius: "1rem",
    padding: "clamp(0.5rem, 2vw, 0.6rem)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "rgb(244,240,225)",
    width: "clamp(200px, 22vw, 300px)",   // responsive width
    height: "clamp(280px, 30vw, 450px)",
    alignContent:"center" // responsive height
  }} onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";}}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";}}>



      <img src={image}
           alt={title}
        className="rounded-lg object-cover w-full h-[clamp(120px,29vh,350px)]"/>

      <h2 className="font-bold text-center 
       text-[clamp(0.8rem,1.7vw,1.8rem)]">{title}</h2>

      
      <Link to={link} className='flex justify-center' >
       <button onClick={Shopnow}
        className="mt-3 bg-orange-500 text-white py-2 rounded-lg p-[13px]
                   hover:bg-orange-600 transition w-[50%] h-[120%] 
                  items-center text-[clamp(0.7rem,1.3vw,1.2rem)]">
        Shop now
      </button>
      </Link>  
     
    </div>
  );
};

export default Card;
