import React from 'react'
import HeroSection from '../components/about/HeroSection'
import FeaturesSection from '../components/about/FeaturesSection'
import DeliverySection from '../components/about/DeliverySection'
import TestimonialsSection from '../components/about/TestimonialsSection'
import TeamSection from '../components/about/TeamSection'

export default function About() {
  return (
    <div>
        <HeroSection />
        <FeaturesSection />
        <DeliverySection />
        <TeamSection />
        <TestimonialsSection />
    </div>
  )
}
