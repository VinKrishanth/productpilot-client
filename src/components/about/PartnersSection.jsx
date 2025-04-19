import React from "react";
import { aboutPartnerFoodPic, aboutPartnerGroupPic, aboutPartnerGroupYPic, aboutPartnerMangoPic, aboutPartnerVectorPic} from '../../assets/images/assets'

const partnerLogos = [
    aboutPartnerFoodPic,
    aboutPartnerGroupPic,
    aboutPartnerGroupYPic,
    aboutPartnerMangoPic,
    aboutPartnerVectorPic
];

export default function PartnersSection() {
  return (
    <section className="py-16 border-t">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partnerLogos.map((logo, index) => (
            <div
              key={index}
              className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <img src={logo} alt={`Partner logo ${index + 1}`} className="h-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
