import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const List_utilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect(() => {
    const fetchUtilisateur = async () => {
      try {
        const result = await axios.get(
          "http://127.0.0.1:8000/api/utilisateurs"
        );
        setUtilisateurs(result.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUtilisateur();
  },[]);
  return (
    <>
      <h3>Listes des utilisateurs</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">nom d'utilisateur</th>
            <th scope="col">email d'utilisateur</th>
            <th scope="col">numéro de telephone</th>
            <th scope="col">CIN</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((user) => (
            <tr>
              <th scope="row">{user.id}</th>
              <td>{user.nom_utilisateur}</td>
              <td>{user.email_utilisateur}</td>
              <td>{user.num_telephonique}</td>
              <td>{user.CIN}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default List_utilisateurs;
