import Fav from "./Fav";
import classes from "./FavModal.module.css";

function FavModal({ closeModal }) {
  return (
    <div className={classes.modalWrapper}>
      <div className={classes.modalBackdrop} />
      <div className={classes.modalBox}>
            <button onClick={closeModal} className={classes.btn}>Close</button>
        <div className={classes.modal}>
            <div>
              <Fav />
            </div>
          </div>
      </div>
    </div>
  );
}

export default FavModal;