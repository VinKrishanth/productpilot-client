import React from "react";
import UserProfile from "../../components/UserProfile";
import OrderHistory from "../../components/OrderHistory";

export default function Dashboard() {
  return (
    <div className="mt-14">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <UserProfile />
            <div className="bg-white p-6 rounded-lg shadow-sm sm:mr-8">
              <h2 className="text-lg font-medium mb-4">BILLING ADDRESS</h2>
              <div className="space-y-2">
                <p className="font-medium">Dianne Russell</p>
                <p className="text-gray-600">
                  4140 Parker Rd, Allentown, New Mexico 31134
                </p>
                <p className="text-gray-600">dianne.russell@gmail.com</p>
                <p className="text-gray-600">(671) 555-0110</p>
              </div>
              <button className="text-green-500 font-medium mt-4">
                Edit Address
              </button>
            </div>
          </div>
          <OrderHistory />
        </div>
      </div>
    </div>
  );
}
