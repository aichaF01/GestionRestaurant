import React, { useState, useEffect } from "react";
import "./../../css/menu.css";
import axios from "axios";

import { useCart } from "./cartContext";

const Menu = () => {
  const { addItemToCart } = useCart();
  const [plats, setPlats] = useState([]);
  const [categorieList, setGategorieList] = useState(null);
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    const fetchPlat = async () => {
      try {
        const result = await axios.get("http://127.0.0.1:8000/api/plats");
        // console.log(result.data.results);
        setPlats(result.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlat();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement de soumission par défaut du formulaire
  };
  const handleChange = (e) => {
    setGategorieList(e.target.value);
  };
  const handleRecherche = (e) => {
    setRecherche(e.target.value);
  };

  const handleAddItem = (id) => {
    const item = plats.find((i) => i.id === id);
    addItemToCart(item);
  };
  // console.log(cart);

  const PlatsFiltrer = plats.filter((plat) => {
    if (categorieList && plat.categorie_plat !== categorieList) {
      return false;
    }
    if (
      recherche &&
      !plat.nom_plat.toLowerCase().includes(recherche.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <>
      <div className="page-menu">
        <form
          className="d-flex form-menu m-2"
          role="search"
          onSubmit={handleSubmit}
        >
          <select className="form-select" onChange={handleChange}>
            <option value="">Toutes les catégories</option>
            <option value="plats d'entree">Plats d'entrée</option>
            <option value="plats principaux">Plats principaux</option>
            <option value="desserts">Desserts</option>
            <option value="boissons">Boissons</option>
          </select>
          <input
            className="form-control search-menu me-2"
            type="search"
            placeholder="fait une recherche..."
            onChange={handleRecherche}
            aria-label="Search"
          />
          <button className="btn btn-outline-warning btn-menu" type="submit">
            Rechercher
          </button>
        </form>
        <div className="row m-1">
          <h2>MENU</h2>
          {PlatsFiltrer.map((item) => (
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card card-menu" key={item.id}>
                <img
                  src={"http://127.0.0.1:8000/storage/" + item.image_plat}
                  className="card-img-top img-fluid img-thumbnail"
                />
                <div className="card-body body-menu">
                  <h5 className="card-title title-menu">{item.nom_plat}</h5>
                  <p className="card-text text-menu">{item.description_plat}</p>
                  <h6 className="card-subtitle subtitle-menu text-muted">
                    {item.prix_plat} DH
                  </h6>
                  <button
                    className="btn btn-outline-secondary mt-1 btn-menu fixed-button"
                    onClick={() => handleAddItem(item.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
