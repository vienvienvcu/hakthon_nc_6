import React, { useContext, useState } from "react";
import { formatMoney } from "../utils/formatData";
import { ProductProvider } from "../providers/ProductContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// Tạo một instance của SweetAlert2 với React Content
const MySwal = withReactContent(Swal);

export default function ProductItem({ product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const { handleAddToCart } = useContext(ProductProvider); // Sử dụng hook useContext để truy cập handleAddToCart
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const addToCart = () => {
    if (selectedSize) {
      handleAddToCart(product, selectedSize);
    } else {
      // Hiển thị thông báo yêu cầu chọn kích cỡ
      MySwal.fire({
        title: <strong>Vui lòng chọn kích cỡ.</strong>,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <>
      <div class="card">
        <div class="image_container">
          <img className="img_product" src={product.image}></img>
        </div>
        <div class="title">
          <span>{product.name}</span>
        </div>
        <div class="size">
          <span>Size</span>
          <ul class="list-size">
            {product.size.map((size) => (
              <li className="item-list" key={size}>
                <button
                  className={`item-list-button ${
                    selectedSize === size ? "selected" : ""
                  }`}
                  onClick={() => handleSizeChange(size)}
                >
                  {size}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div class="action">
          <div class="price">
            <span>{formatMoney(product.price)}</span>
          </div>
          <button class="cart-button" onClick={addToCart}>
            <svg
              class="cart-icon"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </>
  );
}
