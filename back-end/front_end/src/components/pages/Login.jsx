import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./authContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email_utilisateur: "",
    Mot_passe: "",
  });

  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/inscription");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        loginData
      );
      if (response.data.token) {
        login(response.data.token, response.data.user);
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-connexion">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div>
              <h4>Login</h4>
            </div>
            <div className="mb-3">
              <label htmlFor="email_utilisateur" className="form-label">
                Adresse email
              </label>
              <input
                type="email"
                name="email_utilisateur"
                id="email_utilisateur"
                placeholder="name@example.com"
                className="form-control"
                value={loginData.email_utilisateur}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Mot_passe" className="form-label">
                Mot de passe
              </label>
              <input
                type="password"
                name="Mot_passe"
                id="Mot_passe"
                placeholder="Mot de passe"
                className="form-control"
                value={loginData.Mot_passe}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary btn1">
              Login
            </button>
            <button
              type="submit"
              onClick={handleRegister}
              className="btn btn-primary btn1"
            >
              S'inscrire
            </button>
            <button className="btn btn-light" onClick={handleLogout}>
              Deconnexion
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
