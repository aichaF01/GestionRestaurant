import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [type_utilisateur, setType_utilisateur] = useState(localStorage.getItem('type_utilisateur'));
  const [utilisateur_id, setUtilisateur_id] = useState(localStorage.getItem('utilisateur_id'));

  const login = (newToken, newUser) => {
    setToken(newToken);
    setIsAuthenticated(true);
    setType_utilisateur(newUser.type_utilisateur);
    setUtilisateur_id(newUser.id);
    localStorage.setItem("token", newToken);
    localStorage.setItem("type_utilisateur", newUser.type_utilisateur);
    localStorage.setItem("utilisateur_id", newUser.id);
  };

  const logout = () => {
    setToken(null);
    setType_utilisateur(null);
    setUtilisateur_id(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('type_utilisateur');
    localStorage.removeItem("utilisateur_id");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated ,token, type_utilisateur,utilisateur_id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
