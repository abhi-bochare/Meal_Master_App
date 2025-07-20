import React, { createContext, useContext, useState, useEffect } from "react";
import { get, post, put } from "../utils/api"; // This should wrap axios with auth headers
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log(" No token found, skipping auth check");
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      console.log("Checking auth status…");
      const res = await get("/auth/me");
      console.log("Auth status success:", res.data?.user);
      setUser(res.data?.user || null);
    } catch (err) {
      console.error("Auth status failed:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await post("/auth/login", { email, password });

      const { token, user } = response;

      if (!token) {
        throw new Error("No token received");
      }

      localStorage.setItem("token", token);
      setUser(user);
      console.log("Token stored:", token);
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    try {
      const data = await post("/auth/register", { email, password, name });
      const { token, user } = data;
      localStorage.setItem("token", token);
      setUser(user);
    } catch (error) {
      throw new Error(error?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateProfile = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/auth/profile`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        checkAuthStatus,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
