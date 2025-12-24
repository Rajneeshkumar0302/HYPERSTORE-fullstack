import React, { useState, useEffect } from "react";
import API from "../API"; 
import Form from "./Form";
import ViewUsers from "../HEADER/ViewUsers";
import { bgpattern } from "../assets/Index.js";

const AdminControl = () => {
  const [action, setAction] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //  ADD PRODUCT
  const handleSaveProduct = async (productData) => {
    try {
      const response = await API.post("/products/add", productData);
      alert(" Product added successfully!");
       if (import.meta.env.DEV) {
      console.log("Saved Product:", response.data);
       }
      setAction("read");
    } catch (error) {
       if (import.meta.env.DEV) {
      console.error("❌ Error saving product:", error.response?.data || error);
       }
      alert("Failed to add product");
    }
  };

  const buttonStyle = {
    width:
      windowWidth >= 1024
        ? "15%"
        : windowWidth >= 768
        ? "24%"
        : windowWidth >= 640
        ? "25%"
        : "26%",
    height:
      windowWidth >= 1024
        ? "6vh"
        : windowWidth >= 768
        ? "4.5vh"
        : windowWidth >= 640
        ? "4vh"
        : "3.5vh",
    fontSize:
      windowWidth >= 1024
        ? "1.5rem"
        : windowWidth >= 768
        ? "1.25rem"
        : windowWidth >= 640
        ? "1.125rem"
        : "1rem",
    padding: "0.5rem 1rem",
    margin: "1.5%",
    borderRadius: "1rem",
    backgroundColor: "rgb(225,120,25)",
    color: "white",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
  };

  //  CONDITIONAL RENDERING
  const renderSection = () => {
    switch (action) {
      case "add":
        return <Form onSave={handleSaveProduct} />;

      case "read":
  return <ViewUsers />;

      case "update":
        return (
          <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
            🛠 Update Product Section Coming Soon
          </h2>
        );

      case "delete":
        return (
          <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
            🗑 Delete Product Section Coming Soon
          </h2>
        );

      default:
        return (
          <h2
            style={{
              textAlign: "center",
              marginTop: "3rem",
              fontSize: "1.5rem",
              color: "gray",
            }}>
              
            Select an option to manage your products 👇
          </h2>
        );
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgpattern})`,
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "2.5rem" }}>
        Admin Control Panel
      </h1>

      {/*  ACTION BUTTONS */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        <button style={buttonStyle} onClick={() => setAction("add")}>
           Add
        </button>
        <button style={buttonStyle} onClick={() => setAction("read")}>
          Users
        </button>
        <button style={buttonStyle} onClick={() => setAction("update")}>
          Prodcts
        </button>
        
      </div>

      {renderSection()}
    </div>
  );
};

export default AdminControl;
