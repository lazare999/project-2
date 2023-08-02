import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import classes from "./Collections.module.css";
import CartContext from "../../store/cart-context";
import { addToFavorites } from "../Auth-Modal/action";
import { useDispatch } from "react-redux";

function Indoor(props) {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const cartCtx = useContext(CartContext);
  const location = useLocation();
  const thisPath =  location?.state?.indoor || location?.state?.outdoor || location?.state?.office;
  console.log(thisPath);
  const dispatch = useDispatch();

  let allSelectedItem = {
    image: selectedItem ? selectedItem.image : null,
    price: selectedItem ? selectedItem.price : null,
    description: selectedItem ? selectedItem.description : null,
    title: selectedItem ? selectedItem.title : null,
  };

  function openModal(item) {
    setSelectedItem(item);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  useEffect(() => {
    fetch(`https://project-2-c70d6-default-rtdb.firebaseio.com/${thisPath}.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        console.log(jsonData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [thisPath]);

  if (!data) {
    return <div>Loading...</div>;
  }
 
  function addToFavoritesHandler(item) {
    dispatch(addToFavorites(item));
  }

  function DetailModal() {
    return (
      <>
        <div className={classes.modalWrapper}>
          <div className={classes.modalBackdrop} onClick={closeModal} />
          <div className={classes.modalBox}>
            <div className={classes.modal}>
              <button onClick={closeModal}>Close</button>
              <div
                key={selectedItem.id}
                // className={classes.container}
                onClick={() => openModal(selectedItem)}
              >
                <div>
                  <img
                    src={selectedItem.image}
                    alt="indoor"
                    className={classes.image}
                  />
                </div>
                <div className={classes.details}>
                  <h3 className={classes.title}>{selectedItem.title}</h3>
                  <h4>{selectedItem.description}</h4>
                  <h4 className={classes.price}>{selectedItem.price} $</h4>
                </div>
              </div>
                <div>
                <button onClick={() => addToFavoritesHandler(allSelectedItem)}>
          Add Favorites
        </button>
                  <button onClick={() => cartCtx.addItem(allSelectedItem)}>
                    Add Cart
                  </button>
                </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
    <div className={classes.bigContainer}>
      {Object.values(data).map((item) => (
        <>
        <div
          key={item.title}
          className={classes.container}
          onClick={() => openModal(item)}
        >
          <div>
            <img src={item.image} alt="indoor" className={classes.image} />
          </div>
          <div className={classes.details}>
            <h3 className={classes.title}>{item.title}</h3>
            <h4 className={classes.price}>{item.price} $</h4>
          </div>
        </div>
          {/* <div>
            <button onClick={() => cartCtx.addItem(item)}>Add Cart</button>
          </div> */}
        </>
      ))}

      {showModal && <DetailModal closeModal={closeModal} />}
      </div>
    </>
  );
}

export default Indoor;
