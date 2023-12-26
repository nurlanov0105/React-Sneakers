import React from "react";
import axios from "axios";

import Info from "../Card/Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function Drawer({ items, onClickClose, onDeleteCart, opened }) {
   const { cartItems, setCartItems, totalPrice } = useCart();
   const [isOrderComplete, setIsOrderComplete] = React.useState(false);
   const [orderId, setOrderId] = React.useState(null);
   const [isLoading, setIsLoading] = React.useState(false);

   const onClickOrder = async () => {
      try {
         setIsLoading(true);
         const { data } = await axios.post(`https://6586fa05468ef171392f131b.mockapi.io/orders`, {
            items: cartItems,
         });

         setOrderId(data.id);
         setIsOrderComplete(true);
         setCartItems([]);

         for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            await axios.delete(`https://6585a3c7022766bcb8c90eff.mockapi.io/cart/${item.id}`);
            await delay(1000);
         }
      } catch (err) {
         alert("Ошибка при создании заказа");
         console.log(err);
      }

      setIsLoading(false);
   };

   return (
      <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
         <div className={styles.drawer}>
            <h2 className="drawer__title mb-30  d-flex align-center justify-between">
               Корзина
               <div className="btn-remove" onClick={onClickClose}>
                  <img src="img/btn-close.svg" alt="Close" />
               </div>
            </h2>

            {items.length > 0 ? (
               <div className="d-flex flex-column flex">
                  <div className="items">
                     {items.map((obj) => (
                        <div key={obj.id} className="cart-item d-flex align-center">
                           <img src={obj.imgURL} alt="Sneakers" />
                           <div>
                              <p>{obj.title}</p>
                              <div className="d-flex align-center justify-between">
                                 <b>{obj.price} руб.</b>
                                 <div className="btn-remove" onClick={() => onDeleteCart(obj.id)}>
                                    <img src="img/btn-close.svg" alt="Close" />
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="cartTotalBlock">
                     <ul>
                        <li>
                           <span>Итого:</span>
                           <div></div>
                           <b>{totalPrice} руб. </b>
                        </li>
                        <li>
                           <span>Налог 5%:</span>
                           <div></div>
                           <b>{Math.round((totalPrice / 100) * 5)} руб.</b>
                        </li>
                     </ul>

                     <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                        Оформить заказ <img src="img/arrow-right.svg" alt="Arrow-right" />
                     </button>
                  </div>
               </div>
            ) : (
               <Info
                  img={isOrderComplete ? "img/complete-order.jpg" : "img/empty-cart.jpg"}
                  title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                  descr={
                     isOrderComplete
                        ? ` Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                        : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                  }
               />
            )}
         </div>
      </div>
   );
}

export default Drawer;
