'use client'
import React from 'react';
import HeaderOne from '@/layouts/headers/HeaderOne';
import Wrapper from '@/layouts/wrapper';
import BannerVideo from '@/components/home/banner-video';
import HomeExperience from '@/components/home/home-experience';
import ScreenSizes from '@/components/home/screen-szes';
import HomeCarousel from '@/components/home/home-carousel';
import Displays from '@/components/home/displays';
import WowMoments from '@/components/home/wow-moments';
import LetsTalk from '@/components/home/lets-talk';
import FooterOne from '@/layouts/footers/FooterOne';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook

const Home: React.FC = () => {
  return (
    <CartProvider>
      <Index />
    </CartProvider>
  );
};



const Index: React.FC = () => {

  const { cartItems, removeFromCart, updateCartItemCount } = useCart();
const handleIncrease = (id: number) => {
  const currentItem = cartItems.find(item => item.id === id);
  if (currentItem) {
    updateCartItemCount(id, currentItem.count + 1);
  }
};

const handleDecrease = (id: number) => {
  const currentItem = cartItems.find(item => item.id === id);
  if (currentItem) {
    const newCount = currentItem.count - 1;
    if (newCount > 0) {
      updateCartItemCount(id, newCount);
    } else {
      removeFromCart(id);
    }
  }
};

const handleRemoveItem = (id: number) => {
  removeFromCart(id);
};

  return (
    <Wrapper> 
      <HeaderOne /> 
      <div id="smooth-wrapper">
        <div id="smooth-content" className="smooth-content">
          <main>
            <BannerVideo />
            <HomeExperience />
            <Displays />
            {/* <ScreenSizes /> */}
            <HomeCarousel />
            <WowMoments />
            <LetsTalk />
            <FooterOne />
            
          </main>
        </div>
      </div>
      
    </Wrapper>
  );
};

export default Home;
