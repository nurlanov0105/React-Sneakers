import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

import AppContext from "./context";

function App() {
   const [items, setItems] = React.useState([]);
   const [cartItems, setCartItems] = React.useState([]);
   const [searchValue, setSearchValue] = React.useState("");
   const [cartOpened, setCartOpened] = React.useState(false);
   const [favoriteItems, setFavoriteItems] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(true);

   React.useEffect(() => {
      async function fetchData() {
         try {
            setIsLoading(true);

            const [cartItemsResponse, favoritesResponse, itemsResponse] = await Promise.all([
               axios.get(`https://6585a3c7022766bcb8c90eff.mockapi.io/cart`),
               axios.get(`https://6586fa05468ef171392f131b.mockapi.io/favorites`),
               axios.get(`https://6585a3c7022766bcb8c90eff.mockapi.io/items`),
            ]);

            setIsLoading(false);

            setCartItems(cartItemsResponse.data);
            setFavoriteItems(favoritesResponse.data);
            setItems(itemsResponse.data);
         } catch (err) {
            alert("Ошибка при запросе данных");
            console.error(err);
         }
      }

      fetchData();
   }, []);

   const onAddToCart = async (obj) => {
      // try {
      //    if (cartItems.find((cartItem) => cartItem.id === obj.id)) {
      //       axios.delete(`https://6585a3c7022766bcb8c90eff.mockapi.io/cart/${obj.id}`);
      //       setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
      //    } else {
      //       const { data } = await axios.post(
      //          `https://6585a3c7022766bcb8c90eff.mockapi.io/cart`,
      //          obj
      //       );
      //       setCartItems((prev) => [...prev, data]);
      //    }
      // } catch (error) {
      //    alert("Не удалось добавить в корзину");
      // }

      try {
         const findItem = cartItems.find(
            (cartItem) => Number(cartItem.parentId) === Number(obj.id)
         );
         if (findItem) {
            setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
            await axios.delete(`https://6585a3c7022766bcb8c90eff.mockapi.io/cart/${findItem.id}`);
         } else {
            setCartItems((prev) => [...prev, obj]);

            const { data } = await axios.post(
               `https://6585a3c7022766bcb8c90eff.mockapi.io/cart`,
               obj
            );

            setCartItems((prev) =>
               prev.map((item) => {
                  if (item.parentId === data.parentId) {
                     return {
                        ...item,
                        id: data.id,
                     };
                  }
                  return item;
               })
            );
         }
      } catch (err) {
         alert("Ошибка при добавлении в корзину");
         console.error(err);
      }
   };

   const onRemoveCart = async (id) => {
      try {
         await axios.delete(`https://6585a3c7022766bcb8c90eff.mockapi.io/cart/${id}`);
         setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      } catch (err) {
         alert("Ошибка при удаленни из корзины");
         console.error(err);
      }
   };

   const onAddToFavortie = async (obj) => {
      try {
         if (favoriteItems.find((favItem) => Number(favItem.id) === Number(obj.id))) {
            axios.delete(`https://6586fa05468ef171392f131b.mockapi.io/favorites/${obj.id}`);
            setFavoriteItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
         } else {
            const { data } = await axios.post(
               `https://6586fa05468ef171392f131b.mockapi.io/favorites`,
               obj
            );

            setFavoriteItems((prev) => [...prev, data]);
         }
      } catch (err) {
         alert("Не удалось добавить в закладки");
         console.error(err);
      }
   };

   const onChangeInputValue = (e) => {
      setSearchValue(e.target.value);
   };

   const isItemAdded = (id) => {
      return cartItems.some((obj) => Number(obj.parentId) === Number(id));
   };

   return (
      <AppContext.Provider
         value={{
            items,
            cartItems,
            favoriteItems,
            isItemAdded,
            onAddToFavortie,
            onAddToCart,
            setCartOpened,
            setCartItems,
         }}>
         <div className="wrapper clear">
            <Drawer
               items={cartItems}
               onClickClose={() => setCartOpened(false)}
               onDeleteCart={onRemoveCart}
               opened={cartOpened}
            />

            <Header onClickCart={() => setCartOpened(true)} />

            <main>
               <Routes>
                  <Route
                     path=""
                     exact
                     element={
                        <Home
                           items={items}
                           cartItems={cartItems}
                           favoriteItems={favoriteItems}
                           searchValue={searchValue}
                           setSearchValue={setSearchValue}
                           onChangeInputValue={onChangeInputValue}
                           onAddToFavortie={onAddToFavortie}
                           onAddToCart={onAddToCart}
                           isLoading={isLoading}
                        />
                     }></Route>
                  <Route
                     path="favorites"
                     element={
                        <Favorites onAddToFavortie={onAddToFavortie} onAddToCart={onAddToCart} />
                     }></Route>
                  <Route path="Orders" element={<Orders />}></Route>
               </Routes>
            </main>
         </div>
      </AppContext.Provider>
   );
}

export default App;
