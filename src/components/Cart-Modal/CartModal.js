import Cart from './Cart'
import classes from "./CartModal.module.css";

function CartModal({closeModal}) {
  return (
    <div className={classes.modalWrapper}>
      <div className={classes.modalBackdrop} />
      <div className={classes.modalBox}>
        <div className={classes.modal}>
         <button onClick={closeModal}>Close</button> 
       
        <Cart />
        </div>
      </div>
    </div>
  );
}

export default CartModal;