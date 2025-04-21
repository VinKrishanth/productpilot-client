import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { checkoutCOD, checkoutOnline } from "../../api/cart";
import { LoaderIcon } from "lucide-react";

export default function Checkout() {
  const {
    currency,
    getCartAmount,
    cartItems,
    products,
    userAddress,
    axios,
    dashboardLoad,
    setDashboardLoad,
    setCartItems,
    navigate,
    setUserOrders 
  } = useAppContext();

  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    country: "",
    state: "",
    zipCode: "",
    email: "",
    phone: "",
    orderNotes: "",
    paymentMethod: "cod",
  });

  const [cartDetails, setCartDetails] = useState([]);
  const [shippingOption, setShippingOption] = useState("standard");
  const [shippingCost, setShippingCost] = useState(0);

  // Function to get Cart Details
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
    const { name, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addressChange = () => {
    setNewAddress((prev) => !prev);
  };

  useEffect(() => {
    if (newAddress) {
      setAddress({
        firstName: "",
        lastName: "",
        companyName: "",
        streetAddress: "",
        country: "",
        state: "",
        zipCode: "",
        email: "",
        phone: "",
        orderNotes: "",
        paymentMethod: "cod",
      });
    } else {
      setAddress({
        paymentMethod: "cod",
        ...userAddress,
      });
    }
  }, [newAddress, userAddress]);

  const handleShippingChange = (e) => {
    const selectedShippingOption = e.target.value;
    setShippingOption(selectedShippingOption);

    if (selectedShippingOption === "express") {
      setShippingCost(10.0);
    } else {
      setShippingCost(0.0);
    }
  };

  const handlePlaceOrder = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "streetAddress",
      "country",
      "state",
      "zipCode",
      "email",
      "phone",
      "paymentMethod",
    ];

    const emptyFields = requiredFields.filter(
      (field) => String(address[field] || "").trim() === ""
    );

    if (emptyFields.length > 0) {
      toast.error("Please fill all required billing fields.");
      return;
    }

    if (address.paymentMethod === "cod") {
      checkoutCOD(
        axios,
        {
          address: address,
          items: cartDetails.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          shippingOption: shippingOption
        },
        toast,
        setDashboardLoad,
        setCartItems,
        navigate,
        setUserOrders
      );
    } else {
      checkoutOnline(
        axios,
        {
          address: address,
          items: cartDetails.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          shippingOption: shippingOption
        },
        toast,
        setDashboardLoad,
        setCartItems,
        navigate,
        setUserOrders
      );
    }
  };

  const getTotalAmount = () => {
    const cartAmount = getCartAmount();
    return cartAmount + shippingCost;
  };

  return (
    <main className="container max-w-7xl w-full flex flex-col lg:flex-row gap-10 mt-16 sm:items-start sm:justify-center">
      {/* Billing Section */}
      <section className="flex-1 max-w-4xl sm:shadow sm:p-8">
        <form className="space-y-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            Billing Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="First name"
              name="firstName"
              value={address.firstName || ""}
              onChange={handleChange}
              required
            />
            <Input
              label="Last name"
              name="lastName"
              value={address.lastName || ""}
              onChange={handleChange}
              required
            />
            <Input
              label="Company Name"
              name="companyName"
              value={address.companyName || ""}
              onChange={handleChange}
              optional
            />
          </div>

          <Input
            label="Street Address"
            name="streetAddress"
            value={address.streetAddress || ""}
            onChange={handleChange}
            required
            full
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Country / Region"
              name="country"
              value={address.country || ""}
              onChange={handleChange}
              required
            />
            <Input
              label="State"
              name="state"
              value={address.state || ""}
              onChange={handleChange}
              required
            />
            <Input
              label="Zip Code"
              name="zipCode"
              value={address.zipCode || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              name="email"
              type="email"
              value={address.email || ""}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={address.phone || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-700">
            <input
              className="w-3.5 h-3.5 border border-gray-300 rounded-sm focus:ring-1 focus:ring-green-600"
              id="shipDifferent"
              name="shipDifferent"
              type="checkbox"
              checked={newAddress}
              onChange={addressChange}
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
            className="w-full rounded border border-gray-200 text-xs text-gray-900 placeholder:text-gray-300 px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-green-600"
            id="orderNotes"
            name="orderNotes"
            placeholder="Notes about your order, e.g. special notes for delivery"
            rows="3"
            value={address.orderNotes || ""}
            onChange={handleChange}
          />
        </form>
      </section>

      {/* Order Summary Section */}
      <aside className="w-full max-w-sm rounded border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          Order Summary
        </h2>

        {/* Cart Items */}
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
                    src={item.images[0]}
                    width="24"
                    height="24"
                  />
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                </div>
                <span className="font-semibold">
                  {currency} {(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Shipping Options */}
        <div className="mb-4">
          <label
            className="block text-xs font-normal text-gray-700 mb-2"
            htmlFor="shippingOption"
          >
            Shipping Options
          </label>
          <select
            id="shippingOption"
            name="shippingOption"
            value={shippingOption}
            onChange={handleShippingChange}
            className="w-full rounded border border-gray-200 text-xs text-gray-900 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
          >
            <option value="standard">Standard Shipping - Free</option>
            <option value="express">Express Shipping - {currency} 10.00</option>
          </select>
        </div>

        {/* Total Summary */}
        {shippingOption === "express" && (
          <>
            <div className="flex items-center justify-between text-sm font-normal capitalize text-gray-900 pt-4">
              <span>subtotal</span>
              <span>
                {currency} {(getTotalAmount() - 10).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm font-normal text-gray-900 pt-4 mb-4">
              <span>Express shipping</span>
              <span>{currency} 10.00</span>
            </div>
          </>
        )}
        <div className="flex items-center justify-between text-sm font-medium text-gray-900 border-t pt-4">
          <span>Total</span>
          <span>
            {currency} {getTotalAmount().toFixed(2)}
          </span>
        </div>

        {/* Payment Method */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Payment Method
          </h3>
          <div className="space-y-2 text-xs">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={address.paymentMethod === "cod"}
                onChange={handleChange}
                className="text-green-600"
              />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={address.paymentMethod === "card"}
                onChange={handleChange}
                className="text-green-600"
              />
              <span>Credit / Debit Card</span>
            </label>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          type="button"
          disabled={dashboardLoad}
          onClick={handlePlaceOrder}
          className={`mt-6 w-full ${
            dashboardLoad
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white text-sm font-semibold py-2 px-4 rounded transition duration-200 cursor-pointer`}
        >
          {dashboardLoad && <LoaderIcon className="animate-spin h-5 w-5 text-white" />}
          {dashboardLoad ? "Placing Order..." : "Place Order"}
        </button>
      </aside>
    </main>
  );
}

// Helper Input Component
function Input({
  label,
  name,
  value,
  onChange,
  required,
  optional = false,
  type = "text",
  full = false,
}) {
  return (
    <div className={full ? "col-span-full" : ""}>
      <label
        className="block text-xs font-normal text-gray-700 mb-1"
        htmlFor={name}
      >
        {label}{" "}
        {optional ? (
          <span className="text-gray-900 font-normal">(optional)</span>
        ) : (
          <span className="text-red-400 text-sm">*</span>
        )}
      </label>
      <input
        className="w-full rounded border border-gray-200 text-xs text-gray-900 placeholder:text-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
        id={name}
        name={name}
        type={type}
        value={value || ""}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
