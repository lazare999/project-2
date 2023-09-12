import React, { useContext } from "react";
import CartContext from "../../store/cart-context";

import classes from './Cart.module.css'

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const checkoutHandler = () => {
    cartCtx.clearCart();
  };

  // console.log(cartCtx.items)

  return (
    <>
      <div>
        <h1>Cart</h1>
        <ul>
          {cartCtx.items.map((item) => (
            <div key={item.id}>
              <div className={classes.cartItem}>
                <img src={item.image} alt="imag21" className={classes.img} />
                <div style={{ marginLeft: '10px' }}>
                  <p style={{ fontSize: '20px' }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: '17px' }}>Quantity: {item.quantity}</p>
                  <div className={classes.priceDiv}>
                    <p style={{ fontSize: '20px' }}>Price: <span className={classes.price}> {item.price}$</span></p>
                    <button onClick={() => removeItemHandler(item.id)} className={classes.btn}>Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
        <hr />
        {cartCtx.items.length > 0 && (  
          <>
            <div className={classes.checkOut}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '20px' }}>Total amount:</span>
                <span className={classes.price}>{cartCtx.totalAmount}$</span>
              </div>
              <div>
                <button onClick={checkoutHandler} className={classes.checkOutBtn}>Check Out</button>
              </div>
            </div>
          </>
        )}
        {cartCtx.items.length === 0 && ( 
          <h2>Your cart is empty.</h2>
        )}
        <hr />
      </div>
    </>
  );
}

export default Cart;
