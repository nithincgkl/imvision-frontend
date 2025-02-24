'use client'

import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import { CartProvider } from "@/context/cart-context";
import axios from "axios";
import { useLocale } from 'next-intl';
import Loader from "@/components/common/Loader";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import FooterOne from "@/layouts/footers/FooterOne";

const Industry: React.FC = () => {
  return (
    <CartProvider>
      <IndustryPage />
    </CartProvider>
  );
};

const IndustryPage = () => {
  const [images, setImagesData] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const swiperRef = useRef<any>(null);

  // Fetch industry assets and images from API
  const getIndustryAssets = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}industry?locale=${locale}&populate=*`
      );

      const fetchedPageData = response.data.data.content.data;
      const fetchedImages = response.data.data.images;

      setPageData(fetchedPageData);
      setImagesData(fetchedImages);
    } catch (error) {
      console.error("Error fetching industry data:", error);
      setPageData([]);
      setImagesData([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getIndustryAssets();
      setLoading(false);
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

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className={`${styles["pageContainer"]} min-h-screen py-10`}>
            <section className={`${styles["home-wow"]} ${styles["bg-light-black-2"]}`}>
              <div className="container-fluid">

                {/* Page Header */}
                <div className="col-12 text-center">
                  <h1 className={styles["contact_heading"]}>{pageData?.page_heading || "Industry"}</h1>
                  <p className={styles["contact_paragraph"]}>{pageData?.page_description || "Description not available."}</p>
                </div>

                {/* Industry Cards */}
                <div className="row">
                  {pageData?.industries?.map((category: any, index: number) => {
                    const isLastAlone = pageData.industries.length % 2 !== 0 && index === pageData.industries.length - 1;
                    return (
                      <div key={index} className={`${isLastAlone ? "col-12" : "col-md-6"} d-flex`}>
                        <div className={`${styles["wow-box"]} w-100`}>
                          <h4>{category.heading}</h4>
                          <ul>
                            {category.description.map((point: string, i: number) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Page Footer */}
                <div className="col-12 text-center mt-4">
                  <p className={styles["contact_paragraph"]}>{pageData.page_footer_description}</p>
                </div>
                {/* Image Carousel */}
                <div className={styles["carouselContainer"]}>
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    loop={true}
                    speed={1000}
                    spaceBetween={20} // Adds spacing between images
                    slidesPerView={3} // Default for large screens
                    breakpoints={{
                      1024: { slidesPerView: 3 }, // Desktop
                      768: { slidesPerView: 2 },  // Tablet
                      480: { slidesPerView: 1 },  // Mobile
                      0: { slidesPerView: 1 },    // Below 480px (Ensures 1 slide)
                    }}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    pagination={{
                      el: ".swiper-pagination",
                      clickable: true,
                    }}
                  >

                    {images.map((image, index) => (
                      <SwiperSlide key={index} className="swiper-slide">
                        <div className={styles["carouselItem"]}>
                          <Image
                            src={image.url}
                            alt={image.title}
                            width={400}
                            height={250}
                            layout="intrinsic"
                            objectFit="cover"
                            className={styles["carouselImage"]}
                            onClick={() => window.open(image.url, "_blank")}
                            loading="lazy"
                          />
                        </div>
                      </SwiperSlide>
                    ))}

                    {/* Navigation Arrows */}
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>

                    {/* Pagination Dots */}
                    <div className="swiper-pagination"></div>
                  </Swiper>


                </div>
                <div className="col-md-12 text-center">
                  <div className={styles['lets-talk']}>
                    <div>
                      <img
                        src="/assets/images/dot-bg.png"
                        className="w-100"
                        alt=""
                      />
                      <div className={styles['lets-talk-text']}>
                      <h2>{pageData.footer_heading}
                        </h2>
                        <p>{pageData.footer_description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <FooterOne />
            </section>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Industry;
