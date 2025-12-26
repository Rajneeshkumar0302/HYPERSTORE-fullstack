import React, { useState } from "react";
import { google, facebook, bgpattern } from "../assets/Index.js";
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
      Swal.fire({ title: "Login Successful", icon: "success", timer: 1500, showConfirmButton: false });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      Swal.fire("Login Failed", err.response?.data?.message || "Something went wrong", "error");
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
      Swal.fire("Signup Failed", err.response?.data?.message || "Try again", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SHARED STYLES ---------------- */
  const inputStyle = {
    width: "100%",
    fontSize: "clamp(14px, 3.5vw, 16px)",
    padding: "10px 6px",
    border: "none",
    borderBottom: "2px solid #ccc",
    outline: "none",
    background: "transparent",
  };

  const buttonStyle = {
    fontSize: "clamp(14px, 3.8vw, 16px)",
    padding: "12px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(10px, 4vw, 24px)",
        backgroundImage: `url(${bgpattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: window.innerWidth < 768 ? "column" : "row",
          borderRadius: "clamp(12px, 4vw, 20px)",
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
        }}
      >
        {/* LEFT PANEL (auto hides on small screens) */}
        {window.innerWidth >= 768 && (
          <div
            style={{
              width: "50%",
              backgroundColor: "#f97316",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(20px, 4vw, 40px)",
            }}
          >
            <img
              src="https://res.cloudinary.com/dcx4sk4cm/image/upload/v1763465700/hyperstorecanvas_tuvy7l.png"
              alt="Logo"
              style={{
                width: "clamp(90px, 20vw, 140px)",
                height: "clamp(90px, 20vw, 140px)",
                borderRadius: "50%",
                border: "4px solid #fdba74",
                marginBottom: "20px",
              }}
            />
            <h1 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700 }}>HYPERSTORE</h1>
            <p style={{ fontSize: "clamp(14px, 3vw, 16px)", opacity: 0.9 }}>
              Freshness Delivered Daily
            </p>
          </div>
        )}

        {/* RIGHT PANEL */}
        <div
          style={{
            width: "100%",
            position: "relative",
            perspective: "1000px",
            minHeight: "clamp(480px, 80vh, 600px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
              transition: "transform 0.7s",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* LOGIN */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "clamp(16px, 4vw, 24px)",
                padding: "clamp(20px, 5vw, 40px)",
              }}
            >
              <h2 style={{ fontSize: "clamp(22px, 5vw, 30px)", color: "#f97316", textAlign: "center" }}>
                Sign In
              </h2>

              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <input name="email" type="email" placeholder="Email" style={inputStyle} />

                <div style={{ position: "relative" }}>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    style={inputStyle}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "6px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      color: "#6b7280",
                    }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>

                <button
                  disabled={loading}
                  style={{ ...buttonStyle, backgroundColor: "#f97316", color: "#fff" }}
                >
                  {loading ? "Loading..." : "Login"}
                </button>
              </form>

              <button
                onClick={handleFlip}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "clamp(13px, 3.5vw, 15px)",
                  color: "#2563eb",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Create an account?
              </button>
            </div>

            {/* SIGNUP */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "20px",
                padding: "clamp(20px, 5vw, 40px)",
              }}
            >
              <h2 style={{ fontSize: "clamp(22px, 5vw, 30px)", color: "#f97316", textAlign: "center" }}>
                Sign Up
              </h2>

              <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <input name="name" placeholder="Name" style={inputStyle} />
                <input name="email" type="email" placeholder="Email" style={inputStyle} />
                <input name="password" type="password" placeholder="Password" style={inputStyle} />

                <button
                  disabled={loading}
                  style={{ ...buttonStyle, backgroundColor: "#22c55e", color: "#fff" }}
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </form>

              <button
                onClick={handleFlip}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "clamp(13px, 3.5vw, 15px)",
                  color: "#dc2626",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
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

