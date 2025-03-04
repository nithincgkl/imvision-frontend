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
  const [homeData, setHomeData] = useState<any>([])
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [footer, setFooter] = useState<any>([])
  const [letsTalk, setLetsTalk] = useState<any>([])
  const [navigation,setNavigation] = useState<any>([])
  const [loading, setLoading] = useState(true); // Initially true to show loader

  const getHomeAssets = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}home?locale=${locale}&populate=*`);
      setHomeData(response.data);
    } catch (error) {
      console.error("Error fetching home data:", error);
      setHomeData([]);
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
  const fetchLetsTalk = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}let-us-talk?locale=${locale}&populate=*`);
      setLetsTalk(response.data);
    } catch (error) {
      console.error("Error fetching Let's Talk data:", error);
      setLetsTalk([]);
    }
  };
  const fetchNavigation = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}navigation?locale=${locale}&populate=*`);
      setNavigation(response.data);
    } catch (error) {
      console.error("Error fetching navigation data:", error);
      setNavigation([]);
    }
  };
  const fetchFooter = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}footer?locale=${locale}&populate=*`);
      setFooter(response.data);
    } catch (error) {
      console.error("Error fetching footer data:", error);
      setFooter([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loader before fetching

      await Promise.all([getHomeAssets(), fetchEventCategories(),fetchLetsTalk(),fetchNavigation(),fetchFooter()]);

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
        <Loader size={150} />
      </div>
    );
  }
  else {
    return (
      <Wrapper>
        <HeaderOne data={navigation.data} />
        <div id="smooth-wrapper">
          <div id="smooth-content" className="smooth-content">
            <main>
              <BannerVideo homeData={homeData.data.content} video={homeData.data.banner_home}  />
              <WhatWeDoSection data={homeData.data.content} assets={homeData.data.what_we_do_assets} />
              {/* <Displays homeData={homeData}/> */}
              {/* <HomeCarousel /> */}
              <WowMoments categories={categories} data={homeData.data.content} />
              <HomeExperience data={homeData.data.content} assets={homeData.data.experience_assets} />
              {/* <ScreenSizes /> */}
              <LetsTalk data={letsTalk.data} />
              <FooterOne data={footer.data} />

            </main>
          </div>
        </div>

      </Wrapper>
    );
  };
}

export default Home;
