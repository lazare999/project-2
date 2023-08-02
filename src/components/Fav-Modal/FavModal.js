import Fav from "./Fav";
import classes from "./FavModal.module.css";

function FavModal({ closeModal }) {
  return (
    <div className={classes.modalWrapper}>
      <div className={classes.modalBackdrop} />
      <div className={classes.modalBox}>
        <div className={classes.modal}>
          <button onClick={closeModal}>Close</button>
          <Fav />
        </div>
      </div>
    </div>
  );
}

export default FavModal;
