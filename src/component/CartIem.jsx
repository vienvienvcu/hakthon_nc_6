import React from "react";
import { formatMoney } from "../utils/formatData";

export default function CartIem({ cart, onIncrease, onDecrease, onRemove }) {
  return (
    <>
      <div class="products">
        <div class="product">
          <img class="img_card" src={cart.product.image} />
          <div className="product_info">
            <span>Size:{cart.selectedSize} </span>
            <p>{cart.product.name}</p>
          </div>
          <div class="quantity">
            <button>
              <i class="bx bx-minus" onClick={onDecrease}></i>
            </button>
            <label>{cart.quantity}</label>
            <button>
              <i class="bx bx-plus" onClick={onIncrease}></i>
            </button>
          </div>
          <div className="controller_cart">
            <label class="price_box small">
              {formatMoney(cart.product.price * cart.quantity)}
            </label>
            <button class="item-list-button" onClick={onRemove}>
              <i class="bx bx-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
