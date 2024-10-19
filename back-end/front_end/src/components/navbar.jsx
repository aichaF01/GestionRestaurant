import React from "react";
import { faCartShopping, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink,useNavigate } from "react-router-dom";
import { useAuth } from "./pages/authContext";
import "./../css/navbar.css";

const Navbar = ({ totalItems }) => {
  const { type_utilisateur } = useAuth();
  const navigate = useNavigate();


  return (
    <nav className="navbar navbar-expand-lg page-navbar fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <span>
            <FontAwesomeIcon icon={faHome} />
          </span>
        </NavLink>
        <div className="navbar-br texte-en-gras">RestoManager</div>
        {/* <img src="logo.jpg" alt="" /> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar01"
          aria-controls="navbar01"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar01">
          <ul className="navbar-nav ml-auto">
            {type_utilisateur === "admin" && (
              <>
                <li className="nav-item">
                  <NavLink to="/list_users" className="nav-it">
                    Liste d'utilisateurs
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/list_reservations" className="nav-it">
                    Liste des reservations
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/list_commandes" className="nav-it">
                    Liste des commandes
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink to="/" className="nav-it">
                Acceuil
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/menu" className="nav-it">
                Menu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/reservation" className="nav-it">
                Reservation
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-it">
                Contact
              </NavLink>
            </li>
            <li>
              <button className="btn" style={{ marginLeft: "90%" }}>
                <NavLink className="navbar-brand" to="/cart">
                  <span>
                    <FontAwesomeIcon icon={faCartShopping} />
                    {totalItems > 0 && (
                      <span className="badge rounded rounded-pill position-absolute translate-middle top-25">
                        {totalItems}
                      </span>
                    )}
                  </span>
                </NavLink>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
