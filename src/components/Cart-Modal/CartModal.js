import Cart from './Cart'
import classes from "./CartModal.module.css";

function CartModal({closeModal}) {
  return (
    <div className={classes.modalWrapper}>
      <div className={classes.modalBackdrop} />
      <div className={classes.modalBox}>
         <button onClick={closeModal} className={classes.btn}>Close</button> 
        <div className={classes.modal}>
       
        <Cart />
        </div>
      </div>
    </div>
  );
}

export default CartModal;