import React, { useEffect, useState } from "react";
import { X, Trash2, Minus, Plus } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const CartSidebar = () => {
  const {
    isCartOpen,
    closeCart,
    currency,
    deleteCartItem,
    getCartAmount,
    getCartCount,
    cartItems,
    products,
    addToCart,
    removeCartItem,
    navigate
  } = useAppContext();

  const [cartDetails, setCartDetails] = useState([]);

  const getCartDetails = () => {
    const updatedCart = [];

    for (const productId in cartItems) {
      const matchedProduct = products.find((item) => item._id === productId);
      if (matchedProduct) {
        updatedCart.push({ ...matchedProduct, quantity: cartItems[productId] });
      }
    }

    setCartDetails(updatedCart);
  };

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCartDetails();
    }
  }, [products, cartItems]);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isCartOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 bg-opacity-50"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={`relative w-full max-w-md bg-white h-full flex flex-col shadow-lg transition-transform duration-300 ease-in-out transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-lg font-semibold">
            Shopping Cart ({getCartCount()})
          </h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto ">
          {cartDetails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-gray-500 text-center mt-1">
                Looks like you haven't added anything to your cart yet.
              </p>
            </div>
          ) : (
            cartDetails.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 p-4 border-b border-gray-300 hover:bg-gray-50"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border border-gray-300 cursor-pointer group">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex justify-center items-center gap-4">
                      <h3 className="font-medium text-sm truncate cursor-pointer hover:text-primary-dull">
                        {item.name}
                      </h3>
                      <div className=" items-center  border border-gray-300 rounded-md overflow-hidden hidden">
                        <button
                          onClick={() => removeCartItem(item._id)}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="px-2 cursor-pointer text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item._id)}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCartItem(item._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex  justify-start items-center gap-2">
                    <p className="text-xs text-gray-500">{item.quantity} * </p>
                    <span className="font-normal text-xs text-eco-green">
                      {currency} {parseFloat(item.offerPrice).toFixed(2)}
                    </span>
                    <span className="font-normal text-xs text-eco-green">
                      = {currency}{" "}
                      {parseFloat(item.offerPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartDetails.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">
                {currency}
                {getCartAmount()}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Tex(2%)</span>
              <span className="font-medium">
                {currency}
                {getCartAmount() !== 0
                  ? (getCartAmount() * 0.02).toFixed(2)
                  : "0.00"}
              </span>
            </div>
            <div className="h-px bg-gray-300 my-2" />
            <div className="flex justify-between py-2 font-semibold">
              <span>Total</span>
              <span className="text-eco-green font-bold">
                {currency}{" "}
                {(getCartAmount() + getCartAmount() * 0.02).toFixed(2)}
              </span>
            </div>
            <div className="grid gap-2 mt-4 ">
              <button onClick={()=>{navigate('/checkout'); closeCart()}} className="border bg-[#00B207] hover:bg-[#00B207]/70 border-gray-300 text-white px-4 py-2 rounded cursor-pointer transition-all duration-500 ease-linear ">
                Checkout
              </button>
              <button
                onClick={()=>{navigate('/shop'); closeCart()}}
                className="border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
