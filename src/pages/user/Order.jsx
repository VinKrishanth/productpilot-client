import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { LucideEye} from 'lucide-react'

export default function Order() {
  const { userOrders, currency } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const totalPages = Math.ceil(userOrders.length / ordersPerPage);
  const currentOrders = userOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const getStatusStyles = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    switch (status.toLowerCase()) {
      case "completed":
        return `${baseClasses} bg-green-100 text-green-700`;
      case "processing":
        return `${baseClasses} bg-blue-100 text-blue-700`;
      case "on the way":
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Order History</h2>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3 ">Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-6 py-3">Payment Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                currentOrders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {order._id.slice(-7)}
                    </td>
                    <td className="px-4 py-3 text-gray-700 min-w-30">
                      {formatDateTime(order.updatedAt)}
                    </td>
                    <td className="px-4 py-3 text-gray-700  min-w-40">
                      {currency} {order.amount.toFixed(2)}
                      <span className="text-gray-500 text-xs ml-2">
                        {order.items?.length || 0} items
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
                    <td className="px-4 py-3">
                      <span className={getStatusStyles(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right min-w-40">
                      <Link
                        to={`/history/${order._id}`}
                        className="text-green-600 hover:underline text-sm"
                      >
                        <LucideEye className="h-5 w-5 cursor-pointer" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 px-4 py-4 border-t bg-gray-50">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
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
                      : "bg-white hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
