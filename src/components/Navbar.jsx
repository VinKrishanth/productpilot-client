import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  ChevronDown,
  User,
  Phone,
} from "lucide-react";
import { cn } from "../utils/cn";
import { LogoImg } from "../assets/images/assets";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { logout } from "../api/auth";
import AuthButton from "./ui/AuthButton";

const shopLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar({ cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { navigate, isAuth, axios, role,user, setIsAuth , openCart, updateCart} =useAppContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout(axios, role, navigate, setIsAuth,updateCart);
    } catch (error) {
      // /console.error("Logout failed:", error.message);
    }
  };

  const handleDashboard = () => {
    if (role === "user") {
      navigate("/customer");
    } else {
      navigate("/admin");
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sw-full">
      {/* Main navbar */}
      <div className="bg-white py-4 px-4 lg:px-8 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center">
          <div className="md:hidden mr-4">
            <button onClick={toggleMenu} className="p-1">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="flex items-center">
            <div className="text-green-600 font-semibold text-2xl flex items-center">
              <img src={LogoImg} alt="logo" className="pr-2" /> Ecobazar
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button className="absolute right-0 top-0 h-full bg-green-500 text-white px-4 rounded-r-md">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center">
            <button className="p-1 relative cursor-pointer">
              <Heart className="h-6 w-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center">
            <button className="p-1 relative cursor-pointer" onClick={()=>{openCart()}}>
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

         <AuthButton />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="hidden md:flex items-center justify-between">
            <ul className="flex space-x-8 py-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `font-medium ${
                        isActive
                          ? "text-green-500"
                          : "hover:text-green-400 text-white"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="text-white">
              <a href="tel:1234567890" className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>Call Us: (+94) 77-323-540</span>
              </a>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
            <ul className="py-2">
              {shopLinks.map((link) => (
                <li key={link.name} className="py-2" onClick={toggleMenu}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-2 font-medium ${
                        isActive
                          ? "text-green-500"
                          : "text-white hover:text-green-400"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}

              <li key={"user-login"} className="py-2 space-y-2 -translate-y-1">
                {isAuth ? (
                  <>
                    <button
                      onClick={() => {
                        toggleMenu();
                        handleDashboard();
                      }}
                      className="block w-full text-left px-2 font-medium text-white hover:text-green-400"
                    >
                      Dashboard
                    </button>

                    <button
                      onClick={() => {
                        toggleMenu();
                        handleLogout();
                      }}
                      className="block w-full text-left px-2 font-medium text-white hover:text-green-400"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={toggleMenu}
                    className={({ isActive }) =>
                      `block px-2 font-medium ${
                        isActive
                          ? "text-green-500"
                          : "text-white hover:text-green-400"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
