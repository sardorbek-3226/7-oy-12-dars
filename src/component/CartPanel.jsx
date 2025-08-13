import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty } from "../feature/userSlice/cartSlice";
import style from "./cartPanel.module.css";

const CartPanel = () => {
  const { cartItems, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div className={style.cartPanel}>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items yet</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className={style.cartItem}>
            <div>
              <strong>{item.name}</strong>
              <p>${item.price}</p>
            </div>
            <div className={style.qty}>
              <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
            </div>
          </div>
        ))
      )}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default CartPanel;
