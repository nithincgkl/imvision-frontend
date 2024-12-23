"use client";
import React, { useState, useEffect, useRef } from 'react';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import LetsTalk from '@/components/home/lets-talk';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import ProductItem from "@/components/product-item/product-item";
import axios from 'axios';
import { useParams } from 'next/navigation'; // Use next/navigation to get params
import Link from 'next/link';
import { IoMdClose } from 'react-icons/io';


interface Product {
  id: number;
  title: string;
  amount: string;
  slug: string;
  description: string;
  qty: number;
  article_code: string;
  thumbnail: { formats?: { large?: { url: string }; }; url: string; };
  product_category: {
    category_name: string
  };
  sale_rent: string
}

const Page: React.FC = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current image index
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const modalRef = useRef<HTMLDivElement>(null);


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Close modal when clicking outside of it
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalVisible(false);
    }
  };


  // Image sources array
  const images = featured?.thumbnail?.formats?.large?.url
    ? [featured.thumbnail.formats.large.url]
    : [featured?.thumbnail?.url];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}products`;
        const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
        const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
        setProducts(response.data);
      } catch (error) {
        setError("Error fetching product data.");
      }
    };

    const fetchProductDetails = async () => {
      if (!slug) {
        setError("Product slug is undefined.");
        setLoading(false);
        return;
      }

      try {
        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}products/${slug}`;
        const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
        const response = await axios.get(API_URL, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
        setFeatured(response.data);
      } catch (error) {
        setError("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    fetchProductDetails();

  }, [slug]);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back to first image if we're at the end
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(images.length - 1); // Loop back to last image if we're at the beginning
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index); // Set current index based on clicked dot
  };

  const handleIncrease = () => setCount(count + 1);
  const handleDecrease = () => setCount(count > 0 ? count - 1 : 0);

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error if any

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <section className={style["product_detail_section"]}>
              {featured && (

                <div key={featured.id} className="container-fluid my-5">
                  <div className="d-flex flex-md-row flex-column">
                    <div className="col-lg-7 col-md-7 col-12">
                      <div className={style["carousel_container"]}>
                        <div className='d-flex flex-row'>
                          <button onClick={handlePrevious} className={`${style.arrow}`}>❮</button>
                          <div className={`${style.carousel_image}`}>
                            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
                          </div>
                          <button onClick={handleNext} className={`${style.arrow}`}>❯</button>
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
                      <h4>{featured.title}</h4>
                      <h5 className={`${style.SEK} my-lg-2 my-md-0`}> SEK {featured.amount} NOK </h5>
                      <div className="d-flex">
                        <div className={style["button-section"]}>
                          <div className={style.itemAdjuster}>
                            <button onClick={handleDecrease}>-</button>
                            <span className="m-1">{count}</span>
                            <button onClick={handleIncrease}>+</button>
                          </div>

                          <div className="d-flex my-md-2">
                            <button className={`${style.add_to_cart} ms-xl-3 ms-lg-1 ms-md-0 ms-0 me-xxl-1 me-xl-1 me-3 me-md-2 my-2`} > Add to Cart <span> <HiOutlineShoppingBag height={45} width={45} /> </span> </button>
                            <button className={`${style.quick_enquiry} fs-5 bg-black border-0 my-md-3`} onClick={toggleModal}> Quick Enquiry </button>
                          </div>
                        </div>
                      </div>

                      {/* Sale Section */}
                      <div className={`${style.sale_section} my-lg-3 my-md-0`}>
                        <h6 className="ps-4 p-2" style={{ backgroundColor: featured.sale_rent === 'Rent' ? '#5C553A' : '#3F3A5C', }}>{featured.sale_rent}</h6>
                        <div className="p-lg-3 p-md-4 p-4 ps-4 pt-lg-1 pt-md-0 pt-0">
                          <p className="text-success fw-bold">Available In Stock</p>
                          <p> <span className="fw-bold text-white">Article Code:</span> {featured.article_code} </p>{" "} {/* Display article code */}
                          <p><span className='fw-bold text-white'>Category:</span> {featured.product_category.category_name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${style.para_section} my-5 `}>
                    <p>{featured.description}</p>
                  </div>

                  <h3 className='mb-4'>Product Specifications</h3>

                  <div className={`${style.product_spec}`}>
                    <div className={`${style.spec_detail}`}>
                      <h5 className='col-md-4 col-12'> Operation <br className='d-lg-none d-md-block d-none' />Conditions</h5>
                      <div className='col-md-4 col-12'>
                        <p>Working Temperature <br className='d-md-block d-none' /><span className='fw-medium fs-6'>0℃~+40℃ / 10~80%RH</span></p>
                      </div>
                    </div>

                    <div className={`${style.spec_detail}`}>
                      <h5 className='col-md-4 col-12'>Physical<br className='d-lg-none d-md-block d-none' /> Parameter</h5>
                      <div className='col-md-4 col-12'>
                        <p>Pixel Pitch <br className='d-md-block d-none' /><span className='fw-medium fs-6'> 0.945 mm</span></p>
                        <p>Diode Type<br className='d-md-block d-none' /><span className='fw-medium fs-6'> Flip-chip RGB LED(172x86um)</span></p>
                      </div>

                      <div className='col-md-4 col-12'>
                        <p>Pixel Configuration <br className='d-md-block d-none' /><span className='fw-medium fs-6'>1280 x 720</span></p>
                        {/* <p className='fw-bold col-md-4 col-12'>Diode Type<br/><span className='fw-medium fs-6'>Flip-chip RGB LED (172x86um)</span></p> */}
                      </div>
                    </div>

                    <div className={`${style.spec_detail}`}>
                      <h5 className='col-md-4 col-12'>Optical<br className='d-lg-none d-md-block d-none' /> Parameter</h5>
                      <div className='col-md-4 col-12'>
                        <p>Brightness<br className='d-md-block d-none' /><span className='fw-medium fs-6'>600 nit</span></p>
                        <p>Diode Type<br className='d-md-block d-none' /><span className='fw-medium fs-6'>Flip-chip RGB LED(172x86um)</span></p>
                      </div>

                      <div className='col-md-4 col-12'>
                        <p>Contrast Ratio<br className='d-md-block d-none' /><span className='fw-medium fs-6'>12,000 : 1 </span></p>
                        <p>Color Temperature<br className='d-md-block d-none' /><span className='fw-medium fs-6'>6,500K ± 500K</span></p>
                      </div>
                    </div>

                    <div className={`${style.spec_detail}`}>
                      <h5 className='col-md-4 col-12'>Electrical<br className='d-lg-none d-md-block d-none' /> Parameter</h5>
                      <div className='col-md-4 col-12'>
                        <p>Refresh Rate <br className='d-md-block d-none' /> <span className='fw-medium fs-6'>3840 Hz</span></p>
                        <p>Power Frequency <br className='d-md-block d-none' /> <span className='fw-medium fs-6'>50/60 Hz</span></p>
                      </div>

                      <div className='col-md-4 col-12'>
                        <p>Input Voltage<br className='d-md-block d-none' /> <span className='fw-medium fs-6'> 100~240V AC</span></p>
                        <p>IPower Consumption<br className='d-md-block d-none' /> <span className='fw-medium fs-6'> 321 W/m</span></p>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {isModalVisible && (
                <div className={style.modal} onClick={handleOutsideClick}>
                  <div ref={modalRef} className={style.modal_content}>
                    <h4>Quick Enquiry</h4>
                    <button
                      type="button"
                      className={style.close_btn}
                      onClick={toggleModal} // Close modal when clicked
                    >
                      <IoMdClose />
                    </button>
                    <form className={style.form}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="name"
                            className={`form-control ${style.inputField}`}
                            placeholder="Name"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <input
                            type="email"
                            name="email"
                            className={`form-control ${style.inputField}`}
                            placeholder="Email"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="text"
                            name="phone"
                            className={`form-control ${style.inputField}`}
                            placeholder="Phone"
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="address/city"
                            name="address/city"
                            className={`form-control ${style.inputField}`}
                            placeholder="Address & City"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <textarea
                            name="message"
                            className={`form-control ${style.inputField}`}
                            placeholder="Message"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <button type="submit" className={style.talk_btn}>
                            Submit
                          </button>
                          <button
                            type="button"
                            className={style.cancel_btn}
                            onClick={toggleModal} // Close modal on cancel
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              <div className='my-5 container-fluid'>
                <h3 className='mb-4 my-5'> Related Products</h3>

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
                    {products.map((product) => (
                      <SwiperSlide key={product.id} className="swiper-slide">
                        <Link href={`/products/${product.slug}`} passHref>
                          <ProductItem
                            item={{
                              id: product.id,
                              img: product.thumbnail?.formats?.large?.url || product.thumbnail?.url,
                              title: product.title,
                              des: product.amount,
                              slug: product.slug,
                              sale_rent: product.sale_rent // Correctly pass the slug
                            }}
                            linkEnabled={false} // Link is enabled, will navigate to product page

                          />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
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

export default Page;
