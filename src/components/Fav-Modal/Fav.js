import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Fav.module.css";
import { removeFromFavorites } from "../Auth-Modal/action";
import CartContext from "../../store/cart-context";

function Fav() {
  const favoriteItems = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const cartCtx = useContext(CartContext);

  const removeFromFavoritesHandler = (itemId) => {
    dispatch(removeFromFavorites(itemId));
  };

  const addToCartHandler = (item) => {
    cartCtx.addItem(item);
  };

  return (
    <>
      <h2>Favorites</h2>
      {favoriteItems.length === 0 ? (
        <p>No favorite items yet.</p>
      ) : (
        <ul className={classes.favoriteList}>
          {favoriteItems.map((item) => (
            <li key={item.id} className={classes.favoriteItem}>
              <img
                src={item.image}
                alt={item.title}
                className={classes.image}
              />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className={classes.price}>{item.price} $</p>
              <button onClick={() => removeFromFavoritesHandler(item.id)}>
                Remove
              </button>
              <button onClick={() => addToCartHandler(item)}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Fav;
