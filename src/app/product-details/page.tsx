"use client"
import React, { useState, useEffect } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import rent_1 from "../../../public/assets/images/post/01.jpg";
import rent_2 from "../../../public/assets/images/post/02.jpg";
import rent_3 from "../../../public/assets/images/post/03.jpg";
import rent_4 from "../../../public/assets/images/post/04.jpg";
import rent_5 from "../../../public/assets/images/post/01.jpg";
import rent_6 from "../../../public/assets/images/post/02.jpg";
import rent_7 from "../../../public/assets/images/post/03.jpg";
import rent_8 from "../../../public/assets/images/post/04.jpg";
import rent_9 from "../../../public/assets/images/post/01.jpg";
import rent_10 from "../../../public/assets/images/post/02.jpg";
import rent_11 from "../../../public/assets/images/post/03.jpg";
import rent_12 from "../../../public/assets/images/post/04.jpg";
import ProductItem from "@/components/product-item/product-item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import LetsTalk from '@/components/home/lets-talk';
import { HiOutlineShoppingBag } from "react-icons/hi2";

const blog_data = [
  {
    id: 1,
    img: rent_1,
    title: `496×496 P1.9 Corner`,
    des: `1274`,
  },
  {
    id: 2,
    img: rent_2,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 3,
    img: rent_3,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 4,
    img: rent_4,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 5,
    img: rent_5,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 6,
    img: rent_6,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 7,
    img: rent_7,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 8,
    img: rent_8,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 9,
    img: rent_9,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 10,
    img: rent_10,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 11,
    img: rent_11,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  {
    id: 12,
    img: rent_12,
    title: `ABSENnicon C Slim Series 110″`,
    des: `15000`,
  },
  
];



export default function ProductDetail() {
  const [count, setCount] = useState(0); // Initialize count as 0

  const handleIncrease = () => {
    setCount(count + 1); // Increment count by 1
  };

  const handleDecrease = () => {
    setCount(count - 1); // Decrement count by 1
  };
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
      '/assets/images/career-01.jpg',
      '/assets/images/career-02.jpg',
      '/assets/images/career-03.jpg',
      '/assets/images/career-01.jpg',
      '/assets/images/career-02.jpg',
      '/assets/images/career-03.jpg',
  ];

  const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
      setCurrentIndex(index);
  };

  return (
    <Wrapper>
    <HeaderOne />
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main>
            <section className={style["product_detail_section"]}>
                <div className='container-fluid my-5'>
                    <div className='d-flex flex-md-row flex-column'>
                    <div className='col-lg-7 col-md-7 col-12'>
                    <div className={style["carousel_container"]}>
                        <div className='d-flex flex-row'>
                        <button onClick={handlePrevious} className={`${style.arrow}`}>❮</button>
                          <div className={`${style.carousel_image}`}>
                              <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
                          </div>
                        <button onClick={handleNext}  className={`${style.arrow}`}>❯</button>
                      </div>
                      <div className={`${style.carousel_dots}`}>
                          {images.map((_, index) => (
                              <span
                                  key={index}
                                  className={`dot ${currentIndex === index ? 'active' : ''}`}
                                  onClick={() => handleDotClick(index)}
                                  style={{
                                    display: 'inline-block',
                                    width: currentIndex === index ? '10.5px' : '10px',
                                    height: currentIndex === index ? '10.5px' : '10px',
                                    backgroundColor: currentIndex === index ? 'white' : 'gray',
                                    borderRadius: '60%',
                                    margin: '0 2px',
                                    cursor: 'pointer',
                                  }}
                              />
                          ))}
                      </div>
                    </div>     
                  </div>

                        <div className={`${style.main_details} col-lg-5 col-md-5 col-12`}>
                            <h4 className=''>ABSENnicon C Slim Series 165</h4>
                            <h5 className={`${style.SEK} my-lg-2 my-md-0`}>SEK 55.00  NOK</h5>
                                <div className='d-flex'>
                                <div className={style['button-section']}>
                                <div className={style.itemAdjuster}>
                                    <button onClick={() => handleDecrease()}>-</button>
                                    <span className='m-1'>{count}</span>
                                    <button onClick={() => handleIncrease()}>+</button>
                                </div>
                                    <div className='d-flex my-md-2'>
                                      <button className={`${style.add_to_cart} ms-xl-3 ms-lg-1 ms-md-0 ms-0 me-xxl-1 me-xl-1 me-3 me-md-2 my-2`}>Add to Cart <span><HiOutlineShoppingBag height={45} width={45}/></span></button>
                                      <button className={`${style.quick_enquiry} fs-5 bg-black border-0 my-md-3`}>Quick Enquiry</button>
                                  </div>
                                </div>
                                </div>
                                <div className={`${style.sale_section} my-lg-3 my-md-0 `}>
                                  <h6 className='ps-4 p-2' >Sale</h6>
                                  <div className='p-lg-3 p-md-4 p-4  ps-4 pt-lg-1 pt-md-0 pt-0'>
                                  <p className='text-success fw-bold'>Available In Stock</p>
                                  <p className=''><span className='fw-bold text-white'>Article Code:</span> 234</p>
                                  <p><span className='fw-bold text-white'>Category:</span> Complete LED Solutions</p>
                                  </div>                                 
                                </div>
                        </div>  
                    </div>   

                    <div className={`${style.para_section} my-5 `}>
                      <p>The Absenicon C Slim Series LED Display is much more than just a screen. The C Slim display is highly integrated and includes control unit, modules, cabinets, installation brackets, cables and all necessary display elements needed for the installation.</p>
                      <p>With an ultra-thin frame of 5 mm, the screen reaches a screen-to-body ratio of 98%, providing an immersive experience for all viewers. Experience outstanding visual performance with the Absenicon C Slim series. Every dark or bright detail looks vivid and clear with its 110% NTSC color gamut and 600 nits brightness.</p>
                    </div>

                    <h3 className='mb-4'>Product Specifications</h3>

                    <div className={`${style.product_spec}`}>
                      <div className={`${style.spec_detail}`}>
                        <h5 className='col-md-4 col-12'> Operation <br className='d-lg-none d-md-block d-none'/>Conditions</h5>
                          <div className='col-md-4 col-12'>
                            <p>Working Temperature <br  className='d-md-block d-none'/><span className='fw-medium fs-6'>0℃~+40℃ / 10~80%RH</span></p>
                          </div>
                      </div>

                      <div className={`${style.spec_detail}`}>
                        <h5 className='col-md-4 col-12'>Physical<br className='d-lg-none d-md-block d-none'/> Parameter</h5>
                            <div className='col-md-4 col-12'>
                              <p>Pixel Pitch <br  className='d-md-block d-none'/><span className='fw-medium fs-6'> 0.945 mm</span></p>
                              <p>Diode Type<br  className='d-md-block d-none'/><span className='fw-medium fs-6'> Flip-chip RGB LED(172x86um)</span></p>
                            </div>

                            <div className='col-md-4 col-12'>
                              <p>Pixel Configuration <br  className='d-md-block d-none'/><span className='fw-medium fs-6'>1280 x 720</span></p>
                              {/* <p className='fw-bold col-md-4 col-12'>Diode Type<br/><span className='fw-medium fs-6'>Flip-chip RGB LED (172x86um)</span></p> */}
                            </div>
                      </div>

                      <div className={`${style.spec_detail}`}>
                      <h5 className='col-md-4 col-12'>Optical<br className='d-lg-none d-md-block d-none'/> Parameter</h5>
                            <div className='col-md-4 col-12'>
                              <p>Brightness<br  className='d-md-block d-none'/><span className='fw-medium fs-6'>600 nit</span></p>
                              <p>Diode Type<br  className='d-md-block d-none'/><span className='fw-medium fs-6'>Flip-chip RGB LED(172x86um)</span></p>
                            </div>

                            <div className='col-md-4 col-12'>
                            <p>Contrast Ratio<br className='d-md-block d-none'/><span className='fw-medium fs-6'>12,000 : 1 </span></p> 
                            <p>Color Temperature<br  className='d-md-block d-none'/><span className='fw-medium fs-6'>6,500K ± 500K</span></p>
                            </div>
                      </div>

                      <div className={`${style.spec_detail}`}>
                      <h5 className='col-md-4 col-12'>Electrical<br className='d-lg-none d-md-block d-none'/> Parameter</h5>
                            <div className='col-md-4 col-12'>
                              <p>Refresh Rate <br className='d-md-block d-none'/> <span className='fw-medium fs-6'>3840 Hz</span></p>
                              <p>Power Frequency <br className='d-md-block d-none'/> <span className='fw-medium fs-6'>50/60 Hz</span></p>
                            </div>

                            <div className='col-md-4 col-12'>
                            <p>Input Voltage<br className='d-md-block d-none'/> <span className='fw-medium fs-6'> 100~240V AC</span></p>
                            <p>IPower Consumption<br className='d-md-block d-none'/> <span className='fw-medium fs-6'> 321 W/m</span></p>
                            </div>
                      </div>
                    </div>
                    <div>
                      <h3  className='mb-4 my-5'> Related Products</h3>
                      <div className="d-flex">

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
                    className={`cs_slider pt-5 cs_slider_3 anim_blog ${style ? '' : 'style_slider'}`}
                    >      
                      {blog_data.map((item) => (
                        <SwiperSlide key={item.id} className="swiper-slide">
                              <ProductItem item={item} />
                              </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                    </div>
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
