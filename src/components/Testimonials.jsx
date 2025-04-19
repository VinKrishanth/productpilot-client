import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Robert Fox",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Customer",
      rating: 5,
      text: "I've been shopping with Ecobazar for over a year now, and I'm consistently impressed by the quality of their organic products. The vegetables are always fresh and taste amazing!",
    },
    {
      id: 2,
      name: "Dianne Russell",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      role: "Customer",
      rating: 5,
      text: "The customer service at Ecobazar is exceptional. They're always helpful and responsive. I had an issue with an order once, and they resolved it immediately. Highly recommend!",
    },
    {
      id: 3,
      name: "Eleanor Pena",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      role: "Customer",
      rating: 5,
      text: "As someone who prioritizes eating organic, I'm grateful to have found Ecobazar. Their selection is impressive, and the prices are reasonable for the quality you get.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === Math.ceil(testimonials.length / 3) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(testimonials.length / 3) - 1 : prev - 1
    );
  };

  return (
    <div className="bg-gray-100 py-16 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 inline-block relative">
            Client Testimonial
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-green-500 -mb-2"></span>
          </h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-2">
                  <div className="text-gray-400 text-2xl mr-2">❝</div>
                  <div className="text-sm text-gray-500 flex-1">
                    {testimonial.text}
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                  <div className="flex ml-auto">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.45 4.73L5.82 21 12 17.27z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-md hidden md:flex items-center justify-center w-8 h-8"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-md hidden md:flex items-center justify-center w-8 h-8"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(Math.ceil(testimonials.length / 3))].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === i ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
