import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [cart, setCart] = useState([]);

  async function fetchCart() {
    const currentToken = Cookies.get("token");
    if (!currentToken || currentToken === "null") return; // Don't fetch if not logged in

    try {
      const { data } = await axios.get(`${server}/api/cart/all`, {
        headers: {
          token: currentToken,
        },
      });

      setCart(data.cart);
      setTotalItem(data.sumofQuantity);
      setSubTotal(data.subTotal);
    } catch (error) {
      console.log("Fetch Cart Error:", error);
    }
  }

  async function addToCart(product) {
    try {
      const { data } = await axios.post(
        `${server}/api/cart/add`,
        { product },
        {
          headers: {
            token: Cookies.get("token"), // ✅ Dynamic: Fetches the absolute latest token
          },
        }
      );

      toast.success(data.message);
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to cart");
    }
  }

  async function updateCart(action, id) {
    try {
      const { data } = await axios.post(
        `${server}/api/cart/update?action=${action}`,
        { id },
        {
          headers: {
            token: Cookies.get("token"), // ✅ Dynamic
          },
        }
      );

      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating cart");
    }
  }

  async function removeFromCart(id) {
    try {
      const { data } = await axios.get(`${server}/api/cart/remove/${id}`, {
        headers: {
          token: Cookies.get("token"), // ✅ Dynamic
        },
      });

      toast.success(data.message);
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing from cart");
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItem,
        subTotal,
        fetchCart,
        addToCart,
        setTotalItem,
        updateCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartData = () => useContext(CartContext);
