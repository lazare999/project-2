import React, { useContext } from "react";
import CartContext from "../../store/cart-context";

function Cart(props) {
  const cartCtx = useContext(CartContext);

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const checkoutHandler = () => {
    cartCtx.clearCart();
  };

  return (
    <>
      <div>
        <h1>Cart</h1>
        <ul>
          {cartCtx.items.map((item) => (
            <div key={item.id}>
              <li>
                {item.title} - Quantity: {item.quantity}
              </li>
              <button onClick={() => removeItemHandler(item.id)}>Remove</button>
            </div>
          ))}
        </ul>
        <div>
          <span>Total amount:</span>
          <span>{cartCtx.totalAmount}$</span>
        </div>
        <div>
          <button onClick={checkoutHandler}>Check Out</button>
        </div>
      </div>
    </>
  );
}

export default Cart;
