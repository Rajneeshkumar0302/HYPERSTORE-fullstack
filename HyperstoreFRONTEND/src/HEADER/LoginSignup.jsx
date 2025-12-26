import React, { useState } from "react";
import { google, facebook, bgpattern } from "../assets/Index.js";
import "../index.css";
import API from "../API.js";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // ✅ ADDED
import { useAuth } from "../context/AuthContext";


const LoginSignup = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate(); // ✅ ADDED

  const handleFlip = () => setIsFlipped(!isFlipped);

  // ✅ LOGIN HANDLER (SAFE)
  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔹 Form values (temporary)
    const formEmail = e.target.email.value.trim();
    const formPassword = e.target.password.value.trim();

    if (!formEmail || !formPassword) {
      Swal.fire({
        title: "Missing Fields ⚠️",
        text: "Please enter both email and password.",
        icon: "warning",
        background: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
        confirmButtonColor: "#ffcc00",
      });
      return;}

    setLoading(true);
   try {
  const res = await API.post("/auth/login", {
    email: formEmail,
    password: formPassword,
  });

  if (import.meta.env.DEV) {
    console.log("LOGIN RESPONSE:", res.data);
  }
  // 🔑 SINGLE SOURCE OF TRUTH
  login(res.data);

  Swal.fire({
    title: `Welcome Back, ${res.data.name || "User"}`,
    text: res.data.message || "Login successful!",
    icon: "success",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    showConfirmButton: false,
    timer: 2000,
  });

  setTimeout(() => {
    navigate("/");
  }, 2000);

} catch (err) {
  if (import.meta.env.DEV) {
    console.error("LOGIN ERROR:", err);
  }

  Swal.fire({
    title: "Login Failed ❌",
    text: err.response?.data?.message || "Something went wrong",
    icon: "error",
    confirmButtonColor: "#ff4b4b",
  });
}
 finally {
      setLoading(false);
    }
  };
  












  //  SIGNUP HANDLER (UNCHANGED LOGIC)
  
  const handleSignup = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    setLoading(true);

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      Swal.fire({
        title: `Welcome, ${name}! 🎉`,
        text: res.data.message || "Your account has been created successfully.",
        icon: "success",
        background: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
        showConfirmButton: false,
        timer: 2500,
        customClass: { popup: "glass-popup" },
      });

      //  Flip back to login
      setTimeout(() => {
        setIsFlipped(false);
      }, 2000);
    } catch (err) {
      Swal.fire({
        title: "Signup Failed ⚠️",
        text:
          err.response?.data?.message ||
          "Something went wrong. Please try again!",
        icon: "error",
        confirmButtonColor: "#ff5555",
      });
    } finally {setLoading(false);
   
    }
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-gray-100"
     style={{
    backgroundImage: `url(${bgpattern})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
   }}>
      {/* OUTER CARD CONTAINER */}
      <div className="flex w-[clamp(650px,80%,900px)] h-[clamp(500px,70%,800px)] rounded-2xl overflow-hidden shadow-2xl bg-white">




        {/* LEFT ORANGE FIXED SIDE */}
        <div className="w-1/2 bg-[rgb(231,111,33)] flex flex-col items-center justify-center
         text-white">
          <img  src="https://res.cloudinary.com/dcx4sk4cm/image/upload/v1763465700/hyperstorecanvas_tuvy7l.png"  alt="Grocery Logo" style={{border: "5px solid rgb(210, 110, 35)"}}
            className="w-[clamp(50px,17vw,160px)] h-[clamp(50px,17vw,160px)] mb-6 rounded-full "/>
          <h1 className="text-[clamp(1.8rem,2.5vw,2.5rem)] font-bold">
            HYPERSTORE 
          </h1>
          <p className="text-[clamp(0.9rem,1.3vw,1.1rem)] opacity-90">
            Freshness Delivered Daily
          </p>
        </div>
        {/* RIGHT WHITE SIDE (FLIP CARD) */}
        <div className="w-1/2 relative perspective">
  {/* rotating wrapper: this is the element that will rotate */}
  <div
    className={`absolute inset-0 transition-transform duration-700 preserve-3d ${
      isFlipped ? "rotate-y-180" : ""  }`}

    style={{transformStyle: "preserve-3d" }} // extra safety for some browsers
>
  
    {/* FRONT - LOGIN */}
    <div className="absolute inset-0 bg-white backface-hidden 
    flex flex-col items-center  p-8">
      {/* Login content */}
      
    <h2 className="text-4xl flex  font-bold mb-6 text-[rgb(231,111,33)]" style={{margin:"10%"}}>Sign In</h2>
    <div className="w-full h-[65%] flex flex-col items-center justify-center">
       
        <form onSubmit={handleLogin}
         className="w-full  flex flex-col items-center justify-center gap-11">
         
        <input type="email" name="email" placeholder="Email" required 
        className="border-b-2 border-gray-400 w-4/5 mb-6 focus:outline-none py-2" />
       <div className="relative w-4/5 mb-5">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    required
    className="border-b-2 border-gray-400 w-full focus:outline-none py-2 pr-10"
  />
  <div
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer
     text-gray-500 hover:text-gray-700">
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </div>
</div>
        <button type="submit" disabled={loading}
         className="bg-[rgb(231,111,33)] text-white  rounded-full
          hover:bg-[rgb(200,90,25)] transition-all" style={{padding:"2% 7%"}} >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      {/* to make a  proper gap  inte  facebook  and the googlle button */}
        <div className="w-full  flex flex-col items-center justify-center gap-5 ">
         <button className="text-blue-600 underline mt-4"
       onClick={handleFlip}>Create an account?</button>

      <div className="flex items-center my-4 w-4/5">
        <div  style={{ flexGrow: 1, height: "1px", backgroundColor: "#D1D5DB" // Tailwind's gray-300 color
         }} />
        <span className="px-2 text-gray-500 text-sm">or sign in with</span>
        <div  style={{ flexGrow: 1, height: "1px", backgroundColor: "#D1D5DB"  }} />
      </div>


      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full ">
  
  {/* Google Button */}
  <button
      style={{
    padding: window.innerWidth < 640 ? "12px 24px" : "12px 40px",
    fontSize: window.innerWidth < 640 ? "12px" : "16px",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "white",
    border: "1px solid #ddd",
    cursor: "pointer"
  }}
  >
    <img
      src={google}
      alt="Google"
     style={{
      width: window.innerWidth < 640 ? "20px" : "24px",
      height: window.innerWidth < 640 ? "26px" : "34px"
    }}
    />
    Google
  </button>

  {/* Facebook Button */}
  <button
      style={{
    padding: window.innerWidth < 640 ? "10px 24px" : "10px 40px",
    fontSize: window.innerWidth < 640 ? "12px" : "16px",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "white",
    border: "1px solid #ddd",
    cursor: "pointer"
  }}
  >
    <img
      src={facebook}
      alt="Facebook"
      style={{
      width: window.innerWidth < 640 ? "20px" : "26px",
      height: window.innerWidth < 640 ? "26px" : "29px"
    }}
    />
    Facebook
  </button>

</div>




     </div>      
   </div>      
 </div>

    {/* BACK - SIGNUP */}
    <div className="absolute inset-0 bg-white rotate-y-180 backface-hidden flex flex-col items-center p-8">
      {/* Signup content */}

      <h2 className="text-4xl flex  font-bold mb-6 text-[rgb(231,111,33)]" style={{margin:"10%"}}>Sign Up</h2>
      <div className="w-full h-[65%] flex flex-col items-center justify-center">

        <form onSubmit={handleSignup} className="w-full  flex flex-col items-center justify-center gap-11">
        <input type="text" name="name" id="name" placeholder="name" required
         className="border-b-2 border-gray-400 w-4/5 mb-5 focus:outline-none py-2"/>        
        <input type="email" name="email" id="email" placeholder="Email" required 
        className="border-b-2 border-gray-400 w-4/5 mb-5 focus:outline-none py-2"/>
       <div className="relative w-4/5 mb-5">
     <input
       type={showPassword ? "text" : "password"}
       name="password"
       id="password"
       placeholder="Password"
       required
       className="border-b-2 border-gray-400 w-full focus:outline-none py-2 pr-10" />
     <div
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer
     text-gray-500 hover:text-gray-700"  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </div>
</div>


        <button type="submit" disabled={loading} 
        className="bg-green-500 text-white rounded-full
         hover:bg-green-600 transition-all" style={{padding:"2% 7%"}}>
          {loading ? "Loading..." : "Register"}
        </button>
      </form>

      <button className="text-red-600 underline mt-4"
       onClick={handleFlip}>Already have an account?</button>

    </div>
         
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default LoginSignup;
