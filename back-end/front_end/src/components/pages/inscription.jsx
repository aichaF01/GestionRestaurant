import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../pages/authContext";
import { useLocation, useNavigate } from "react-router-dom";

const Inscription = () => {
  const [inscriptionData, setInscriptionData] = useState({
    nom_utilisateur: "",
    email_utilisateur: "",
    num_telephonique: "",
    CIN: "",
    Mot_passe: "",
  });

  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInscriptionData({ ...inscriptionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/inscription",
        inscriptionData
      );

      if (response.status === 201) {
        const from = location.state?.from?.pathname || "/";
        navigate(from);
      }

      if (response.data.token) {
        login(response.data.token);
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        console.error("Erreurs de validation :", errors);
        let errorMessage = "Il y a des erreurs de validation:\n";
        if (errors.email_utilisateur) {
          errorMessage += `Email: ${errors.email_utilisateur.join(", ")}\n`;
        }
        if (errors.CIN) {
          errorMessage += `CIN: ${errors.CIN.join(", ")}\n`;
        }
        alert(errorMessage);
      } else {
        console.error("Erreur lors de l'inscription :", error.message);
        alert("Erreur lors de l'inscription. Veuillez réessayer plus tard.");
      }
    }
  };

  return (
    <div className="page-inscription">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form>
            <div>
              <h4>S'inscrire</h4>
            </div>
            <div className="mb-3">
              <label htmlFor="nom_utilisateur" className="form-label">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                name="nom_utilisateur"
                id="nom_utilisateur"
                placeholder="Votre nom"
                className="form-control"
                value={inscriptionData.nom_utilisateur}
                onChange={(e) => handleInputChange(e)}
              />
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
                value={inscriptionData.email_utilisateur}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="num_telephonique" className="form-label">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                name="num_telephonique"
                id="num_telephonique"
                placeholder="Votre numéro"
                className="form-control"
                value={inscriptionData.num_telephonique}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="CIN" className="form-label">
                CIN
              </label>
              <input
                type="text"
                name="CIN"
                id="CIN"
                placeholder="Votre CIN"
                className="form-control"
                value={inscriptionData.CIN}
                onChange={(e) => handleInputChange(e)}
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
                value={inscriptionData.Mot_passe}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
