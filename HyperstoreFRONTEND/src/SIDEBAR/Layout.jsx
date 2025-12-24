import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }};
    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen w-f">

      {/*  MENU BUTTON  MOBILE ONLY */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-10% left-2 z-50 bg-orange-500 text-white px-3 py-2 rounded"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
      )}


      {/* GRID LAYOUT */}
      <div className=" flex ">

            {/* SIDEBAR */}
       <aside
    className={`
      fixed md:static
      top-1 left-0 h-full z-40
      transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
    `}
    style={{ width: "clamp(130px, 18vw, 270px)" }}
  >
    <Sidebar onClose={() => setSidebarOpen(false)} />
  </aside>

  {/* MAIN CONTENT */}
  <main
    className="flex-1 transition-all"
    style={{
      marginLeft: sidebarOpen
        ? "clamp(130px, 18vw, 270px)"
        : "0px",
    }}
  >
    <Outlet />
  </main>


      </div>
    </div>
  );
};


export default Layout;


