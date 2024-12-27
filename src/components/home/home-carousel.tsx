'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import styles from "./style.module.css";
import ProductItem from '../product-item/product-item';

interface Product {
  id: string;
    thumbnail: {
    formats?: {
      large?: { url: string };
    };
    url: string;
  };
  title: string;
  amount: string;
  slug: string;
  sale_rent: string;
  article_code:string;
}

const HomeCarousel: React.FC<{ style_2?: boolean; style_3?: boolean }> = ({ style_2, style_3 }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL + "products";
        const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className={styles['home-carousel']}>
        <p>Loading products...</p>
      </div>
    );
  }
  

  // Render carousel
  return (
    <section className={`${styles['home-carousel']} ${styles['bg-light-black2']}`}>
      <div className="container-fluid">
        <div className="cs_section_heading cs_style_1 cs_type_1">
          <div className="cs_section_heading_text">
            <h4>Displays</h4>
            <h3>Next-generation displays</h3>
          </div>
          {/* <div className="cs_section_heading_right cs_btn_anim">
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
          </div> */}
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
          {products.map((product) => (
            <SwiperSlide key={product.id} className="swiper-slide">
              <ProductItem
                item={{
                  id: product.id,
                  img: product.thumbnail?.formats?.large?.url || product.thumbnail?.url,
                  title: product.title,
                  des: product.amount,
                  slug: product.slug,
                  sale_rent: product.sale_rent,
                  article_code:product.article_code,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {style_2 ? null : style_3 ? null : <div className="cs_height_150 cs_height_lg_60"></div>}
    </section>
  );
};

export default HomeCarousel;
