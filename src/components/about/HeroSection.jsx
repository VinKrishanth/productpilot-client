import { aboutHeroPic } from '../../assets/images/assets.js';

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">
            100% Trusted<br />Organic Food Store
          </h1>
          <p className="text-muted mb-8 max-w-lg">
            Fresh produce delivered straight from local farms to your table. Our organic food is grown without harmful pesticides, ensuring you get the best quality products for your health and wellness.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base font-semibold rounded-full px-6 py-2 transition duration-200">
              Shop Now
            </button>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base font-semibold rounded-full px-6 py-2 transition duration-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative animate-fade-in">
          <div className="absolute w-64 h-64 bg-organic-100 rounded-full -z-10 -top-10 -right-10"></div>
          <img
            src={aboutHeroPic}
            alt="Happy farmer with freshly harvested produce"
            className="rounded-lg w-full h-auto object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
