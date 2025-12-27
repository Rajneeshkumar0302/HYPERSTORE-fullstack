import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {Homeicon,categories1,contact} from '../assets/Index';
import Contact from './Contact';
import Categories from './Categories';
import Home from './Home';
import CategoryDropdown from "./CategoryDropdown";

const SecondNavbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  return (
    <div className="w-full">
         
        <nav style={{ backgroundColor: "rgb(244, 120, 25)", height: "clamp(40px, 9vh, 150px)" ,width:"100%"}}
         className="w-full flex  items-center justify-center px-2 sm:px-6 md:px-10 lg:px-16" >

     <div className="
            flex items-center justify-evenly flex-wrap 
            ml-auto 
            gap-[clamp(0.5rem,4vw,4rem)]
            w-[55%] sm:w-[55%] md:w-[50%] lg:w-[55%]">

           {/* HOME */}
          <div >
            <Link to="/" className="hover:text-gray-300 text-l">
              <img  src={Homeicon}  alt="HOME"
                className="hover:scale-110 transition-transform duration-200"
                style={{
                  width: "clamp(20px, 4vw, 50px)",
                  height: "clamp(10px, 4vh, 60px)",}}/>
              <p className="text-white text-xs sm:text-sm mt-1 "
               style={{ color: "white" }}>HOME</p>
            </Link>
          </div>



          {/* CONTACT */}
          <div >
            <Link to="/Contact" className="hover:text-gray-300 text-l">
              <img  src={contact}  alt="Contact"
                className="hover:scale-110 transition-transform duration-200"
               style={{
                  width: "clamp(15px, 4vw, 50px)",
                  height: "clamp(10px, 4vh, 60px)",}}/>
              <p className="text-white text-xs sm:text-sm mt-1" style={{ color: "white" }}>CONTACT</p>
            </Link>
          </div>



          {/* CATEGORIES */}
          <div className="relative group">
            <Link to="/Categories" className="hover:text-gray-600 text-l">
              <img
                src={categories1}
                alt="Categories"
                className="hover:scale-110 transition-transform duration-200"
                style={{
                 width: "clamp(15px, 4vw, 50px)",
                  height: "clamp(10px, 4vh, 60px)",}} />
              <p className="text-white text-xs sm:text-sm mt-1" 
               style={{ color: "white" , text:"clamp(3px, 1rem, 150px)" }}>CATEGORIES</p>
            </Link >
            <div className="absolute top-6 left-3 bottom-full 
            transform -translate-x-1/2 hidden  group-hover:block text-gray-700"style={{zIndex:"9999"}}>
              <CategoryDropdown />
            </div>
          </div>

         </div>
      </nav>

    </div>
  )
}

export default SecondNavbar
