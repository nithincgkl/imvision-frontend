'use client'
import React, { Suspense } from 'react';
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
      <Suspense fallback={<div>loading...</div>}>
        <Index />
      </Suspense>
    </CartProvider>
  );
};



const Index: React.FC = () => {


  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content" className="smooth-content">
          <main>
            <BannerVideo />
            <Displays />
            <HomeCarousel />
            <WowMoments />
            <HomeExperience />
            {/* <ScreenSizes /> */}
            <LetsTalk />
            <FooterOne />

          </main>
        </div>
      </div>

    </Wrapper>
  );
};

export default Home;
