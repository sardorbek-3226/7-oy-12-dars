import React from "react";
import Rasm from "./component/Rasm.jsx";
import CartModal from "./component/CartModal";

const App = () => {
  return (
    <>
      <h1 style={{textAlign:"center", fontSize:"45px"}}>Desert</h1>
      <Rasm />
      <CartModal />
    </>
  );
};

export default App;
