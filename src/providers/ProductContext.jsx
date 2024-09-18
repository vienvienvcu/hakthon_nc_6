import React, { useState } from "react";
import ProductJs from "../db.json";
import { saveData } from "../utils/common";
import Swal from "sweetalert2";

// Tạo ngữ cảnh
export const ProductProvider = React.createContext();

export default function ProductContext({ children }) {
  const [listProduct, setListProduct] = useState(() => ProductJs);
  const [listCart, setListCart] = useState(() => {
    const cartLocals = JSON.parse(localStorage.getItem("carts")) || [];
    return cartLocals;
  });

  // Tính tổng số sản phẩm trong giỏ hàng
  const getCartItemCount = () => {
    return listCart.reduce((total, item) => total + item.quantity, 0);
  };

  // add product to cart
  const handleAddToCart = (product, selectedSize) => {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa và kích cỡ đã chọn
    const findProductByCarts = listCart.find(
      (item) =>
        item.product.id === product.id && item.selectedSize === selectedSize
    );

    if (!findProductByCarts) {
      // Nếu chưa thì thêm vào kèm theo quantity = 1 và kích cỡ đã chọn
      const updateCarts = [...listCart, { product, quantity: 1, selectedSize }];

      setListCart(updateCarts);

      // Lưu dữ liệu lên local và state
      saveData("carts", updateCarts);
    } else {
      // Nếu đã tồn tại thì tăng quantity lên 1
      const updateCarts = listCart.map((cart) => {
        if (
          cart.product.id === product.id &&
          cart.selectedSize === selectedSize
        ) {
          return { ...cart, quantity: cart.quantity + 1 };
        }
        return cart;
      });

      setListCart(updateCarts);

      // Lưu dữ liệu lên local và state
      saveData("carts", updateCarts);
    }
  };

  // Hàm cập nhật so luong giỏ hàng
  const updateCart = (productId, change) => {
    setListCart((prevList) => {
      return prevList
        .map((cart) => {
          if (cart.product.id === productId) {
            const newQuantity = cart.quantity + change;
            return {
              ...cart,
              quantity: Math.max(newQuantity, 0), // Đảm bảo số lượng không âm
            };
          }
          return cart;
        })
        .filter((cart) => cart.quantity > 0); // Xóa sản phẩm nếu số lượng là 0
    });
    saveData("carts", listCart); // Lưu giỏ hàng mới vào localStorage
  };

  // delete product from cart
  const handleRemove = (productId) => {
    Swal.fire({
      title: "Are you sure you want to delete??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete!",
      cancelButtonText: "Cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        setListCart((prevList) => {
          const updatedList = prevList.filter(
            (cart) => cart.product.id !== productId
          );
          saveData("carts", updatedList);
          return updatedList;
        });
        Swal.fire("Deleted!", "Product has been removed from cart.", "success");
      }
    });
  };

  // delete all product from cart
  const handleAllRemove = () => {
    Swal.fire({
      title: "Are you sure you want to delete all products from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete All!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setListCart(() => {
          const updatedList = []; // Đặt danh sách giỏ hàng thành rỗng
          saveData("carts", updatedList);
          return updatedList;
        });
        Swal.fire(
          "Deleted!",
          "All products have been removed from the cart.",
          "success"
        );
      }
    });
  };

  return (
    <ProductProvider.Provider
      value={{
        listProduct,
        handleAddToCart,
        listCart,
        getCartItemCount,
        updateCart,
        handleRemove,
        handleAllRemove,
      }}
    >
      {children}
    </ProductProvider.Provider>
  );
}
