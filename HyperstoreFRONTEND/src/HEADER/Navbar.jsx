import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SearchBtn, User, cart } from "../assets/Index";
import { ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
 
const Navbar = () => {
  const { user, loading, logout } = useAuth(); //  only source- means single truth
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const totalQuantity = useSelector(
  (state) => state.cart.totalQuantity
);
 

  //  AUTO-CLOSE DROPDOWN WHEN USER LOGS OUT
  useEffect(() => {
    if (!user) setOpen(false);
  }, [user]);
  if (loading) return null;
  if (import.meta.env.DEV) {
    console.log("AUTH USER 👉", user);
  }

   return (
    <div className="w-200%" >
<nav className=" text-white px-8 py-2  " 
style={{ backgroundColor:"rgb(244, 120, 25)",padding:"0.5%" }}>
  <div className="flex items-center justify-between">
    
    
<Link to="/" className="flex items-center space-x-2">
<img src="https://res.cloudinary.com/dcx4sk4cm/image/upload/v1763465700/hyperstorecanvas_tuvy7l.png" alt="Logo"

 className=" w-[clamp(50px,17vw,140px)] h-[clamp(50px,17vw,140px)]  ease-in-out hover:scale-105 transition-transform duration-200 rounded-full  "/>
<span style={{color: "rgb(255, 255, 255)",}}
 className="hidden md:inline-block text-base sm:text-lg md:text-xl lg:text-2xl font-bold ">
  <span className='text-xl sm:text2xl md:text-4xl lg:text-5xl'>H</span >YPER<span className='text-xl sm:text2xl md:text-4xl lg:text-5xl'>S</span>TORE</span>
</Link>

    

                                        {/* //SEARCH -BAR // */}

<div className="relative transition-all duration-400 ease-in-out
                w-[clamp(6rem,20vw,20rem)] hover:w-[clamp(10rem,40vw,25rem)]">
<input type="text" placeholder="Search" style={{ backgroundColor:"white" ,padding:"1rem", }}
className="rounded-full  text-black  w-full h-9 focus:outline-none" />
<img src={SearchBtn} alt="Search"
className="h-6 w-6 absolute right-3 top-1/2 transform -translate-y-1/2 
cursor-pointer hover:scale-130 transition-transform duration-200"/>
  </div>



<ul className="flex items-center  justify-end  text-sm font-medium gap-[clamp(0.5rem,2vw,1.2rem)]">
 <li>
  <Link to="/Cart" className="relative inline-block">
    
    {/* CART ICON */}
    <img
      src={cart}
      alt="Cart"
      className="w-[clamp(2.3rem,3vw,10rem)] 
      hover:scale-120 transition-transform duration-200"
    />

    {/*  notification icon */}
    {totalQuantity > 0 && (
      <span
        className="
          absolute 
          -top-1 
          -right-1 
          bg-red-600 
          text-white 
          text-xs 
          font-bold 
          rounded-full 
          w-5 
          h-5 
          flex 
          items-center 
          justify-center" >
        {totalQuantity}
      </span>
    )}

  </Link>
</li>

          
 

<li style={{ position: "relative", margin: "0rem 1rem" }}>
  {/* USER ICON WITH DROPDOWN ARROW */}
  <div
    className="flex items-center gap-1 cursor-pointer"
    onClick={() => {
      if (!user) {
        navigate("/LoginSignup");
      } else {
        setOpen(!open);
      }
    }}
  >
    <img
      src={User}
      alt="User"
      className="w-[clamp(2.3rem,3vw,10rem)] hover:scale-110 transition-transform duration-300"
    />

    {/*  ARROW INDICATOR */}
    {user && (
      <ChevronDown
        size={18}
        className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      />
    )}
  </div>

  {/* DROPDOWN (ONLY IF LOGGED IN) */}
  {user && open && (
    <div
      className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border z-50"
    >
      {/* PROFILE NAME/EMAIL */}
      <div className="px-4 py-2 text-sm text-gray-700 border-b">
        {user.name || user.email}
      </div>

      {/* ADMIN CONTROL */}
      {user.role === "admin" && (
        <Link
          to="/admincontrol"
          className="block px-4 py-2 text-sm hover:bg-gray-100"
          onClick={() => setOpen(false)}
        >
          Admin Control
        </Link>
      )}

      {/* LOGOUT */}
      <button
        onClick={() => {
          logout();
          setOpen(false);
          navigate("/");
        }}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" >
        Logout
      </button>
    </div>
    )}
  </li>
 </ul>


  </div>
</nav>

    </div>
  )}

export default Navbar; 




;
