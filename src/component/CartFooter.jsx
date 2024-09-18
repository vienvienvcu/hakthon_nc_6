import React, { useContext } from "react";
import { ProductProvider } from "../providers/ProductContext";
import { formatMoney } from "../utils/formatData";

export default function CartFooter() {
  const { listCart } = useContext(ProductProvider);
  // Tính toán tổng tiền giỏ hàng
  const calculateSubtotal = () => {
    return listCart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  // Tính toán phí vận chuyển (giả sử là một số cố định)
  const shippingFees = 20000;
  // Tính tổng số tiền thanh toán
  const subtotal = calculateSubtotal();
  const discount = 0; // Giả sử chưa có giảm giá
  const total = subtotal - discount + shippingFees;
  return (
    <>
      <div class="card_box coupons">
        <label class="title_box">Apply coupons</label>
        <form class="form">
          <input
            type="text"
            placeholder="Apply your coupons here"
            class="input_field"
          />
          <button>Apply</button>
        </form>
      </div>

      <div className="card_box checkout">
        <label className="title_box">Checkout</label>
        <div className="details">
          <span>Your cart subtotal:</span>
          <span>{formatMoney(subtotal)}</span>
          <span>Discount through applied coupons:</span>
          <span>{formatMoney(discount)}</span>
          <span>Shipping fees:</span>
          <span>{formatMoney(shippingFees)}</span>
        </div>
        <div className="checkout--footer">
          <label className="price_box">
            <sup>VND</sup>
            {formatMoney(total)}
          </label>
          <button className="checkout-btn">Checkout</button>
        </div>
      </div>
    </>
  );
}
