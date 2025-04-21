import React, { useEffect, useState } from "react";

const promotions = [
  {
    id: 1,
    title: "Sale of the Month",
    subtitle: "Up to 50% Off",
    description: "Fresh vegetables and fruits at the best prices",
    timer: true,
    endTime: new Date().getTime() + 2 * 60 * 60 * 1000 + 18 * 60 * 1000 + 46 * 1000, // 2h 18m 46s from now
    imageUrl:
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bgColor: "bg-blue-600",
  },
  {
    id: 2,
    title: "Low-Fat Meat",
    subtitle: "Starting at $7.99",
    description: "Premium quality meats",
    timer: false,
    imageUrl:
      "https://images.unsplash.com/photo-1609950543182-6324c69cb486?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bgColor: "bg-gray-900",
  },
  {
    id: 3,
    title: "100% Fresh Fruit",
    subtitle: "Up to 30% Off",
    description: "Fresh organic fruits for a healthy lifestyle",
    timer: false,
    imageUrl:
      "https://images.unsplash.com/photo-1577234286642-fc512a5f8f11?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bgColor: "bg-yellow-500",
  },
];

const getTimeRemaining = (endTime) => {
  const total = endTime - new Date().getTime();
  const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
  const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
  const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0);
  const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);

  return { days, hours, minutes, seconds };
};

export default function Promotions() {
  const [timers, setTimers] = useState(
    promotions.reduce((acc, promo) => {
      if (promo.timer) acc[promo.id] = getTimeRemaining(promo.endTime);
      return acc;
    }, {})
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const updated = { ...prev };
        for (const promo of promotions) {
          if (promo.timer) {
            updated[promo.id] = getTimeRemaining(promo.endTime);
          }
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container mx-auto px-4 md:px-0 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className={`relative rounded-lg overflow-hidden text-white ${promo.bgColor}`}
          >
            {/* Overlay image */}
            <div
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30"
              style={{ backgroundImage: `url(${promo.imageUrl})` }}
            ></div>

            <div className="relative z-10 p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">{promo.title}</h3>
                <p className="text-2xl font-bold mt-1">{promo.subtitle}</p>
                <p className="text-sm mt-2 opacity-90">{promo.description}</p>
              </div>

              {promo.timer && (
                <div className="flex space-x-2 my-4 text-black">
                  {[
                    { label: "Days", value: timers[promo.id]?.days || "00" },
                    { label: "Hours", value: timers[promo.id]?.hours || "00" },
                    { label: "Mins", value: timers[promo.id]?.minutes || "00" },
                    { label: "Secs", value: timers[promo.id]?.seconds || "00" },
                  ].map(({ label, value }, i) => (
                    <div
                      key={i}
                      className="bg-white bg-opacity-20 rounded p-2 text-center"
                    >
                      <span className="block text-lg font-bold">
                        {String(value).padStart(2, "0")}
                      </span>
                      <span className="text-xs">{label}</span>
                    </div>
                  ))}
                </div>
              )}

              <button className="mt-4 bg-[#059473] hover:bg-[#046c53] text-white font-medium text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition duration-300 w-40 cursor-pointer ">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
