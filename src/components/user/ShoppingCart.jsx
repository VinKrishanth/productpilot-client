import React, { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

export default function ShoppingCart() {
  const { currency, getCartAmount, navigate , products, cartItems, setCartItems, addToCart, removeCartItem, deleteCartItem} = useAppContext();
  
  const [cartDetails, setCartDetails] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  
  
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
      console.log(cartDetails);
      console.log(cartItems);
    }, [products, cartItems]);


  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    console.log("Applying coupon:", couponCode);
    setCouponCode("");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Table */}
        <div className="lg:col-span-2">
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full min-w-[600px] text-sm text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase">
                <tr>
                  <th className="px-4 py-4 text-center">Product</th>
                  <th className="px-4 py-4 text-center">Price</th>
                  <th className="px-4 py-4 text-center">Offer Price</th>
                  <th className="px-4 py-4 text-center">Quantity</th>
                  <th className="px-4 py-4 text-center">Subtotal</th>
                  <th className="px-4 py-4"></th>
                </tr>
              </thead>
              <tbody >
                {cartDetails.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-15 sm:h-15 rounded overflow-hidden">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium text-xs">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      ${item.offerPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                          <button
                            onClick={() =>
                              removeCartItem(item._id)
                            }
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="px-4 cursor-pointer">{item.quantity}</span>
                          <button
                            onClick={() =>
                              addToCart(item._id)
                              
                            }
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">
                      ${(item.offerPrice * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => deleteCartItem(item._id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Buttons */}
          <div className="flex  justify-end items-center gap-4 mt-6">
            <button
              onClick={() => navigate('/shop')}
              className="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-100"
            >
              Return to Shop
            </button>
          </div>

          {/* Coupon Code */}
          <div className="mt-8">
            <label className="block mb-2 text-lg font-medium">
              Coupon Code
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none "
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Apply Coupon
              </button>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Cart Total</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">
                  {currency} {getCartAmount().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (2%):</span>
                <span className="font-medium">
                  {currency}
                  {getCartAmount() !== 0 ? (getCartAmount() * 0.02).toFixed(2) : "0.00"}
                </span>
              </div>

              <hr />
              <div className="flex justify-between">
                <span className="text-gray-800 font-semibold">Total:</span>
                <span className="text-xl font-medium">
                  {currency} {(getCartAmount() + getCartAmount() * 0.02).toFixed(2)}
                </span>
              </div>
              <button
                className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                onClick={() => navigate('/Checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
