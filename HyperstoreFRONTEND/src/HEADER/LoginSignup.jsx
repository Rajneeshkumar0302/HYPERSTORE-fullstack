import React, { useState } from "react";
import { google, facebook, bgpattern } from "../assets/Index.js";
import "../index.css";
import API from "../API.js";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginSignup = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFlip = () => setIsFlipped(!isFlipped);

  /* ---------------- LOGIN ---------------- */
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      Swal.fire("Missing Fields", "Enter email & password", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data);

      Swal.fire({
        title: "Login Successful",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      Swal.fire(
        "Login Failed",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SIGNUP ---------------- */
  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    setLoading(true);
    try {
      await API.post("/auth/register", { name, email, password });
      Swal.fire("Account Created", "You can now login", "success");
      setIsFlipped(false);
    } catch (err) {
      Swal.fire(
        "Signup Failed",
        err.response?.data?.message || "Try again",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
      style={{
        backgroundImage: `url(${bgpattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* CARD */}
      <div className="flex w-full max-w-4xl min-h-[520px] rounded-2xl overflow-hidden shadow-2xl bg-white">

        {/* LEFT PANEL (Desktop only) */}
        <div className="hidden md:flex w-1/2 bg-orange-500 text-white flex-col items-center justify-center">
          <img
            src="https://res.cloudinary.com/dcx4sk4cm/image/upload/v1763465700/hyperstorecanvas_tuvy7l.png"
            alt="Logo"
            className="w-36 h-36 rounded-full border-4 border-orange-300 mb-6"
          />
          <h1 className="text-3xl font-bold">HYPERSTORE</h1>
          <p className="opacity-90">Freshness Delivered Daily</p>
        </div>

        {/* RIGHT PANEL */}
        <div className="relative w-full md:w-1/2 perspective">
          <div
            className={`absolute inset-0 transition-transform duration-700 ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* -------- LOGIN -------- */}
            <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center px-6">
              <h2 className="text-3xl font-bold text-orange-500 mb-6">Sign In</h2>

              <form
                onSubmit={handleLogin}
                className="w-full flex flex-col gap-6"
              >
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="border-b-2 py-2 outline-none"
                />

                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="border-b-2 py-2 w-full outline-none"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2 cursor-pointer text-gray-500"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </span>
                </div>

                <button
                  disabled={loading}
                  className="bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600"
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </form>

              <button
                onClick={handleFlip}
                className="text-blue-600 underline mt-4"
              >
                Create an account?
              </button>

              <div className="flex items-center my-4 w-full">
                <div className="flex-grow h-px bg-gray-300" />
                <span className="px-2 text-sm text-gray-500">
                  or sign in with
                </span>
                <div className="flex-grow h-px bg-gray-300" />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button className="flex items-center justify-center gap-2 px-6 py-3 border rounded-full">
                  <img src={google} alt="Google" className="w-5" />
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 border rounded-full">
                  <img src={facebook} alt="Facebook" className="w-5" />
                  Facebook
                </button>
              </div>
            </div>

            {/* -------- SIGNUP -------- */}
            <div className="absolute inset-0 rotate-y-180 backface-hidden flex flex-col items-center justify-center px-6">
              <h2 className="text-3xl font-bold text-orange-500 mb-6">Sign Up</h2>

              <form
                onSubmit={handleSignup}
                className="w-full flex flex-col gap-6"
              >
                <input
                  name="name"
                  placeholder="Name"
                  className="border-b-2 py-2 outline-none"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="border-b-2 py-2 outline-none"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="border-b-2 py-2 outline-none"
                />

                <button
                  disabled={loading}
                  className="bg-green-500 text-white py-2 rounded-full hover:bg-green-600"
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </form>

              <button
                onClick={handleFlip}
                className="text-red-600 underline mt-4"
              >
                Already have an account?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
