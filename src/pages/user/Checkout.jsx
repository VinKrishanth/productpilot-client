import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

export default function Checkout() {
  const {
    currency,
    getCartAmount,
    getCartCount,
    cartItems,
    products,
    navigate,
  } = useAppContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    country: "",
    state: "",
    zipCode: "",
    email: "",
    phone: "",
    shipDifferent: false,
    orderNotes: "",
    paymentMethod: "cod",
  });

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <main className="container max-w-7xl w-full flex flex-col lg:flex-row gap-10 mt-16 sm:items-start sm:justify-center">
      <section className="flex-1 max-w-4xl sm:shadow sm:p-8">
        <form className="space-y-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Billing Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                className="block text-xs font-normal text-gray-700 mb-1"
                htmlFor="firstName"
              >
                First name
              </label>
              <input
                className="w-full rounded border border-gray-200 text-xs text-gray-400 placeholder:text-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
                id="firstName"
                name="firstName"
                placeholder="Your first name"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-xs font-normal text-gray-700 mb-1"
                htmlFor="lastName"
              >
                Last name
              </label>
              <input
                className="w-full rounded border border-gray-200 text-xs text-gray-400 placeholder:text-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
                id="lastName"
                name="lastName"
                placeholder="Your last name"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-xs font-normal text-gray-700 mb-1"
                htmlFor="companyName"
              >
                Company Name{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                className="w-full rounded border border-gray-200 text-xs text-gray-400 placeholder:text-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
                id="companyName"
                name="companyName"
                placeholder="Company name"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-xs font-normal text-gray-700 mb-1"
              htmlFor="streetAddress"
            >
              Street Address
            </label>
            <input
              className="w-full rounded border border-gray-200 text-xs text-gray-400 placeholder:text-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
              id="streetAddress"
              name="streetAddress"
              placeholder="Street Address"
              type="text"
              value={formData.streetAddress}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                className="block text-xs font-normal text-gray-700 mb-1"
                htmlFor="country"
              >
                Country / Region
              </label>
              <select
                className="w-full rounded border border-gray-200 text-xs text-gray-400 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option>Select</option>
              </select>
            </div>
            <div>
              <label
                className="block text-xs font-normal text-gray-700 mb-1"
                htmlFor="state"
              >
                States
              </label>
              <select
                className="w-full rounded border border-gray-200 text-xs text-gray-400 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
              >
                <option>Select</option>
              </select>
            </div>
            <div>
              <label
                className="block text-xs font-normal text-gray-700 mb-1"
                htmlFor="zipCode"
              >
                Zip Code
              </label>
              <input
                className="w-full rounded border border-gray-200 text-xs text-gray-400 placeholder:text-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
                id="zipCode"
                name="zipCode"
                placeholder="Zip Code"
                type="text"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-xs font-normal text-gray-700 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full rounded border border-gray-200 text-xs text-gray-400 placeholder:text-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
                id="email"
                name="email"
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-xs font-normal text-gray-700 mb-1"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="w-full rounded border border-gray-200 text-xs text-gray-400 placeholder:text-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
                id="phone"
                name="phone"
                placeholder="Phone number"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-700">
            <input
              className="w-3.5 h-3.5 border border-gray-300 rounded-sm focus:ring-1 focus:ring-green-600"
              id="shipDifferent"
              name="shipDifferent"
              type="checkbox"
              checked={formData.shipDifferent}
              onChange={handleChange}
            />
            <label className="select-none" htmlFor="shipDifferent">
              Ship to a different address
            </label>
          </div>

          <hr className="border-t border-gray-200 mt-6" />
          <h3 className="text-base font-semibold text-gray-900 mt-6 mb-3">
            Additional Info
          </h3>
          <label
            className="block text-xs font-normal text-gray-700 mb-1"
            htmlFor="orderNotes"
          >
            Order Notes (Optional)
          </label>
          <textarea
            className="w-full rounded border border-gray-200 text-xs text-gray-400 placeholder:text-gray-300 px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-green-600"
            id="orderNotes"
            name="orderNotes"
            placeholder="Notes about your order, e.g. special notes for delivery"
            rows="3"
            value={formData.orderNotes}
            onChange={handleChange}
          ></textarea>
        </form>
      </section>

      <aside className="w-full max-w-sm rounded border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Order Summary
        </h2>

        {/* Scrollable container for cartDetails */}
        <div className="max-h-56 overflow-y-auto pr-2 mb-6">
          <ul className="space-y-3 my-4">
            {cartDetails.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-xs text-gray-900"
              >
                <div className="flex items-center space-x-2">
                  <img
                    alt={`${item.name} image`}
                    className="w-6 h-6 object-cover rounded"
                    height="24"
                    src={item.images[0]}
                    width="24"
                  />
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                </div>
                <span className="font-semibold">
                  {currency} {parseFloat(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Remaining content below */}
        <div className="text-xs text-gray-900 mb-6 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span className="font-semibold">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tex(2%):</span>
            <span className="font-semibold">
              {currency}
              {getCartAmount() !== 0
                ? (getCartAmount() * 0.02).toFixed(2)
                : "0.00"}
            </span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total:</span>
            <span>
              {currency} {(getCartAmount() + getCartAmount() * 0.02).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment method */}
        <div className="text-xs text-gray-900 mb-6">
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <form className="space-y-2">
            {["cod", "paypal", "amazon"].map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  className="w-4 h-4 border border-gray-300 focus:ring-1 focus:ring-green-600"
                  name="paymentMethod"
                  type="radio"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={handleChange}
                />
                <span className="capitalize">
                  {method === "cod" ? "Cash on Delivery" : method + " Pay"}
                </span>
              </label>
            ))}
          </form>
        </div>

        <button
          className="w-full bg-green-600 text-white text-xs font-semibold rounded-full py-2 px-4 hover:bg-green-700 transition"
          type="submit"
        >
          Place Order
        </button>
      </aside>
    </main>
  );
}
