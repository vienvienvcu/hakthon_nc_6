import React, { useCallback, useContext } from "react";
import ProductItem from "./ProductItem";
import { ProductProvider } from "../providers/ProductContext";

export default function ProductList() {
  const { listProduct } = useContext(ProductProvider);
  return (
    <>
      <div className="container">
        <div className="title_product">
          <h1>List Product</h1>
        </div>
        <div className="list_product">
          {listProduct.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
}
