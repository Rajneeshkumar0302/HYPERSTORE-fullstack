import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./HEADER/Navbar";
import SecondNavbar from "./HEADER/SecondNavbar";
import Footer from "./FOOTER/Footer";

import Home from "./HEADER/Home";
import Contact from "./HEADER/Contact";
import Cart from "./HEADER/Cart";
import LoginSignup from "./HEADER/LoginSignup";
import Categories from "./HEADER/Categories";
import Men from "./HEADER/Men";
import Women from "./HEADER/Women";
import Kids from "./HEADER/Kids";
import Electronics from "./HEADER/Electronics";
import Grocery from "./HEADER/Grocery";
import Medical from "./HEADER/Medical";

import Layout from "./SIDEBAR/Layout";
import AdminControl from "./ADMIN/AdminControl";

const App = () => {
  return (
    
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
     
      <Navbar />
      <SecondNavbar />

    
      <main
        style={{
          flex: 1,                 
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/loginsignup" element={<LoginSignup />} />

          <Route element={<Layout />}>
            <Route path="/category/men" element={<Men />} />
            <Route path="/category/women" element={<Women />} />
            <Route path="/category/kids" element={<Kids />} />
            <Route path="/category/electronics" element={<Electronics />} />
            <Route path="/category/grocery" element={<Grocery />} />
            <Route path="/category/medical" element={<Medical />} />
          </Route>

          <Route path="/categories" element={<Categories />} />
          <Route path="/admincontrol" element={<AdminControl />} />
        </Routes>
      </main>

      {/* FOOTER ALWAYS AT BOTTOM */}
      <Footer />
    </div>
  );
};

export default App;





// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./HEADER/Navbar";
// import Footer from "./FOOTER/Footer";
// import Home from "./HEADER/Home";
// import Contact from "./HEADER/Contact";
// import Cart from "./HEADER/Cart";
// import LoginSignup from "./HEADER/LoginSignup";
// import Categories from "./HEADER/Categories";
// import Men from "./HEADER/Men";
// import Women from "./HEADER/Women";
// import Kids from "./HEADER/Kids";
// import Electronics from "./HEADER/Electronics";
// import Grocery from "./HEADER/Grocery";
// import Medical from "./HEADER/Medical";
// import Layout from "./SIDEBAR/Layout";
// import AdminControl from "./ADMIN/AdminControl";
// import SecondNavbar from "./HEADER/SecondNavbar";

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <SecondNavbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/loginsignup" element={<LoginSignup />} />

//         <Route element={<Layout />}>
//           <Route path="/category/men" element={<Men />} />
//           <Route path="/category/women" element={<Women />} />
//           <Route path="/category/kids" element={<Kids />} />
//           <Route path="/category/electronics" element={<Electronics />} />
//           <Route path="/category/grocery" element={<Grocery />} />
//           <Route path="/category/medical" element={<Medical />} />
//         </Route>

//         <Route path="/categories" element={<Categories />} />
//         <Route path="/admincontrol" element={<AdminControl />} />
//       </Routes>

//       <Footer />
//     </>
//   );
// };

// export default App;
