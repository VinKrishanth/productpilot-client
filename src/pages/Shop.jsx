import React from "react";
import SaleTimer from "../components/shop/SaleTimer";
import ProductGrid from "../components/shop/ProductGrid";

export default function Shop() {
  const saleEndDate = new Date();
  saleEndDate.setDate(saleEndDate.getDate() + 7);

  return (
    <section className=" mx-auto px-4 py-8">
      <div className="relative bg-slate-800 rounded-lg overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
          alt="Fresh vegetables"
          className="absolute inset-0 w-full h-full object-cover opacity-75 z-0"
        />

        {/* Content Overlay */}
        <div className="relative z-10 p-8 md:p-16 max-w-2xl flex flex-col items-start text-white">
          <span className="bg-black/50 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
            BEST DEALS
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Sale of the Month
          </h2>

          <div className="mb-4">
            <SaleTimer endDate={saleEndDate} />
          </div>

          <button className="bg-[#059473] hover:bg-[#046c53] text-white font-medium text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition duration-300 w-full sm:w-auto">
            Shop Now
          </button>

          {/* Discount Badge */}
          <div className="absolute top-8 right-8 md:right-16 bg-[#ff6316] text-white w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold shadow-lg">
            <div className="text-xl">56%</div>
            <div className="text-xs">OFF</div>
          </div>
        </div>
      </div>
      <ProductGrid />
    </section>
  );
}
