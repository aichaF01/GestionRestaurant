import React, { useState } from "react";
import "./../../css/app.css";
import axios from "axios";
import { useAuth } from "./authContext";

export default function Reservation() {
  const [reservationData, setReservationData] = useState({
    nom_client: "",
    nb_tables: "",
    nb_personnes: "",
    date_reservation: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { token } = useAuth();

  const handleReservation = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Formater la date
    const formattedDate =
      reservationData.date_reservation.replace("T", " ") + ":00";
    const formattedReservationData = {
      ...reservationData,
      date_reservation: formattedDate,
    };

    console.log("Données de réservation à envoyer :", formattedReservationData);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/reservation",
        formattedReservationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setSuccess("Réservation réussie !");
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      if (error.response) {
        // Erreur de réponse du serveur
        console.error("Réponse du serveur :", error.response.data);
        setError(
          `Erreur: ${error.response.data.message || "Veuillez réessayer."}`
        );
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        console.error(
          "La requête a été faite mais aucune réponse n'a été reçue :",
          error.request
        );
        setError(
          "Aucune réponse du serveur. Veuillez vérifier votre connexion."
        );
      } else {
        // Autre type d'erreur
        console.error("Erreur :", error.message);
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-start align-items-center">
        <div className="col-md-4">
          <div className="image-container">
            <img
              src="/images/table2.jpg"
              alt="Reservation"
              className="reservation-image img-fluid side-image"
            />
            <img
              src="/images/table3.jpg"
              alt="Reservation"
              className="reservation-image img-fluid central-image"
            />
            <img
              src="/images/table4.jpg"
              alt="Reservation"
              className="reservation-image img-fluid side-image"
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="p-5 page-reservation">
            <div>
              <h1>RESERVATION ONLINE</h1>
              <hr />
            </div>
            <div className="p-2"></div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  <b>Nom du client</b>
                </label>
                <input
                  type="text"
                  name="nom_client"
                  className="form-control"
                  placeholder="Votre nom"
                  value={reservationData.nom_client}
                  onChange={handleReservation}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <b>Nombres des tables</b>
                </label>
                <select
                  name="nb_tables"
                  className="form-control"
                  value={reservationData.nb_tables}
                  onChange={handleReservation}
                >
                  <option value="">Sélectionner</option>
                  {[...Array(10).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} table(s)
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <b>Nombres des personnes</b>
                </label>
                <select
                  name="nb_personnes"
                  className="form-control"
                  value={reservationData.nb_personnes}
                  onChange={handleReservation}
                >
                  <option value="">Sélectionner</option>
                  {[...Array(10).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} personne(s)
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  <b>Date et L'heure</b>
                </label>
                <input
                  type="datetime-local"
                  name="date_reservation"
                  className="form-control"
                  placeholder="Date & L'heure"
                  value={reservationData.date_reservation}
                  onChange={handleReservation}
                />
              </div>
              <button type="submit" className="btn-reserver">
                Réserver
              </button>
            </form>
            {/* {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && (
              <div className="alert alert-success mt-3">{success}</div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
