import React from "react";
import { useAppContext } from "../context/AppContext";

export default function Hero() {
  const { navigate } = useAppContext();
  return (
    <section className="relative bg-gray-100 py-12  sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Left: Text Content */}
          <div className="md:w-1/2 z-10 text-center md:text-left">
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                Welcome to Ecobazar
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-gray-900 leading-tight">
              Fresh & Healthy <br />
              Organic Food
            </h1>
            <div className="mb-6">
              <p className="text-lg text-gray-700">
                Sale up to{" "}
                <span className="text-orange-500 font-bold">30% OFF</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Free shipping on all your orders. We deliver, you enjoy.
              </p>
            </div>
            <button onClick={()=>{navigate('/shop')}} className="mt-4 bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base font-semibold rounded-full px-6 py-2 transition duration-200">
              Shop Now <span className="ml-2">→</span>
            </button>
          </div>

          {/* Right: Hero Image */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?q=80&w=3540&auto=format&fit=crop"
              alt="Fresh Organic Food"
              className="w-full max-w-md md:max-w-lg rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Slider indicators */}
        <div className="flex justify-center mt-10 space-x-2">
          <div className="h-2 w-8 bg-green-500 rounded-full"></div>
          <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
          <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
