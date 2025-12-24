import { createContext, useContext, useEffect, useState } from "react";
import API from "../API.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  console.log("AUTH CONTEXT USER:", user);
}, [user]);

  // 🔹 Fetch user on refresh (token-based)
  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetchUser();
  } else {
    setLoading(false);
  }
}, []);




  //  CORRECT LOGIN FUNCTION
  const login = (data) => {
    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

      // 🔥 THIS IS THE FIX
  setUser({
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
  });


    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);




// import { createContext, useContext, useEffect, useState } from "react";
// import API from "../API.js";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setUser(null);
//         setLoading(false);
//         return;
//       }

//       // backend verification
//       const res = await API.get("/auth/me");
//       setUser(res.data); // { _id, name, email, role }

//     } catch (error) {
//       console.error("Auth failed:", error.message);
//       localStorage.removeItem("token");
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
