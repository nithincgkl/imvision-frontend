'use client'
import React, { Suspense, useEffect ,useState} from 'react';
import HeaderOne from '@/layouts/headers/HeaderOne';
import Wrapper from '@/layouts/wrapper';
import BannerVideo from '@/components/home/banner-video';
import HomeExperience from '@/components/home/home-experience';
import Displays from '@/components/home/displays';
import WowMoments from '@/components/home/wow-moments';
import LetsTalk from '@/components/home/lets-talk';
import FooterOne from '@/layouts/footers/FooterOne';
import { CartProvider } from '@/context/cart-context'; // Import the useCart hook
import axios from 'axios';
import { useLocale } from 'next-intl';
import Loader from '@/components/common/Loader';
import WhatWeDoSection from '@/components/home/what-we-do';

const Home: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>loading...</div>}>
        <Index />
      </Suspense>
    </CartProvider>
  );
};
interface EventCategory {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
}
const Index: React.FC = () => {
  const locale = useLocale();
  const [homeData, setHomeData] = useState([])
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState(true); // Initially true to show loader

  const getHomeAssets = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}home?locale=${locale}&populate=*`);
      setHomeData(response.data);
    } catch (error) {
      console.error("Error fetching home data:", error);
      setHomeData([]); // Ensure homeData is an empty array if API fails
    }
  };

  const fetchEventCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}event-categories?locale=${locale}&populate=*`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
        },
      });

      const data = response.data.data.map((item: any) => {
        const thumbnailUrl = item.thumbnail.url.startsWith('http')
          ? item.thumbnail.url
          : `${process.env.NEXT_PUBLIC_IMAGE_URL}${item.thumbnail.url}`;

        return {
          id: item.id,
          title: item.title,
          description: item.description,
          thumbnailUrl,
        };
      });

      console.log("Fetched Categories:", data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching event categories:", error);
      setCategories([]); // Ensure categories is empty if API fails
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loader before fetching

      await Promise.all([getHomeAssets(), fetchEventCategories()]);

      setLoading(false); // Stop loader once all APIs complete
    };

    fetchData();
  }, []);


  if (loading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}
      >
        <Loader size={300} />
      </div>
    );
  }
  else {
    return (
      <Wrapper>
        <HeaderOne />
        <div id="smooth-wrapper">
          <div id="smooth-content" className="smooth-content">
            <main>
              <BannerVideo homeData={homeData} />
              <WhatWeDoSection data={homeData} />
              {/* <Displays homeData={homeData}/> */}
              {/* <HomeCarousel /> */}
              <WowMoments categories={categories}/>
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
}

export default Home;
