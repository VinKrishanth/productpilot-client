import React from "react";

const orders = [
  { id: "#738", date: "8 Sep, 2020", total: "$135.00", products: "(5 Products)", status: "Processing" },
  { id: "#703", date: "24 May, 2020", total: "$25.00", products: "(1 Product)", status: "on the way" },
  { id: "#130", date: "22 Oct, 2020", total: "$250.00", products: "(4 Products)", status: "Completed" },
  { id: "#561", date: "1 Feb, 2020", total: "$35.00", products: "(1 Products)", status: "Completed" },
  { id: "#536", date: "21 Sep, 2020", total: "$678.00", products: "(13 Products)", status: "Completed" },
  { id: "#492", date: "22 Oct, 2020", total: "$345.00", products: "(7 Products)", status: "Completed" },
];

export default function OrderHistory() {
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 font-medium text-gray-800">{order.id}</td>
                <td className="px-6 py-4 text-gray-700">{order.date}</td>
                <td className="px-6 py-4 text-gray-700">
                  {order.total}
                  <span className="text-sm text-gray-500 ml-1">{order.products}</span>
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
                    View Details
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
