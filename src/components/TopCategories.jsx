import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from '../assets/images/assets';
import { useRef } from "react";

export default function TopCategories() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-0">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 inline-block relative">
          Top Category
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-green-500 -mb-2"></span>
        </h2>
      </div>

      <div className="relative sm:px-20">
        <div
          ref={scrollRef}
          className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto scrollbar-hide"
        >
          {categories.map(category => (
            <div key={category.name} className="group cursor-pointer flex-shrink-0">
              <div className="rounded-lg border border-gray-200 p-4 flex flex-col items-center transition-all hover:border-green-500  w-40">
                <div className="w-20 h-20 mb-4">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900 text-center group-hover:text-green-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={scrollLeft}
          className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-md block sm:hidden"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-md block sm:hidden"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
