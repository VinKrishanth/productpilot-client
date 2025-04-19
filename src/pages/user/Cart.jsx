import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, CheckCircle, Circle, Truck } from "lucide-react";

const orderDetails = {
  id: "#4152",
  date: "April 24, 2021",
  products: 3,
  status: "Processing",
  billing: {
    name: "Dainne Russell",
    address: "4140 Parker Rd, Allentown, New Mexico 31134",
    email: "dainne.russell@gmail.com",
    phone: "(671) 555-0110",
  },
  shipping: {
    name: "Dainne Russell",
    address: "4140 Parker Rd, Allentown, New Mexico 31134",
    email: "dainne.russell@gmail.com",
    phone: "(671) 555-0110",
  },
  payment: {
    method: "Paypal",
    subtotal: "$365.00",
    discount: "20%",
    shipping: "Free",
    total: "$84.00",
  },
  items: [
    {
      id: 1,
      name: "Red Capsicum",
      price: "$14.00",
      quantity: "x5",
      subtotal: "$70.00",
      image: "/public/lovable-uploads/26a16c56-86ef-4817-8667-c662e2bc8489.png",
    },
    {
      id: 2,
      name: "Green Capsicum",
      price: "$14.00",
      quantity: "x2",
      subtotal: "$28.00",
      image: "/public/lovable-uploads/26a16c56-86ef-4817-8667-c662e2bc8489.png",
    },
    {
      id: 3,
      name: "Green Chili",
      price: "$26.70",
      quantity: "x10",
      subtotal: "$267.00",
      image: "/public/lovable-uploads/26a16c56-86ef-4817-8667-c662e2bc8489.png",
    },
  ],
};

const statusSteps = [
  { id: 1, label: "Order received", icon: Check, status: "completed" },
  { id: 2, label: "Processing", icon: CheckCircle, status: "current" },
  { id: 3, label: "On the way", icon: Truck, status: "upcoming" },
  { id: 4, label: "Delivered", icon: Circle, status: "upcoming" },
];

export default function Cart() {
  const { id } = useParams();
  const [order] = useState(orderDetails);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">
            Order Details • {order.date} • {order.products} Products
          </h1>
          <Link to="/history" className="flex items-center text-green-500">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Link>
        </div>

        {/* Billing & Shipping */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {/* Billing */}
          <div>
            <div className="text-sm uppercase font-semibold text-gray-600">Billing Address</div>
            <div className="pt-4">
              <p className="font-medium">{order.billing.name}</p>
              <p className="text-gray-600 mb-4">{order.billing.address}</p>
              <div className="text-sm text-gray-600 mb-1">
                <span className="uppercase font-semibold block mb-1">Email</span>
                <span>{order.billing.email}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="uppercase font-semibold block mb-1">Phone</span>
                <span>{order.billing.phone}</span>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div>
            <div className="text-sm uppercase font-semibold text-gray-600">Shipping Address</div>
            <div className="pt-4">
              <p className="font-medium">{order.shipping.name}</p>
              <p className="text-gray-600 mb-4">{order.shipping.address}</p>
              <div className="text-sm text-gray-600 mb-1">
                <span className="uppercase font-semibold block mb-1">Email</span>
                <span>{order.shipping.email}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="uppercase font-semibold block mb-1">Phone</span>
                <span>{order.shipping.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order & Payment Info */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div>
            <div className="text-sm uppercase font-semibold text-gray-600">Order ID</div>
            <div className="pt-4">
              <p className="font-medium">{order.id}</p>
            </div>
          </div>
          <div>
            <div className="text-sm uppercase font-semibold text-gray-600">Payment Method</div>
            <div className="pt-4">
              <p className="font-medium">{order.payment.method}</p>
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Subtotal</p>
                  <p className="font-medium">{order.payment.subtotal}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Discount</p>
                  <p className="font-medium">{order.payment.discount}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Shipping</p>
                  <p className="font-medium">{order.payment.shipping}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Total</p>
                  <p className="font-medium text-green-600">{order.payment.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Progress */}
        <div className="mb-10 overflow-x-auto">
          <div className="relative flex items-center justify-between w-[800px] sm:w-full min-w-max">
            {statusSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative z-10 min-w-[100px]">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    step.status === "completed"
                      ? "bg-green-500 text-white"
                      : step.status === "current"
                      ? "border-4 border-green-500 bg-white"
                      : "border-4 border-dashed border-gray-300 bg-white"
                  }`}
                >
                  <step.icon
                    className={`h-5 w-5 ${
                      step.status === "completed"
                        ? "text-white"
                        : step.status === "current"
                        ? "text-green-500"
                        : "text-gray-300"
                    }`}
                  />
                </div>
                <span className="text-sm mt-2 font-medium text-center">{step.label}</span>

                {/* Connection line */}
                {index < statusSteps.length - 1 && (
                  <div
                    className={`absolute top-5 left-10 h-0.5 w-full 
                    ${
                      index === 0
                        ? "bg-green-500"
                        : index === 1
                        ? "bg-green-500 bg-gradient-to-r from-green-500 to-gray-300"
                        : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Items Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-xs uppercase font-semibold text-left p-4">Product</th>
                <th className="text-xs uppercase font-semibold text-right p-4">Price</th>
                <th className="text-xs uppercase font-semibold text-right p-4">Quantity</th>
                <th className="text-xs uppercase font-semibold text-right p-4">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-3 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="font-medium">{item.name}</p>
                    </div>
                  </td>
                  <td className="p-4 text-right">{item.price}</td>
                  <td className="p-4 text-right">{item.quantity}</td>
                  <td className="p-4 text-right font-medium">{item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
