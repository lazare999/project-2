import { useEffect, useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // Check if the item already exists in the cart
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    if (existingItemIndex !== -1) {
      // If the item already exists, update the quantity instead of adding a new item
      const updatedItems = [...state.items];
      const existingItem = updatedItems[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemIndex] = updatedItem;

      const updatedTotalAmount = state.totalAmount + action.item.price;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    } else {
      // If the item doesn't exist, add it to the cart
      const updatedItems = [...state.items, { ...action.item, quantity: 1 }];
      const updatedTotalAmount = state.totalAmount + action.item.price;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
  } else if (action.type === "REMOVE") {
    // Check if the item exists in the cart
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    if (existingItemIndex !== -1) {
      const existingItem = state.items[existingItemIndex];

      if (existingItem.quantity === 1) {
        // If the item quantity is 1, remove it from the cart
        const updatedItems = state.items.filter(
          (item) => item.id !== action.id
        );

        const updatedTotalAmount = state.totalAmount - existingItem.price;

        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      } else {
        // If the item quantity is more than 1, decrement the quantity
        const updatedItems = [...state.items];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedItems[existingItemIndex] = updatedItem;

        const updatedTotalAmount = state.totalAmount - existingItem.price;

        return {
          items: updatedItems,
          totalAmount: updatedTotalAmount,
        };
      }
    }
  } else if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return state;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState,
    (initialState) => {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : initialState;
    }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  const addItemToCartHandler = (itemToAdd) => {
    dispatchCartAction({ type: "ADD", item: itemToAdd });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
    localStorage.removeItem("cart");
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
