"use client"
import React, { Suspense, useEffect, useState } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
import { useTranslations, useLocale } from 'next-intl';
import axios from 'axios';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

const About: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>loading...</div>}>
        <AboutPage />
      </Suspense>
    </CartProvider>
  );
}

const AboutPage = () => {
  const t = useTranslations('aboutPage');
  const locale = useLocale();
  const [aboutUs, setAboutUs] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const getAboutUsAssets = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}about?locale=${locale}&populate=*`);
      setAboutUs(response.data.data);
    } catch (error) {
      console.error("Error fetching Contact data:", error);
      setAboutUs([]);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      await getAboutUsAssets();
      if (isMounted) setLoading(false);
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [locale]);

  useEffect(() => {
    const rectangles: NodeListOf<Element> = document.querySelectorAll(".line-mask");

    const handleScroll = () => {
      // Calculate the scroll percentage for vertical scroll
      const scrollPercentage: number =
        (document.documentElement.scrollTop + window.innerHeight) /
        document.documentElement.scrollHeight;

      rectangles.forEach((rectangle) => {
        // Get the vertical position of the rectangle element
        const rectangleTop: number =
          rectangle.getBoundingClientRect().top + rectangle.clientHeight / 2;

        // Adjust the height calculation to increase sensitivity
        const sensitivity = 200; // Decrease this value to make it more sensitive (faster change)
        const heightPercentage: number =
          100 - Math.min((scrollPercentage - rectangleTop / document.documentElement.scrollHeight) * sensitivity, 100);

        // Apply the new height value, ensuring it doesn't go below 0%
        (rectangle as HTMLElement).style.height = `${Math.max(heightPercentage, 0)}%`;
      });
    };

    // Attach the scroll event listener when the component is mounted
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this runs once on mount


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
          <div id="smooth-content">
            <main>


              <section className={style.about_section}>

                <div className={style["about_banner"]}>
                  <div className="container-fluid my-5" >
                    <div className="row">
                      <div className="col-md-8">
                        <h1 className={style.pageTitle}>
                          {t("heading1")}
                          <br /> {t("heading2")}
                        </h1>
                      </div>
                      <div className="col-md-4">
                        <p className={style["header-secondary-text"]}>
                          {t("para1")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="container-fluid my-4">
                    <div className="row">
                      {aboutUs && aboutUs?.about_banner && aboutUs?.about_banner.length > 0 ? (
                        <div >
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={style["about_video"]}
                          >
                            <source src={aboutUs?.about_banner[0]?.url} type={aboutUs?.about_banner[0]?.mime} />
                            {t("videoError")}
                          </video>
                        </div>
                      ) :
                        (
                          <Error></Error>
                        )}
                    </div>
                  </div>
                </div>

                <div className="my-5">
                  <div className="d-flex flex-row gap-md-5 gap-4 bg-black justify-content-center col-12">
                    <div className={style.about_years}>
                      <h1>
                        10<span>+</span>
                        <br />
                        <p className=''>{t("years")}</p>
                      </h1>
                    </div>
                    <div>
                      <h4 className={`${style.about_years_para} my-md-4 my-3 pt-md-3 pt-0`}>
                        {t("para2")}
                        <br className='d-md-block d-none' />
                        {t("para3")}
                        <br className='d-md-block d-none' />
                        {t("para4")}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* ||||card1 |||||| */}
                <div className={`d-flex flex-md-row flex-column container gap-md-5 gap-3 pb-2`}>
                  <div
                    className={`${style.about_card1} text-black ms-xxl-5 ms-xl-2`}
                    style={{ background: '#9FDEBE', paddingRight: '55px', paddingLeft: '35px' }}
                  >
                    <h2 className="fw-bold text-black">2400 m²</h2>
                    <p>
                      {t("para5")}
                      <br className='d-lg-block d-md-none d-none' />
                      {t("para6")}
                      <br className='d-lg-block d-md-none d-none' />
                      {t("para7")}
                    </p>
                  </div>

                  <div className={`${style.about_card1}`}>
                    <h2 className="fw-bold">8St</h2>
                    <p>
                      {t("para8")}
                      <br className='d-lg-block d-md-none d-none' />
                      {t("para9")}
                      <br className='d-lg-block d-md-none d-none' />
                      {t("para10")}
                    </p>
                  </div>

                  <div className={`${style.about_card1}`}>
                    <h2 className="fw-bold">220m²</h2>
                    <p>
                      {t("para11")}
                      <br className='d-lg-block d-md-none d-none' />
                      {t("para12")}
                    </p>
                  </div>
                </div>

                <div className={`${style.whoVR} container pb-5`}>
                  <div>
                    <h3 className="">{t("heading3")}</h3><br />
                    <div className="">
                      <div className={`line position-relative text-white`}>
                        {aboutUs && aboutUs?.who_we_are && aboutUs?.who_we_are?.description && aboutUs.who_we_are.description.length > 0 ? (
                          aboutUs.who_we_are.description.map((para: any, index: number) => (
                            <div key={index} className={`${style.whoVR_para} pt-3 d-flex flex-row`}>
                              <div className='d-flex flex-column gap-2'>
                                <div className={`${style.para_ball}`}></div>
                                {/* Show the para_line only if it's NOT the last item */}
                                {index !== aboutUs.who_we_are.description.length - 1 && (
                                  <div className={`${style.para_line}`}></div>
                                )}
                              </div>
                              <p className='pb-3'>
                                {para}
                                <br className='d-lg-block d-md-none d-none' />
                              </p>
                            </div>
                          ))
                        ) : (
                          <Error></Error>
                        )}

                        <div className='line-mask d-lg-block d-md-none d-none position-absolute bg-black z-1' style={{ right: '0', width: '100%', bottom: '-10px', opacity: '0.5' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`d-flex flex-lg-row flex-md-column flex-column container mx-auto gap-lg-3 gap-md-3 gap-3 pb-2 col-12`}>
                  {aboutUs && aboutUs?.files_data && aboutUs?.files_data.description && aboutUs?.files_data?.description?.length > 0 ? (
                    aboutUs.files_data.description.map((para: any, index: number) => (
                      <div key={index} className={`${style.about_card2}`}>
                        <h2 className="fw-bold">0{index + 1}</h2> {/* Dynamic numbering */}
                        <p>{para}</p> 
                      </div>
                    ))
                  ) : (
                    <Error /> 
                  )}
                </div>


              </section>

              <LetsTalk />
            </main>
            <FooterOne />
          </div>
        </div>
      </Wrapper>
    );
  }
};

export default About;
