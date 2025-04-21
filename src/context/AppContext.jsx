import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchAdmin, fetchUser } from "../api/auth";
import { fetchAllProducts } from "../api/Product";
import { toast } from "react-hot-toast";
import { updateCart } from "../api/cart";
import { getUserAddress, getUserOrders } from "../api/userDashboard";

// Axios global config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;
  const [user, setIsUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [dashboardLoad, setDashboardLoad] = useState(false);
  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState({});

  const openQuickView = (id) => {
    const selectedProduct = products.find((item) => item._id === id);
    if (selectedProduct) {
      setProduct(selectedProduct);
      setIsOpen(true);
    } else {
      toast.error("Product not found.");
    }
  };

  const closeQuickView = () => {
    setIsOpen(false);
    setProduct(null);
  };

  const fetchAuthStatus = async () => {
    try {
      if (role === "user") {
        const data = await fetchUser(axios, role);
        if (data?.success) {
          setIsAuth(true);
          setIsUser(data.user);
          setCartItems(data.user.cartItems);
        } else {
          throw new Error("User not authenticated");
        }
      } else if (role === "admin") {
        const data = await fetchAdmin(axios, role);
        if (data?.success) {
          setIsAuth(true);
          setIsAdmin(data.user);
        } else {
          throw new Error("Admin not authenticated");
        }
      }
    } catch (error) {
      console.error("Auth status check failed:", error.message || error);
      setIsAuth(false);
      setIsUser(null);
      setIsAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = (itemId) => {
    const updatedCart = structuredClone(cartItems);

    updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;

    setCartItems(updatedCart);
    toast.success("Item added to cart");
  };

  // Update cart item quantity
  const updateCartItem = ({ itemId, quantity }) => {
    const updatedCart = structuredClone(cartItems);
    updatedCart[itemId] = quantity;

    setCartItems(updatedCart);
    toast.success("Cart updated");
  };

  // Remove item from cart
  const removeCartItem = (itemId) => {
    const updatedCart = structuredClone(cartItems);

    if (updatedCart[itemId]) {
      updatedCart[itemId] -= 1;

      if (updatedCart[itemId] === 0) {
        delete updatedCart[itemId];
      }

      setCartItems(updatedCart);
      toast.success("Item removed from cart");
    }
  };

  // Remove item from cart
  const deleteCartItem = (itemId) => {
    const updatedCart = { ...cartItems };

    if (updatedCart[itemId]) {
      delete updatedCart[itemId];
      setCartItems(updatedCart);
      toast.success("Item completely removed from cart");
    } else {
      toast.error("Item not found in cart");
    }
  };

  // Get total item count in cart
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  // Get total cart amount
  const getCartAmount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        total += product.offerPrice * cartItems[itemId];
      }
    }

    return Math.floor(total * 100) / 100;
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    if (product) {
      // console.log("Product updated in state:", product);
    }
  }, [product]);

  useEffect(() => {
    if (role) {
      fetchAuthStatus();
    } else {
      setLoading(false);
    }
    const data = fetchAllProducts(axios, setProducts, toast, isAdmin);
  }, [role]);

  // update cart
  useEffect(() => {
    if (user && cartItems) {
      updateCart(axios, cartItems, toast);
    }
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress(axios, setUserAddress);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getUserOrders(axios, setUserOrders);
    }
  }, [user]);

  const value = {
    navigate,
    axios,
    user,
    setIsUser,
    isAdmin,
    setIsAdmin,
    products,
    setProducts,
    cartItems,
    setCartItems,
    loading,
    setLoading,
    role,
    setRole,
    isAuth,
    setIsAuth,
    fetchAuthStatus,
    currency,
    toast,
    isOpen,
    product,
    openQuickView,
    closeQuickView,
    addToCart,
    removeCartItem,
    getCartCount,
    getCartAmount,
    openCart,
    closeCart,
    isCartOpen,
    wishlistItems,
    setWishlistItems,
    removeCartItem,
    updateCartItem,
    deleteCartItem,
    dashboardLoad,
    setDashboardLoad,
    userAddress,
    setUserAddress,
    userOrders,
    setUserOrders,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
