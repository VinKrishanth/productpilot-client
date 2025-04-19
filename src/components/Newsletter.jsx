import React from "react";

export default function Newsletter() {
  return (
    <section className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Text Section */}
          <div className="text-center md:text-left md:w-1/2">
            <h3 className="text-2xl font-semibold text-gray-900">
              Subscribe to our Newsletter
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Get daily updates and special offers straight to your inbox
            </p>
          </div>

          {/* Input Section */}
          <div className="w-full md:w-auto max-w-xl">
            <form className="flex flex-col sm:flex-row gap-3 items-stretch">
              <input
                type="email"
                placeholder="Your Email Address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-md transition duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
