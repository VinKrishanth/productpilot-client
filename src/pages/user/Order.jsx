import { useState } from "react";
import { Link } from "react-router-dom";

const orderHistoryData = [
  {
    id: "#3933",
    date: "4 April, 2021",
    total: "$135.00",
    products: "(5 Products)",
    status: "Processing",
  },
  {
    id: "#5046",
    date: "27 Mar, 2021",
    total: "$25.00",
    products: "(1 Product)",
    status: "on the way",
  },
  {
    id: "#5028",
    date: "20 Mar, 2021",
    total: "$250.00",
    products: "(4 Products)",
    status: "Completed",
  },
  {
    id: "#4600",
    date: "19 Mar, 2021",
    total: "$35.00",
    products: "(1 Products)",
    status: "Completed",
  },
  {
    id: "#4152",
    date: "18 Mar, 2021",
    total: "$578.00",
    products: "(13 Products)",
    status: "Completed",
  },
  {
    id: "#4811",
    date: "10 Mar, 2021",
    total: "$345.00",
    products: "(7 Products)",
    status: "Completed",
  },
  {
    id: "#3536",
    date: "5 Mar, 2021",
    total: "$560.00",
    products: "(2 Products)",
    status: "Completed",
  },
  {
    id: "#1374",
    date: "27 Feb, 2021",
    total: "$560.00",
    products: "(2 Products)",
    status: "Completed",
  },
  {
    id: "#7791",
    date: "25 Feb, 2021",
    total: "$560.00",
    products: "(2 Products)",
    status: "Completed",
  },
  {
    id: "#4846",
    date: "24 Feb, 2021",
    total: "$23.00",
    products: "(1 Products)",
    status: "Completed",
  },
  {
    id: "#5948",
    date: "20 Feb, 2021",
    total: "$23.00",
    products: "(1 Products)",
    status: "Completed",
  },
  {
    id: "#1577",
    date: "12 Oct, 2020",
    total: "$23.00",
    products: "(1 Products)",
    status: "Completed",
  },
];

export default function Order() {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const totalPages = Math.ceil(orderHistoryData.length / ordersPerPage);

  const currentOrders = orderHistoryData.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-3 font-medium">{order.id}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">
                    {order.total}
                    <span className="text-gray-500 text-sm ml-2">
                      {order.products}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/history/${order.id.replace("#", "")}`}
                      className="text-green-500 hover:underline text-sm"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 px-4 py-4 border-t">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === idx + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
