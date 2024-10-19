import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "./cartContext";
import { useAuth } from "../pages/authContext";

const PageConfirmation = () => {
  const { cart, setCart, calculateTotal } = useCart();
  const { token, utilisateur_id } = useAuth();
  const navigate = useNavigate();

  const [commandeData, setCommandeData] = useState({
    date_commande: new Date().toISOString().slice(0, 10),
    utilisateur_id: "",
    plat_id: cart.map((item) => item.id),
    totale: calculateTotal(),
  });

  useEffect(() => {
    setCommandeData((prevData) => ({
      ...prevData,
      plat_id: cart.map((item) => item.id),
      totale: calculateTotal(),
      utilisateur_id: utilisateur_id,
    }));
  }, [cart, calculateTotal, utilisateur_id]);

  const handleCancel = (event) => {
    event.preventDefault();
    alert("Commande annulée avec succès");
    navigate("/");
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    console.log("Données de commande à envoyer :", commandeData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/commandes",
        commandeData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201) {
        alert("Commande confirmée avec succès");
        setCart([]);
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la confirmation de la commande:",
        error.response ? error.response.data : error.message
      );
      alert("Une erreur est survenue lors de la confirmation de la commande");
    }
  };

  return (
    <div className="page-confirmation">
      <h2>Confirmation de la Commande</h2>
      <form className="confirmation-form" onSubmit={handleConfirm}>
        <button type="button" className="btn btn-danger" onClick={handleCancel}>
          Annuler la Commande
        </button>
        <button type="submit" className="btn btn-primary">
          Confirmer la Commande
        </button>
      </form>
    </div>
  );
};

export default PageConfirmation;
