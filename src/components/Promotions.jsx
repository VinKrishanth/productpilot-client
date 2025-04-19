import React from "react";

export default function Promotions() {
  const promotions = [
    {
      id: 1,
      title: "Sale of the Month",
      subtitle: "Up to 50% Off",
      description: "Fresh vegetables and fruits at the best prices",
      timer: true,
      imageUrl:
        "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgColor: "bg-blue-600",
    },
    {
      id: 2,
      title: "Low-Fat Meat",
      subtitle: "Starting at $7.99",
      description: "Premium quality meats",
      imageUrl:
        "https://images.unsplash.com/photo-1609950543182-6324c69cb486?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgColor: "bg-gray-900",
    },
    {
      id: 3,
      title: "100% Fresh Fruit",
      subtitle: "up to 30% Off",
      description: "Fresh organic fruits for a healthy lifestyle",
      imageUrl:
        "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      bgColor: "bg-yellow-500",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className={`${promo.bgColor} text-white rounded-lg overflow-hidden relative`}
          >
            <div className="p-6 z-10 relative h-full">
              <div className="mb-4">
                <h3 className="text-xl font-bold">{promo.title}</h3>
                <p className="text-2xl font-bold mt-1">{promo.subtitle}</p>
                <p className="text-sm opacity-90 mt-2">{promo.description}</p>
              </div>

              {promo.timer && (
                <div className="flex space-x-2 my-4">
                  <div className="bg-white bg-opacity-20 rounded p-2 text-center">
                    <span className="block text-lg font-bold">00</span>
                    <span className="text-xs">Days</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded p-2 text-center">
                    <span className="block text-lg font-bold">02</span>
                    <span className="text-xs">Hours</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded p-2 text-center">
                    <span className="block text-lg font-bold">18</span>
                    <span className="text-xs">Mins</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded p-2 text-center">
                    <span className="block text-lg font-bold">46</span>
                    <span className="text-xs">Secs</span>
                  </div>
                </div>
              )}

              <button className="mt-4 bg-white text-gray-900 hover:bg-gray-100">
                Shop Now
              </button>
            </div>

            {/* Background image with overlay */}
            <div
              className="absolute inset-0 bg-center bg-cover bg-opacity-30 mix-blend-overlay"
              style={{
                backgroundImage: `url(${promo.imageUrl})`,
                opacity: 0.3,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
