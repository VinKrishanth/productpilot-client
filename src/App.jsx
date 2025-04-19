import { Route, Routes, useLocation } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Newsletter from "./components/Newsletter";
import Navbar from "./components/Navbar";
import CustomerLayout from "./pages/user/CustomerLayout";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/DashBoard";
import AdminLayout from "./pages/admin/AdminLayout";
import Loader from "./components/Loader ";
import Setting from "./pages/user/Setting";
import Order from "./pages/user/Order";
import Wishlist from "./pages/user/Wishlist";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import AccountSettings from "./components/user/AccountSettings";
import BillingAddress from "./components/user/BillingAddress";
import ChangePassword from "./components/user/ChangePassword";
import CustomerRoute from "./utils/CustomerRoute";
import AdminRoute from "./utils/AdminRoute";
import ShopProducts from "./pages/admin/ShopProducts";
import AddProductForm from "./components/admin/products/AddProductForm";
import Orders from "./pages/admin/Orders";
import Shipping from "./pages/admin/Shipping";
import AdminSetting from "./pages/admin/Setting";
import Payments from "./pages/admin/Payments";
import Support from "./pages/admin/Support";
import Shop from "./pages/Shop";
import QuickViewModal from "./components/shop/QuickViewModal";
import CartSidebar from "./components/shop/CartSidebar";
import ShoppingCart from "./components/user/ShoppingCart";
import ScrollToTop from "./utils/ScrollToTop";


function App() {
  const { loading, setLoading } = useAppContext();
  const location = useLocation();
  const role = localStorage.getItem("role");
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <>
          {!/^(\/admin|\/customer)/.test(location.pathname) && <Navbar cartCount={0} />}
          <Toaster position="top-center" reverseOrder={false} />
          <QuickViewModal />
          <CartSidebar />
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route
              path="/customer"
              element={
                <CustomerRoute>
                  <CustomerLayout />
                </CustomerRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="order-history" element={<Order />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="shopping-cart" element={<Cart />} />
              <Route path="settings" element={<Setting />}>
                <Route index element={<AccountSettings />} />
                <Route path="billing-address" element={<BillingAddress />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
            </Route>

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<ShopProducts />} />
              <Route path="products/add" element={<AddProductForm />} />
              <Route path="orders" element={<Orders />} />
              <Route path="shipping" element={<Shipping />} />
              <Route path="settings" element={<AdminSetting />} />
              <Route path="payments" element={<Payments />} />
              <Route path="support" element={<Support />} />
            </Route>
          </Routes>
          {!/^(\/admin|\/customer)/.test(location.pathname) &&
            !["/login", "/register"].includes(location.pathname) && (
              <>
                <Newsletter />
                <Footer />
              </>
            )}
        </>
      )}
    </div>
  );
}

export default App;
