import React from "react";
import UserProfile from "../../components/UserProfile";
import OrderHistory from "../../components/OrderHistory";
import { useAppContext } from "../../context/AppContext";

export default function Dashboard() {
  const { userAddress, navigate } = useAppContext();
  const getFullName = (address) => {
    return address.firstName + " " + address.lastName;
  };

  const getAddress = (address) => {
    return (
      address.streetAddress +
      ", " +
      address.state +
      ", " +
      address.country +
      ", " +
      address.zipCode
    );
  };

  return (
    <div className="mt-30">
      <div className="container flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div className="grid md:grid-cols-2 gap-6 justify-center">
            <UserProfile />
            <div className="bg-white p-6 rounded-lg shadow-sm sm:mr-8 cursor-pointer">
              <h2 className="text-lg font-medium mb-4">BILLING ADDRESS</h2>
              <div className="space-y-2">
                <p className="font-medium">
                  {userAddress.firstName ? getFullName(userAddress) : "Demo Demo"}
                </p>
                <p className="text-gray-600">
                  {userAddress.country
                    ? getAddress(userAddress)
                    : "4140 Parker Rd, Allentown, New Mexico 31134"}
                </p>
                <p className="text-gray-600">
                  {userAddress.email ? userAddress.email : "customer@example.com"}
                </p>
                <p className="text-gray-600">
                  {userAddress.email ? userAddress.phone : "077-xxx-xxxx"}
                </p>
              </div>
              <button onClick={()=>{navigate('/customer/settings/billing-address')}}  className="text-green-500 font-medium mt-4">
                Edit Address
              </button>
            </div>
          </div>
          <div className="mb-16">
            <OrderHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
