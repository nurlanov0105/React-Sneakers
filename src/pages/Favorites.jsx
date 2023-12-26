import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

import AppContext from "../context";

function Favorites() {
   const { favoriteItems, onAddToFavortie, onAddToCart } = React.useContext(AppContext);

   return (
      <div className="infoPage">
         <div className="d-flex align-center favorites-top">
            <Link to="/">
               <img className="cu-p" src="./img/arrow-left.svg" alt="Arrow Left" />
            </Link>
            <h1 className="content__title">Мои закладки</h1>
         </div>
         <div className="sneakers d-flex flex-wrap">
            {favoriteItems.map((item) => (
               <Card
                  key={item.id}
                  {...item}
                  onFavorite={(obj) => onAddToFavortie(obj)}
                  onPlus={(obj) => onAddToCart(obj)}
                  favorited={true}
               />
            ))}
         </div>
      </div>
   );
}

export default Favorites;
