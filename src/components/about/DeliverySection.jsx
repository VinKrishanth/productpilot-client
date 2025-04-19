import { Check } from "lucide-react";
import { aboutDeliveryPic } from "../../assets/images/assets";

const deliveryPoints = [
  "Fresh delivery within 24 hours of harvest",
  "Carefully packaged to maintain freshness",
  "Eco-friendly, recyclable packaging",
];

export default function DeliverySection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
            We Delivered,
            <br />
            You Enjoy Your Order.
          </h2>
          <p className="text-gray-600 mb-8">
            We handle everything from farm selection to doorstep delivery. Our careful packaging ensures your produce arrives fresh and ready to enjoy. Experience the convenience of farm-fresh food delivered right to your door.
          </p>

          <ul className="space-y-4 mb-8">
            {deliveryPoints.map((point, idx) => (
              <li key={idx} className="flex items-center text-gray-700">
                <Check className="text-organic-500 mr-2 h-5 w-5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base font-semibold rounded-full px-6 py-2 transition duration-200">
            Shop Now
          </button>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="absolute w-64 h-64 bg-organic-100 rounded-full -z-10 -bottom-10 -left-10"></div>
          <img
            src={aboutDeliveryPic}
            alt="Delivery person with groceries"
            className="rounded-lg w-full h-auto object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
