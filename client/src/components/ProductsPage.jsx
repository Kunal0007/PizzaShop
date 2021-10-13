import React from "react";
import Product_home from './Product_home';

const ProductsPage = (props) => {

  const {showAlert} = props;

  return (
    <div className="products container grid">
      <Product_home showAlert={showAlert} />
    </div>
  );
};

export default ProductsPage;
