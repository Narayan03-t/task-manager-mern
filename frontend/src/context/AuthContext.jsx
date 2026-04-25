import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

const AuthContext = createContext(null);
const STORAGE_KEY = "task-manager-auth";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const savedAuth = localStorage.getItem(STORAGE_KEY);
      return savedAuth ? JSON.parse(savedAuth) : { token: "", user: null };
    } catch (_error) {
      localStorage.removeItem(STORAGE_KEY);
      return { token: "", user: null };
    }
  });
  const [authLoading, setAuthLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  }, [auth]);

  const authenticate = async (endpoint, payload) => {
    setAuthLoading(true);

    try {
      const { data } = await api.post(endpoint, payload);
      const nextAuth = {
        token: data.token,
        user: data.user,
      };
      setAuth(nextAuth);
      navigate("/dashboard", { replace: true });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const login = (payload) => authenticate("/auth/login", payload);
  const signup = (payload) => authenticate("/auth/register", payload);

  const logout = () => {
    setAuth({ token: "", user: null });
    localStorage.removeItem(STORAGE_KEY);
    navigate("/login", { replace: true });
  };

  const value = {
    token: auth.token,
    user: auth.user,
    authLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
