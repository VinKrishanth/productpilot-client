import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { aboutCustomerPic1, aboutCustomerPic2,aboutCustomerPic3  } from '../../assets/images/assets'

const testimonials = [
  {
    id: 1,
    name: "Robert Fox",
    avatar: aboutCustomerPic1,
    rating: 5,
    quote:
      "Fantastic service and amazing produce! I've been ordering for 6 months now. Their organic vegetables are always fresh and taste so much better than store-bought ones.",
  },
  {
    id: 2,
    name: "Dianne Russell",
    avatar: aboutCustomerPic2,
    rating: 5,
    quote:
      "I'm impressed with the quality and variety of organic products they offer. Their delivery is always on time, and the packaging is eco-friendly, which I really appreciate.",
  },
  {
    id: 3,
    name: "Eleanor Pena",
    avatar: aboutCustomerPic3,
    rating: 5,
    quote:
      "The best organic food delivery service I've tried! Everything arrives fresh, and their customer service is excellent. I love that I can support local farmers too.",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerView = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerView);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const visibleTestimonials = testimonials.slice(
    activeIndex * itemsPerView,
    (activeIndex + 1) * itemsPerView
  );

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Client Testimonial</h2>
          {testimonials.length > itemsPerView && (
            <div className="flex gap-4">
              <button
                variant="outline"
                size="icon"
                className="rounded-full border-organic-500 text-organic-500"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                variant="outline"
                size="icon"
                className="rounded-full bg-organic-500 text-white border-organic-500 hover:bg-organic-600"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="mb-4 text-organic-500">
                <span className="text-4xl leading-none">"</span>
              </div>
              <p className="text-gray-600 mb-6">{testimonial.quote}</p>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <div key={i} className="text-yellow-400">
                    ★
                  </div>
                ))}
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
