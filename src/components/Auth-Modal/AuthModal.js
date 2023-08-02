import Auth from "./Auth";
import classes from "./AuthModal.module.css";

function AuthModal({closeModal}) {
  return (
    <div className={classes.modalWrapper}>
      <div className={classes.modalBackdrop} />
      <div className={classes.modalBox}>
        <div className={classes.modal}>
         <button onClick={closeModal}>Close</button> 
         <h1>Authentication</h1>
         <Auth />
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
