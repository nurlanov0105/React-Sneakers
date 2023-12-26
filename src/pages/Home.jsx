import React from "react";
import Card from "../components/Card";
function Home({
   items,
   favoriteItems,
   searchValue,
   setSearchValue,
   onChangeInputValue,
   onAddToFavortie,
   onAddToCart,
   isLoading,
}) {
   const renderItems = () => {
      const filteredItems = items.filter((item) =>
         item.title.toLowerCase().includes(searchValue.toLowerCase())
      );

      return (isLoading ? [...Array(8)] : filteredItems).map((item, i) => (
         <Card
            key={i}
            onFavorite={(obj) => onAddToFavortie(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            favorited={favoriteItems.some((obj) => Number(obj.id) === Number(item.id))}
            loading={isLoading}
            {...item}
         />
      ));
   };

   return (
      <div className="content p-40">
         <div className="d-flex justify-between align-center mb-40">
            <h1 className="content__title">
               {searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}
            </h1>
            <div className="search-block d-flex align-center">
               <img width={14} height={14} src="img/search.svg" alt="search" />
               {searchValue && (
                  <img
                     className="clear cu-p"
                     src="img/btn-close.svg"
                     alt="Close"
                     onClick={() => {
                        setSearchValue("");
                     }}
                  />
               )}

               <input
                  type="text"
                  placeholder="Поиск..."
                  onChange={onChangeInputValue}
                  value={searchValue}
               />
            </div>
         </div>

         <div className="sneakers d-flex flex-wrap">{renderItems()}</div>
      </div>
   );
}

export default Home;
