import React, { createContext, useState, useContext, useEffect } from "react";
import { Heading } from "@chakra-ui/react";

import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";

import api from "../utils/axiosApi";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      if (token) {
        console.log("Got a token in the cookies, lets see if its valid");
        api.defaults.headers.Authorization = `Bearer ${token}`;
        //update me to a proper api
        const { data: user } = await api.get("users/me");
        if (user) {
          setuser(user);
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (account, username, password) => {
    const { data: token } = await api.post("auth/login", {
      account,
      username,
      password,
    });
    if (token) {
      console.log("Got token");
      Cookies.set("token", token, { expires: 60 });
      api.defaults.headers.Authorization = `Bearer ${token.token}`;
      const { data: user } = await api.get("users/me");
      setuser(user);
      console.log("Got user", user);
    }
  };

  const logout = (account, username, password) => {
    Cookies.remove("token");
    setuser(null);
    delete api.defaults.headers.Authorization;
    window.location.pathname = "/";
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading || (!isAuthenticated && window.location.pathname !== "/")) {
    return <Heading>Loading...</Heading>;
  }
};

