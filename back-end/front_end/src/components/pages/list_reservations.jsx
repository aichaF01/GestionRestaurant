import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "./authContext";

const List_reservations = () => {
  const [reservations, setReservations] = useState([]);
  const {token}=useAuth();

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const result = await axios.get(
          "http://127.0.0.1:8000/api/reservations",
          {
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        setReservations(result.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReservation();
  }, []);
  return (
    <>
      <h3>Listes des reservations</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nom de client</th>
            <th scope="col">Nombres des tables</th>
            <th scope="col">Nombres de personnes</th>
            <th scope="col">Date de reservation</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r) => (
            <tr>
              <th scope="row">{r.id}</th>
              <td>{r.nom_client}</td>
              <td>{r.nb_tables}</td>
              <td>{r.nb_personnes}</td>
              <td>{r.date_reservation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default List_reservations;
