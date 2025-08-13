import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, closeModal } from "../feature/userSlice/cartSlice";
import style from "./cartModal.module.css";

const CartModal = () => {
  const { cartItems, isOpen } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h2><img src="/icon-add-to-cart.svg" alt="" />Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className={style.item}>
              <span>{item.name}</span>
              <span>${item.price}</span>
              <div className={style.qty}>
                <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
              </div>
            </div>
          ))
        )}
        <button className={style.close} onClick={() => dispatch(closeModal())}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
