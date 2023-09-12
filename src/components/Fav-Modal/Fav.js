import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Fav.module.css";
import { removeFromFavorites } from "../Auth-Modal/action";
import CartContext from "../../store/cart-context";

function Fav() {
  const favoriteItems = useSelector((state) => state.favorites);
  console.log(favoriteItems)
  const dispatch = useDispatch();
  const cartCtx = useContext(CartContext);

  const removeFromFavoritesHandler = (item) => {
    dispatch(removeFromFavorites(item.id));
    console.log(item.id)
  };

  // const addToCartHandler = (item) => {
  //   cartCtx.addItem(item);
  // };
  return (
    <>
      <h2>Favorites</h2>
      {favoriteItems.length === 0 ? (
        <p>No favorite items yet.</p>
      ) : (
        <ul className={classes.favoriteList}>
          {favoriteItems.map((item) => (
            <li key={item.id} className={classes.favoriteItem}>
              <div className={classes.favItem}>
              <img
                src={item.image}
                alt={item.title}
                className={classes.image}
              />
              <h3>{item.title}</h3>
              {/* <p>{item.description}</p> */}
              <p className={classes.price}>{item.price} $</p>
              </div>
              <div className={classes.btns}>
                <button onClick={() => removeFromFavoritesHandler(item)}>
                  Remove ({item.price})
                </button>
                <button  onClick={() => cartCtx.addItem(item)}>
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Fav;
