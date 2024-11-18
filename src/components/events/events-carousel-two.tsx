'use client';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style.module.css";
 
// Import Swiper modules
import { Autoplay } from 'swiper/modules';
import event_two_1 from "../../../public/assets/images/recent-events/01.jpg";
import event_two_2 from "../../../public/assets/images/recent-events/02.jpg";
import event_two_3 from "../../../public/assets/images/recent-events/03.jpg";
import event_two_4 from "../../../public/assets/images/recent-events/02.jpg";
import Image from 'next/image';

const event_two_data = [
  {
    id: 1,
    img: event_two_1,
    title: `Transform Your Dealership`,
    des: `Showcase vehicle design and performance in stunning visual clarity and scale that compels customers to get behind the wheel today.`,
  },
  {
    id: 2,
    img: event_two_2,
    title: `Rev Up Your Events`,
    des: `Elevate your car dealership's visibility with our stunning LED screens.
Rent cutting-edge displays that capture attention and drive sales.
Transform your showroom into a modern retail experience.

`,
  },
  {
    id: 3,
    img: event_two_3,
    title: `Automotive`,
    des: `Rev up your automotive events with vibrant LED screens.
Our rentals deliver crystal-clear visuals, engaging audiences and amplifying your brand.
`,
  },
  {
    id: 4,
    img: event_two_4,
    title: `Transform Your Dealership`,
    des: `Rev up your automotive events with vibrant LED screens.
Our rentals deliver crystal-clear visuals, engaging audiences and amplifying your brand.
`,
  },
];

interface HomeCarouselProps {
  style_2?: boolean;
  style_3?: boolean;
}

const EventsCarouselTwo: React.FC<HomeCarouselProps> = ({ style_2, style_3 }) => {
  return (
    <>
      <section className={`${styles['home-carousel']} bg-light-black`}>
        <div className="container-fluid">
        
            <div className="cs_section_heading cs_style_1 cs_type_1  m-same-line">
              <div className="cs_section_heading_text">
                
                <h3>Recent Events</h3>
              </div>
              <div className="cs_section_heading_right cs_btn_anim">
                <Link href="/blog" className="cs_btn cs_style_1">
                  <span>View Store</span>
                  <svg
                    width="19"
                    height="13"
                    viewBox="0 0 19 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5303 7.03033C18.8232 6.73744 18.8232 6.26256 18.5303 5.96967L13.7574 1.1967C13.4645 0.903806 12.9896 0.903806 12.6967 1.1967C12.4038 1.48959 12.4038 1.96447 12.6967 2.25736L16.9393 6.5L12.6967 10.7426C12.4038 11.0355 12.4038 11.5104 12.6967 11.8033C12.9896 12.0962 13.4645 12.0962 13.7574 11.8033L18.5303 7.03033ZM0 7.25H18V5.75H0V7.25Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </div>
            </div>
       
          
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={1000}
            spaceBetween={30}
            slidesPerView="auto"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              el: ".cs_pagination",
              clickable: true,
            }}
            className={`cs_slider pt-5 cs_slider_3 anim_blog ${style_2 ? '' : 'style_slider'}`}
          >
            {event_two_data.map((item, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <div className={styles['our-screen-box']}>
                  <div className="cs_post cs_style_1">
                    <Link href="/event-details" className="cs_post_thumb">
                      <Image src={item.img} alt="image-here" />
                    </Link>
                    <div className="cs_post_info">
                      <h2 className="cs_post_title">
                        <Link href="/event-details">{item.title}</Link>
                      </h2>
                      <p className="cs_m0">SEK {item.des}</p>
                      <div className={styles['button-section']}>
                        <button>Add to Cart</button>
                        <button>Quick Enquiry</button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {style_2 ? null : style_3 ? null : <div className="cs_height_150 cs_height_lg_60" />}
    </>
  );
};

export default EventsCarouselTwo;