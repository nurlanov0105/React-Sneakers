import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Header(props) {
   const { totalPrice } = useCart();
   return (
      <header className="header d-flex justify-between align-center p-40">
         <Link to="/">
            <div className="header__left d-flex align-center">
               <img width={40} height={40} src="./img/logo.png" />
               <div className="header__info">
                  <h3 className="text-uppercase">REACT SNEAKERS</h3>
                  <p>Магазин лучших кроссовок</p>
               </div>
            </div>
         </Link>

         <ul className="header__list d-flex">
            <li onClick={props.onClickCart}>
               <img width={18} height={18} src="./img/cart.svg" />
               <span className="semib">{totalPrice} руб.</span>
            </li>
            <Link to="/favorites">
               <li>
                  <img width={18} height={18} src="./img/favorite.svg" />
                  <span>Закладки</span>
               </li>
            </Link>

            <Link to="/orders">
               <li>
                  <img width={18} height={18} src="./img/user.svg" />
                  <span>Профиль</span>
               </li>
            </Link>
         </ul>
      </header>
   );
}

export default Header;
