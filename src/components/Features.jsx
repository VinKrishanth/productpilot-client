import { Truck, Headphones, ShieldCheck, ArrowUpDown } from "lucide-react";
import React from "react";

export default function Features() {
  const features = [
    {
      icon: <Truck className="h-6 w-6 text-green-600" />,
      title: "Free Shipping",
      description: "Free shipping on all your orders",
    },
    {
      icon: <Headphones className="h-6 w-6 text-green-600" />,
      title: "Customer Support 24/7",
      description: "Instant access to support",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-green-600" />,
      title: "100% Secure Payment",
      description: "We ensure secure payment",
    },
    {
      icon: <ArrowUpDown className="h-6 w-6 text-green-600" />,
      title: "Money-Back Guarantee",
      description: "30 days money-back guarantee",
    },
  ];

  return (
    <section
      id="features"
      className="py-12 sm:mr-0 mr-8 bg-white overflow-y-hidden"
    >
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105 min-w-72"
            >
              <div className="mr-4 bg-green-50 p-3 rounded-full">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
