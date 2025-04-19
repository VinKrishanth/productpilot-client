import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { aboutTeamPic1, aboutTeamPic2, aboutTeamPic3, aboutTeamPic4} from '../../assets/images/assets'

const teamMembers = [
  {
    id: 1,
    name: "Jeremy Wilson",
    role: "Chief Farmer",
    image: aboutTeamPic1
  },
  {
    id: 2,
    name: "Jane Cooper",
    role: "Organic Specialist",
    image: aboutTeamPic2
  },
  {
    id: 3,
    name: "Colby Fisher",
    role: "Head of Operations",
    image: aboutTeamPic3
  },
  {
    id: 4,
    name: "Robert Fox",
    role: "Quality Controller",
    image: aboutTeamPic4
  },
];

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerView = 4;
  const totalPages = Math.ceil(teamMembers.length / itemsPerView);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const visibleMembers = teamMembers.slice(
    activeIndex * itemsPerView,
    (activeIndex + 1) * itemsPerView
  );

  return (
    <section id="team" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Awesome Team
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Meet our dedicated team of farmers and specialists who work hard to
            bring the freshest organic produce to your table.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {visibleMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-[-5px]"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-organic-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-4">
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
                className="rounded-full border-organic-500 text-organic-500"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
