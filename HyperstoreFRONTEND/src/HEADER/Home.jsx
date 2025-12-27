
import React, { useEffect, useState } from "react";

import Section1 from '../SECTIONS/Section1';

const Home = () => {
 

  return (
    <div>    
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(100px, 17vw, 190px)",
        background: "linear-gradient(to bottom, rgb(244, 120, 25), rgb(255,255,255))",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        overflow: "hidden",  }}>
      
      {/* Background Ghost Text */}
      <h1 style={{  position: "absolute",
          fontSize: "clamp(4rem, 10vw, 12rem)",
          fontWeight: "900",
          letterSpacing: "clamp(2px, 0.4vw, 9px)",
          textTransform: "uppercase",
          bottom: "-2%",
          left: "50%",
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
          userSelect: "none",
          backgroundImage:
            "linear-gradient(90deg, #c7c7c7, #ffffff, #c7c7c7)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          backgroundSize: "200% auto",
          animation: "shimmer 3s linear infinite",
          opacity: "0.4",  }} >
          HyperStore  </h1>
          <style>
        {`
          @keyframes shimmer {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}
      </style>
    </section>

    <div style={{margin:"-5.99% 0% 0% 0%"}}>
      <Section1 />
    </div>
      
     
     <section>
     {/* Main Foreground Box */}
      <div
        style={{
          position: "relative",
          background: "rgba(239,237,205,1)",
          backdropFilter: "blur(30px)",
          boxShadow: "0px 40px 46px rgba(0,0,0,0.4)",
          borderRadius: "70% 70% 0% 0%",
          padding: "0.6rem 4rem",
          zIndex: 2,
        }}>
        <h1
          style={{
            fontSize: "clamp(1.7rem, 4vw, 3.5rem)",
            fontWeight: "bold",
            color: "#222",
            textAlign: "center", }} >
          Welcome to <span style={{ color: "rgb(200,90,25)" }}>HyperStore</span>
        </h1>
      </div>

     </section>
    </div>
  );
};

export default Home;

