import React, { createContext, useState, useContext } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const loggedUser = await api.loginUser(email, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const register = async ({ name, email, password }) => {
    const newUser = await api.registerUser({ name, email, password });
    return newUser;
  };

  const updateProfile = async ({ name, email }) => {
    const updated = await api.updateUserProfile({
      idToken: user?.idToken,
      name,
      email,
    });
    setUser((prev) => ({ ...prev, ...updated }));
    return updated;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
