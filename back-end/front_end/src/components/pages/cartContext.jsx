import React, { createContext, useState, useContext } from "react";
import Navbar from "../navbar";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  const handleIncrement = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.prix_plat * item.quantity,
      0
    );
  };

  const addItemToCart = (item) => {
    setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
  };

  return (
    <>
      <Navbar totalItems={cart.length} />
      <CartContext.Provider
        value={{
          cart,
          setCart,
          handleIncrement,
          handleDecrement,
          handleDelete,
          calculateTotal,
          addItemToCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
};
