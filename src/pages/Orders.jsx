import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../components/Card";

import AppContext from "../context";

function Orders() {
   const { favoriteItems, onAddToFavortie, onAddToCart } = React.useContext(AppContext);
   const [orders, setOrders] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);

   React.useEffect(() => {
      try {
         (async () => {
            const { data } = await axios.get(`https://6586fa05468ef171392f131b.mockapi.io/orders`);
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));

            setIsLoading(false);
         })();
      } catch (err) {
         alert("Ошибка при запросе заказов");
      }
   }, []);

   return (
      <div className="infoPage">
         <div className="d-flex align-center favorites-top">
            <Link to="/">
               <img className="cu-p" src="img/arrow-left.svg" alt="Arrow Left" />
            </Link>
            <h1 className="content__title">Мои покупки</h1>
         </div>
         <div className="sneakers d-flex flex-wrap">
            {(isLoading ? [...Array(8)] : orders).map((item, i) => (
               <Card key={i} loading={isLoading} {...item} />
            ))}
         </div>
      </div>
   );
}

export default Orders;
