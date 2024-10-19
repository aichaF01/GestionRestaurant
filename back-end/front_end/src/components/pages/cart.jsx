import React from "react";
import { useCart } from "./cartContext";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    handleIncrement,
    handleDecrement,
    handleDelete,
    calculateTotal,
  } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/page_confirmation");
  };

  return (
    <div className="">
      {cart.map((item) => (
        <div key={item.id} className="m-2">
          <div className="row align-items-center">
            <div className="col-1">
              <div className="card1">
                <img
                  src={"http://127.0.0.1:8000/storage/" + item.image_plat}
                  alt=""
                  className="card-img-top1 img-fluid img-thumbnail"
                />
              </div>
            </div>
            <div className="col-3">
              <h5 className="card-title1">{item.nom_plat}</h5>
              <p className="card-title1">{item.description_plat}</p>
            </div>
            <div className="col-4">
              <button
                className="btn btn-outline-danger m-1"
                onClick={() => handleDecrement(item.id)}
                disabled={item.quantity === 1}
              >
                -
              </button>
              <button className="btn btn-secondary m-1" disabled>
                {item.quantity}
              </button>
              <button
                className="btn btn-outline-danger m-1"
                onClick={() => handleIncrement(item.id)}
              >
                +
              </button>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button
                className="btn btn-light m-1"
                onClick={() => handleDelete(item.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
          <div className="row">
            <h3 className="card-text">{item.prix_plat * item.quantity} DH</h3>
          </div>
        </div>
      ))}
      <div className="">
        {calculateTotal() === 0 ? (
          <div className="">
            <h4>
              Votre panier est vide ! Ajoutez vos plats préférés et savourez nos
              délices !
            </h4>
          </div>
        ) : (
          <>
            <h3 className="card-text">Total: {calculateTotal()} DH</h3>
            <button className="btn btn-danger" onClick={handleSubmit}>
              Demander maintenant
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
