'use client';
<<<<<<< HEAD

import React, { useState, useEffect } from 'react';
=======
import React from 'react';
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
<<<<<<< HEAD
// import Filter from "@/components/sale/filter";
import ProductItem from "@/components/product-item/product-item";
import LetsTalk from '@/components/home/lets-talk';
import axios from 'axios';



interface Product {
  id: number;
  thumbnail: {
    formats?: {
      large?: { url: string };
    };
    url: string;
  };
  title: string;
  amount: string;
  slug: string;  // Added slug
}

const Page: React.FC = () => {
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

=======
import Filter from "@/components/sale/filter";
import ProductItem from "@/components/product-item/product-item";
import LetsTalk from '@/components/home/lets-talk';

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

const Page: React.FC = () => {
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
  return (
    <Wrapper>
      <HeaderOne />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <div className={style["without-banner"]}>
              {/* Common Top Section */}
              <div className={style.topSection}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <h1 className={style.pageTitle}>Products</h1>
                    </div>
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              {/* <Filter /> */}
=======
              <Filter />
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0

              <section className={style["product_section"]}>
                <div className="container-fluid">
                  <div className="row">
<<<<<<< HEAD
                  {products.map((product) => (
                      <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12" key={product.id}>
                        <ProductItem item={{
                    id: product.id,
                    img: product.thumbnail?.formats?.large?.url || product.thumbnail?.url,
                    title: product.title,
                    des: product.amount,
                    slug: product.slug,  // Pass the slug to ProductItem
                  }} />
=======
                    {blog_data.map((item) => (
                      <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12" key={item.id}>
                        <ProductItem item={item} />
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <LetsTalk />
            </div>
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

<<<<<<< HEAD
export default Page;
=======
export default Page;
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
