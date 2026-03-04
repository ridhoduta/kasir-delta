// authContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import * as authService from '../api/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (token) {
        try {
          const userData = await authService.getUser();
          setUser(userData);
        } catch {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    }
    fetchUser();
  }, [token]);

  async function doLogin(credentials) {
    const newToken = await authService.login(credentials);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const userData = await authService.getUser();
    setUser(userData);
  }

  async function doLogout() {
    await authService.logout();
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, login: doLogin, logout: doLogout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
