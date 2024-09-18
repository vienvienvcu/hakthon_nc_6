import React, { useContext } from "react";
import "./cartlist.css";
import CartIem from "./CartIem";
import CartFooter from "./CartFooter";
import { ProductProvider } from "../providers/ProductContext";
export default function CartList() {
  const { listCart, handleRemove, updateCart, handleAllRemove } =
    useContext(ProductProvider);
  const handleIncrease = (productId) => {
    updateCart(productId, 1); // Tăng số lượng
  };

  const handleDecrease = (productId) => {
    updateCart(productId, -1); // Giảm số lượng
  };

  return (
    <>
      <div className="cart_list">
        <div className="cart_content">
          <div class="master-container">
            <div class="card_box cart_box">
              <div className="cart_head">
                <label class="title_box">Your cart</label>
                <button className="cart_button" onClick={handleAllRemove}>
                  all<i class="bx bx-trash"></i>
                </button>
              </div>
              <div className="detail_cart">
                {listCart.map((cart) => (
                  <CartIem
                    key={cart.product.id}
                    cart={cart}
                    onIncrease={() => handleIncrease(cart.product.id)}
                    onDecrease={() => handleDecrease(cart.product.id)}
                    onRemove={() => handleRemove(cart.product.id)}
                  />
                ))}
              </div>
            </div>
            <CartFooter />
          </div>
        </div>
      </div>
    </>
  );
}
