import React from "react";
import Images from "./component/Image";
import CartModal from "./component/CartModal";

const App = () => {
  return (
    <>
      <h1 style={{textAlign:"center", fontSize:"45px"}}>Desert</h1>
      <Images />
      <CartModal />
    </>
  );
};

export default App;
