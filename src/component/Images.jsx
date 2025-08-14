import React from "react";
import style from "./images.module.css";
import { useFetch } from "../hook/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQty, decreaseQty, clearCart, removeFromCart } from "../feature/userSlice/cartSlice";

const Images = () => {
  const { data,loading, error } = useFetch("https://json-api.uz/api/project/dessertss/desserts");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };
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

      <div style={{ border: "1px solid #ccc", padding: "10px", width:"600px" }}>
        <h3 style={{display:"flex", gap:"5px", alignItems:"center", fontSize:"30px", marginLeft:"65px", textAlign:"center"}}><img src="../images/icon-add-to-cart.svg" alt="" />Your Cart</h3>
        {cartItems.length === 0 ? (
          <div>
            <p style={{fontSize:"30px", textAlign:"center"}}>No items in cart</p>
        <img style={{width:"250px", marginLeft:"55px"}} src="../images/illustration-empty-cart.svg" alt="" />

          </div>
        ) : (
          <>
            {cartItems.map((p) => (
           <div 
           key={p.id} 
           style={{
             border: "1px solid #ddd",
             display: "flex",
             justifyContent: "space-between",
             alignItems: "center",
             margin: "10px",
             padding: "8px 12px",
             borderRadius: "8px",
             width: "350px",
             background: "#fff",
             boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
           }}
         >
           {/* Chap tarafdagi rasm va info */}
           <div 
             style={{
               display: "flex",
               alignItems: "center",
               gap: "10px"
             }}
           >
             <img 
               src={p.image.desktop} 
               alt={p.category} 
               style={{
                 width: "50px", 
                 height: "50px",
                 borderRadius: "12px",
                 objectFit: "cover"
               }} 
             />
             <div style={{ display: "flex", flexDirection: "column" }}>
               <span style={{ fontSize: "14px", color: "#555" }}>{p.category}</span>
               <strong style={{ fontSize: "16px", color: "#333" }}>
                 Price: ${p.price}
               </strong>
             </div>
           </div>
         
           {/* + / - tugmalar */}
           <div 
             style={{
               display: "flex",
               alignItems: "center",
               gap: "8px",
               background: "#f8f8f8",
               padding: "4px 8px",
               borderRadius: "6px"
             }}
           >
             <button 
               onClick={() => dispatch(decreaseQty(p.id))} 
               style={{
                 border: "none",
                 background: "#e0e0e0",
                 borderRadius: "4px",
                 padding: "4px 10px",
                 cursor: "pointer",
                 fontSize: "16px"
               }}
             >
               &#8722;
             </button>
         
             <span 
               style={{
                 minWidth: "20px",
                 textAlign: "center",
                 fontWeight: "bold"
               }}
             >
               {p.quantity}
             </span>
         
             <button 
               onClick={() => dispatch(increaseQty(p.id))} 
               style={{
                 border: "none",
                 background: "#e0e0e0",
                 borderRadius: "4px",
                 padding: "4px 10px",
                 cursor: "pointer",
                 fontSize: "16px"
               }}
             >
               &#43;
             </button>
           </div>
         
           {/* O‘chirish tugmasi */}
           <button 
             onClick={() => handleDelete(p.id)} 
             style={{
               border: "none",
               background: "transparent",
               color: "red",
               fontSize: "18px",
               cursor: "pointer",
               marginLeft: "10px"
             }}
           >
             ✖
           </button>
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
