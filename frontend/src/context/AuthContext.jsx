import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setUserFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded.user);
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUserFromToken(token);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://stayfinder-backend-kmg8.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUserFromToken(token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || "An error occurred during login",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(
        // "http://localhost:5000/api/auth/register",
        "https://stayfinder-backend-kmg8.onrender.com/auth/register",
        userData
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUserFromToken(token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          "An error occurred during registration",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
