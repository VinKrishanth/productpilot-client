import React from "react";
import { useAppContext } from "../context/AppContext";
import { LucideEye} from 'lucide-react'

export default function OrderHistory() {
  const { userOrders, currency } = useAppContext();

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden ">
      <div className="flex justify-between items-center p-6">
        <h2 className="text-lg font-medium">Recent Order History</h2>
        <a href="#" className="text-green-500 text-sm font-medium">
          View All
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Payment Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Payment 
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {userOrders.slice(0, 5).map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {order._id.slice(-7)}
                </td>
                <td className="px-6 py-4 text-gray-700 min-w-40">
                  {formatDateTime(order.createdAt)}
                </td>
                <td className="px-6 py-4 text-gray-700 min-w-30">
                  {currency} {parseFloat(order.amount).toFixed(2)}
                  <span className="text-sm text-gray-500 ml-1">
                    {order.products}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      order.address?.paymentMethod === "cod"
                        ? "bg-green-100 text-green-800"
                        : order.address?.paymentMethod === "card"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.address?.paymentMethod}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      order.address?.isPaid === true
                        ? " text-green-800"
                        : order.address?.isPaid === false
                        ? " text-blue-800"
                        : " text-yellow-800"
                    }`}
                  >
                    {order.address?.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <a href="#" className="text-green-500 text-sm">
                    <LucideEye className="h-5 w-5 cursor-pointer" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
