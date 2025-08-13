import React from "react";
import style from "./images.module.css";
import { useFetch } from "../hook/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty, clearCart } from "../feature/userSlice/cartSlice";

const Images = () => {
  const { data, loading, error } = useFetch("https://json-api.uz/api/project/dessertss/desserts");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div className={style.cartContainer}>
        {data?.map((item) => (
          <div key={item.id} className={style.cart}>
            <div className={style.image}>
              <img src={item?.image.desktop} alt={item.thumbnail} />
              <button
                className={style.button}
                onClick={() => dispatch(addToCart(item))}
              >
                Add to cart
              </button>
            </div>
            <div className={style.name}>
              <h5>{item.category}</h5>
              <h5>Beautiful Image</h5>
              <strong>${item.price}</strong>
            </div>
          </div>
        ))}
      </div>

      <div style={{ border: "1px solid #ccc", padding: "10px", minWidth: "220px" }}>
        <h3>Your Cart</h3>
        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            {cartItems.map((p) => (
              <div key={p.id} style={{border:"1px solid black", display: "flex", justifyContent: "space-between", alignItems: "center", margin:"10px", padding:"5px 10px", borderRadius:"5px"  }}>
                <span>{p.category}</span>
                <div>
                  <button onClick={() => dispatch(decreaseQty(p.id))}>-</button>
                  <span style={{ margin: "5px 10px" }}>{p.quantity}</span>
                  <button onClick={() => dispatch(increaseQty(p.id))}>+</button>
                </div>
              </div>
            ))}

            <hr />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={() => dispatch(clearCart())}
              style={{ marginTop: "10px", background: "#C73B0F", color: "white", border: "none", padding: "8px 19px", borderRadius:"10px" }}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Images;
