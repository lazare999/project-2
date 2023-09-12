import React from "react";
import classes from './CollectionPage.module.css';

function DetailModal({ closeModal, selectedItem, selectedItems,  addToFavoritesHandler, cartCtx }) {
    return (
      <>
        <div className={classes.modalWrapper} >
          <div className={classes.modalBackdrop} onClick={closeModal} />
          <div className={classes.modalBox}>
            <div className={classes.modal}>
              <button onClick={closeModal}>Close</button>
              <div
                key={selectedItem.id}
              // className={classes.container}
              // onClick={() => openModal(selectedItems)}
              >
                <div>
                  <img
                    src={selectedItems.image}
                    alt="indoor"
                    className={classes.image}
                  />
                </div>
                <div className={classes.details}>
                  <h3 className={classes.title}>{selectedItems.title}</h3>
                  <h4>{selectedItems.description}</h4>
                  <h4 className={classes.price}>{selectedItems.price} $</h4>
                </div>
              </div>

              <div>
                <button onClick={() => addToFavoritesHandler(selectedItems)}>
                  Add Favorites
                </button>
                <button onClick={() => cartCtx.addItem(selectedItems)}>
                  Add Cart
                </button>

              </div>
            </div>
          </div>
        </div>
      </>
    );
  }  

  export default DetailModal;