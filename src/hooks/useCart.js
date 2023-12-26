import React from "react";
import AppContext from "../context";

export const useCart = () => {
   const { cartItems, setCartItems } = React.useContext(AppContext);
   const totalPrice = cartItems.reduce((acc, obj) => +obj.price + acc, 0);

   return { cartItems, setCartItems, totalPrice };
};
