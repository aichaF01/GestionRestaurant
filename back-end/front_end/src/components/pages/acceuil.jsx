import React from "react";
import { Link } from "react-router-dom";
import "./../../css/app.css";

// export default function Acceuil()
const Acceuil = () => {
  return (
    <div className="page-acceuil">
      <div className="desc">
        <h2>
          Description de <span class="resto-manager">RestoManager</span>
        </h2>
        <p class="texte-en-gras">
          Notre restaurant vous acceuille dans un cadre élégant et chaleureux.
          Nous vous proposons une expérience culinaire mémorable avec un service
          attentif et professionnel. Notre menu varié est conçu avec soin pour
          satisfaire tous les palais, offrant des plats savoureux préparés avec
          des ingrédients frais. Venez savourer une pause gourmande dans une
          atmosphère conviviale et détendue. Laissez-vous séduire par notre
          cuisine authentique et nos délices maison.
        </p>
        <Link to="/menu" className="menu-link">
          Commencer !
        </Link>
      </div>
    </div>
  );
};

export default Acceuil;
