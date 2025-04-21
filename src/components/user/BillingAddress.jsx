import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { LoaderIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  createUserAddress,
  updateUserAddress,
} from "../../api/userDashboard.js";

export default function BillingAddress() {
  const {
    user,
    axios,
    dashboardLoad,
    setDashboardLoad,
    userAddress,
    setUserAddress,
  } = useAppContext();

  const [address, setAddress] = useState({
    firstName: userAddress?.firstName || "",
    lastName: userAddress?.lastName || "",
    company: userAddress?.company || "",
    streetAddress: userAddress?.streetAddress || "",
    country: userAddress?.country || "",
    state: userAddress?.state || "",
    zipCode: userAddress?.zipCode || "",
    email: userAddress?.email || "",
    phone: userAddress?.phone || "",
  });

  const [ isAddressTrue , setIsAddressTrue] = useState( userAddress?.firstName ? true : false);
  useEffect(() => {
    if (userAddress) {
      setAddress({
        firstName: userAddress.firstName || "",
        lastName: userAddress.lastName || "",
        company: userAddress.company || "",
        streetAddress: userAddress.streetAddress || "",
        country: userAddress.country || "",
        state: userAddress.state || "",
        zipCode: userAddress.zipCode || "",
        email: userAddress.email || "",
        phone: userAddress.phone || "",
      });
      setIsAddressTrue(true);
    }
  }, [userAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "firstName",
      "lastName",
      "streetAddress",
      "country",
      "state",
      "zipCode",
      "email",
      "phone",
    ];

    const emptyField = requiredFields.find((field) => {
      return typeof address[field] === "string" && !address[field]?.trim();
    });

    if (emptyField) {
      toast.error(`${emptyField.replace(/([A-Z])/g, " $1")} is required`);
      return;
    }

    if (isAddressTrue) {
      await updateUserAddress({
        axios,
        address,
        toast,
        setDashboardLoad,
        setUserAddress,
      });
    } else {
      await createUserAddress({
        axios,
        address,
        toast,
        setDashboardLoad,
        setUserAddress,
      });
    }
  };

  return (
    <div className="container bg-white rounded-lg sm:shadow-sm p-6 sm:w-[90%] sm:mt-35">
      <h2 className="text-xl font-medium mb-6">Billing Address</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-1"
            >
              First name <span className="text-red-400 text-sm">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none "
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-1"
            >
              Last name <span className="text-red-400 text-sm">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Company Name <span className="text-gray-300">(Optional)</span>
            </label>
            <input
              id="company"
              name="company"
              value={address.company}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="streetAddress"
            className="block text-sm font-medium mb-1"
          >
            Street Address <span className="text-red-400 text-sm">*</span>
          </label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={address.streetAddress}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium mb-1">
              Country / Region <span className="text-red-400 text-sm">*</span>
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={address.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium mb-1">
              State <span className="text-red-400 text-sm">*</span>
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={address.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
              Zip Code <span className="text-red-400 text-sm">*</span>
            </label>
            <input
              type="number"
              id="zipCode"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email <span className="text-red-400 text-sm">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={address.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone <span className="text-red-400 text-sm">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={address.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={dashboardLoad}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white transition 
    ${
      dashboardLoad
        ? "bg-green-400 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600"
    }`}
        >
          {dashboardLoad && (
            <LoaderIcon className="animate-spin h-5 w-5 text-white" />
          )}
          {dashboardLoad
            ? isAddressTrue
              ? "Updating..."
              : "Saving..."
            : isAddressTrue
            ? "Update"
            : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
