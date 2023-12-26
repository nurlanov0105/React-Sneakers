import React from "react";
import ContentLoader from "react-content-loader";

import AppContext from "../../context";

import styles from "./Card.module.scss";

function Card({
   id,
   title,
   imgURL,
   price,
   onPlus,
   onFavorite,
   favorited = false,
   loading = false,
}) {
   const { isItemAdded } = React.useContext(AppContext);
   const [isFavorite, setIsFavorite] = React.useState(favorited);

   const itemObj = { id, parentId: id, title, imgURL, price };

   const onClickPlus = () => {
      onPlus(itemObj);
   };

   const onClickFavorite = () => {
      onFavorite(itemObj);
      setIsFavorite(!isFavorite);
   };
   return (
      // {loading ? }
      <div className={styles.card}>
         {loading ? (
            <ContentLoader
               speed={2}
               width={150}
               height={187}
               viewBox="0 0 150 187"
               backgroundColor="#f3f3f3"
               foregroundColor="#ecebeb">
               <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
               <rect x="0" y="103" rx="3" ry="3" width="150" height="15" />
               <rect x="0" y="122" rx="3" ry="3" width="93" height="15" />
               <rect x="0" y="161" rx="8" ry="8" width="45" height="19" />
               <rect x="117" y="149" rx="8" ry="8" width="32" height="32" />
            </ContentLoader>
         ) : (
            <>
               {onFavorite && (
                  <div className={styles.favorite} onClick={onClickFavorite}>
                     <img
                        src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"}
                        alt="Unliked"
                     />
                  </div>
               )}

               <img src={imgURL} alt="sneakers" />
               <h5>{title}</h5>
               <div className="d-flex justify-between align-center">
                  <div className="d-flex flex-column">
                     <span>Цена:</span>
                     <b>{price} руб.</b>
                  </div>
                  {onPlus && (
                     <img
                        className={styles.btnAdd}
                        onClick={onClickPlus}
                        src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-unchecked.svg"}
                        alt="plus"
                     />
                  )}
               </div>
            </>
         )}
      </div>
   );
}

export default Card;
