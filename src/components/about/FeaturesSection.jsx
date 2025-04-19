import React from "react";
import { Leaf, HeadphonesIcon, ShieldCheck, Truck } from "lucide-react";
import { aboutFeaturePic } from "../../assets/images/assets";

// Reusable card component with props
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-organic-50 p-6 rounded-lg flex items-start gap-4 transition-transform hover:-translate-y-1">
    <div className="mt-1 bg-white p-3 rounded-full shadow-sm">
      <Icon className="h-6 w-6 text-organic-500" />
    </div>
    <div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

// Features list for easier maintenance
const features = [
  {
    icon: Leaf,
    title: "100% Organic Food",
    description: "All products certified organic",
  },
  {
    icon: HeadphonesIcon,
    title: "Great Support 24/7",
    description: "Customer service always available",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure Payment",
    description: "Your transactions are secure with us",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all orders over $50",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src={aboutFeaturePic}
            alt="Farmer with fresh produce"
            className="rounded-lg w-full h-auto object-cover shadow-lg"
          />

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
              100% Trusted
              <br />
              Organic Food Store
            </h2>
            <p className="text-gray-600 mb-8">
              Dedicated to delivering organic, farm-to-table food that's not only healthy but delicious. We partner with local farmers who share our commitment to sustainable and ethical farming practices.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <FeatureCard
                  key={idx}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
