'use client';
import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style.module.css";

// Import Swiper modules
import { Autoplay } from 'swiper/modules';
import blog_img_1 from "../../../public/assets/images/post/01.jpg";
import blog_img_2 from "../../../public/assets/images/post/02.jpg";
import blog_img_3 from "../../../public/assets/images/post/03.jpg";
import blog_img_4 from "../../../public/assets/images/post/04.jpg";
import Image from 'next/image';

const blog_data = [
  {
    id: 1,
    img: blog_img_1,
    title: `496×496 P1.9 Corner`,
    des: `1274`,
  },
  {
    id: 2,
    img: blog_img_2,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 3,
    img: blog_img_3,
    title: `ABSENnicon C Slim Series 138″`,
    des: `3000`,
  },
  {
    id: 4,
    img: blog_img_4,
    title: `ABSENnicon C Slim Series 154`,
    des: `6222`,
  },
];

interface HomeCarouselProps {
  style_2?: boolean;
  style_3?: boolean;
} 

const HomeCarousel: React.FC<HomeCarouselProps> = ({ style_2, style_3 }) => {
  return (
    <>
      <section className={`${styles['home-carousel']} ${styles['bg-light-black2']}`}>

      





        <div className="container-fluid">
       
            <div className="cs_section_heading cs_style_1 cs_type_1">
              <div className="cs_section_heading_text">
                <h4>Displays</h4> 
                <h3>Next-generation displays</h3>
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
                    ></path>
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
            {blog_data.map((item, i) => (

             


              <SwiperSlide key={i} className="swiper-slide">


                






              <div  className={styles['our-screen-box']}>


             
        
        <div className={styles["main_div"]}>  
        <div className={`${styles['box']} ${styles['box--top-bot']}`}>
          <div className={`${styles['box__inner']} ${styles['box--top-bot']}`}>


          <div className="cs_post cs_style_1">

          <Link href="/blog-details" className="cs_post_thumb">
                    <Image src={item.img} alt="image-here" />
                  </Link>

                  <div className="cs_post_info">
                    <h2 className="cs_post_title">
                      <Link href="/blog-details">{item.title}</Link>
                    </h2>
                    <p className="cs_m0">SEK {item.des}</p>

                    <div className={styles['button-section']}>
                        <button>Add to Cart</button>
                        <button>Quick Enquiry</button>
                    </div>

                  </div>
                  </div>

          
            </div>
            </div>

        </div>
        





               
                  
                  
               
                </div>
              </SwiperSlide>


            ))}
          </Swiper>
        </div>
      </section>
      {style_2 ? null : style_3 ? null : <div className="cs_height_150 cs_height_lg_60"></div>}
    </>
  );
};

export default HomeCarousel;