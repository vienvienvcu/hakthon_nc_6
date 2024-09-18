import CartList from "../component/CartList";
import React, { useState, useContext, useEffect } from "react";
import { ProductProvider } from "../providers/ProductContext";
export default function Head() {
  const [isShow, setIsShow] = useState(false);
  const handleToggle = () => {
    setIsShow(!isShow);
  };
  const { getCartItemCount } = useContext(ProductProvider); // Lấy số lượng sản phẩm từ context
  const [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    // Cập nhật số lượng sản phẩm trong giỏ hàng khi context thay đổi
    setCartItemCount(getCartItemCount());
  }, [getCartItemCount]); // Thay đổi khi getCartItemCount thay đổi

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <img src="https://i.pinimg.com/736x/d3/9f/fa/d39ffa4c3780140f8a7d69092d8c1a89.jpg" />
          </div>
          <ul className="menu">
            <li className="menu_item active">
              <a>Home</a>
            </li>
            <li className="menu_item">
              <a>About</a>
            </li>
            <li className="menu_item">
              <a>Product</a>
            </li>
            <li className="menu_item">
              <a>Review</a>
            </li>
            <li className="cart_icon" onClick={handleToggle}>
              <i class="bx bx-cart"></i>
              <span className="number">{cartItemCount}</span>
            </li>
          </ul>
        </nav>
      </header>
      {/* show add to cart */}

      {isShow && <CartList />}
    </>
  );
}
