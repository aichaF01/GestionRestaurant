import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./../../css/commande.css";
import { useAuth } from "./authContext";

const List_commandes = () => {
  const [commandes, setCommandes] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const result = await axios.get(
          "http://127.0.0.1:8000/api/commandes",
          {
            headers: {
              accept: "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        setCommandes(result.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCommande();
  }, []);
  return (
    <>
      <h3>
        <img src="img7.jpg" alt="" className="title-icon" />
        Listes des commandes</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">date de commande</th>
            <th scope="col">ID d'utilisateur</th>
            <th scope="col">Totale</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((r) => (
            <tr>
              <th scope="row">{r.id}</th>
              <td>{r.date_commande}</td>
              <td>{r.utilisateur_id}</td>
              <td>{r.totale} DH</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default List_commandes;
