import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  SortAsc,
  Shield,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";


const Sidebar = ({ onClose }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // start collapsed on mobile

 //  Read user role from localStorage
  const { user, loading } = useAuth();

if (loading) return null;
const isAdmin = user?.role === "admin";
const toggleCategory = () => setIsCategoryOpen((s) => !s);
  const toggleSidebar = () => setIsOpen((s) => !s);

 return (
   <>
  {/* Sidebar */}
  <aside
    className={`fixed left-0 top-[21%]
      h-[calc(100vh-9rem)] 
      bg-[rgb(246,240,225)] rounded-tr-2xl rounded-br-2xl shadow-lg z-40
      transform transition-transform duration-300
      ${isOpen ? "translate-x-0" : "translate-x-0"}
      md:translate-x-0 md:static`}
    style={{
      width: "clamp(130px, 18vw, 270px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}
  >

    {/* Header */}
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <h2
        style={{
          fontSize: "clamp(1.1rem, 2vw, 1.8rem)", // ✅ scalable heading
          fontWeight: 600,
        }}
      >
        Controls
      </h2>

      {/* ✕ CLOSE BUTTON — MOBILE ONLY */}
      <button
        className="lg:hidden md:hidden absolute top-2 right-14 font-bold"
        style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)" }}
        onClick={onClose}
      >
        ✕
      </button>

      <div className="border-b border-black mx-auto w-full mt-2" />
    </div>

    {/* Middle Section */}
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5%",
        padding: "3.5%",
        overflowY: "auto",
      }}
    >

      {/* Category Dropdown */}
      <div style={{ width: "100%" }}>
        <button
          onClick={toggleCategory}
          className="w-full flex items-center justify-center
            bg-[rgb(225,120,25)] hover:bg-[rgb(179,94,20)]
            text-black px-4 py-3 rounded-full"
          style={{
            fontSize: "clamp(0.85rem, 1.6vw, 1.1rem)", // ✅ button text
          }}
        >
          <span style={{ padding: "clamp(5px,1.1vw,20px)" }}>
            Category
          </span>
          {isCategoryOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isCategoryOpen && (
          <div className="mt-3 bg-[rgb(244,240,225)] rounded-md divide-y divide-gray-200">
            {[
              { name: "Men", path: "/category/men" },
              { name: "Women", path: "/category/women" },
              { name: "Kids", path: "/category/kids" },
              { name: "Electronics", path: "/category/electronics" },
              { name: "Grocery", path: "/category/grocery" },
              { name: "Medical", path: "/category/medical" },
            ].map((cat, i) => (
              <Link
                key={i}
                to={cat.path}
                className="block px-4 py-2 text-center text-black 
                hover:bg-[rgb(225,120,25)] rounded-md"
                style={{
                  fontSize: "clamp(0.8rem, 1.4vw, 1rem)", // ✅ dropdown text
                }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Filter Button */}
      <button
        className="w-full flex items-center justify-center
        bg-[rgb(225,120,25)] hover:bg-[rgb(179,94,20)]
        text-black px-4 py-3 rounded-full"
        style={{
          fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
          padding: "clamp(5px,1.1vw,20px)",
        }}
      >
        <Filter size={18} className="mr-3" /> Filter
      </button>

      {/* Sort Button */}
      <button
        className="w-full flex items-center justify-center
        bg-[rgb(225,120,25)] hover:bg-[rgb(179,94,20)]
        text-black px-4 py-3 rounded-full"
        style={{
          fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
          padding: "clamp(5px,1.1vw,20px)",
        }}
      >
        <SortAsc size={18} className="mr-3" /> Sort
      </button>

      {/* Admin Button */}
      {isAdmin && (
        <Link
          to="/admincontrol"
          className="w-full flex items-center justify-center
          bg-[rgb(225,120,25)] hover:bg-[rgb(179,94,20)]
          text-black px-4 py-3 rounded-full"
          style={{
            fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
            padding: "clamp(5px,1.1vw,20px)",
          }}
        >
          <Shield size={18} className="mr-3" /> Admin Control
        </Link>
      )}
    </div>

    {/* Footer */}
    <div
      className="p-4 border-t text-gray-600 text-center"
      style={{ fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)" }}
    >
      © 2025 HyperStore
    </div>

  </aside>
</>

  );
};

export default Sidebar;