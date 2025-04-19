import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import FeaturedProducts from '../components/FeaturedProducts';
import TopCategories from '../components/TopCategories';
import Promotions from '../components/Promotions';
import NewestProducts from '../components/NewestProducts';
import Testimonials from '../components/Testimonials';

export default function Home() {
  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className='w-full'>
      <Hero />
      <Features />
      <TopCategories />
      <FeaturedProducts addToCart={addToCart} />
      <Promotions />
      <NewestProducts addToCart={addToCart} />
      <Testimonials />
    </div>
  )
}
