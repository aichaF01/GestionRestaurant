import React, { useState } from "react";
import axios from "axios";
import "./../../css/contact.css";

const Contact = () => {
  const [details, setDetails] = useState({
    name: "RestoManager",
    email: "RestoManager@gmail.com",
    phone: "0600000000",
    address: "hay al amal rue saadiyin n 23",
  });

  return (
    <div className="page-contact">
      <div className="contact-page-container">
        <div className="contact-image">
          <img src="/img3.jpg" alt="Background" />
        </div>
        <div className="contact-page">
          <h1>Contactez-nous !</h1>
          <div className="contact-info">
            <p>
              <strong>Nom:</strong> {details.name}
            </p>
            <p>
              <strong>Email:</strong> {details.email}
            </p>
            <p>
              <strong>Téléphone:</strong> {details.phone}
            </p>
            <p>
              <strong>Adresse:</strong> {details.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
