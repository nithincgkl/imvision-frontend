'use client';
<<<<<<< HEAD

import React, { useState, useEffect } from 'react';
=======
<<<<<<< HEAD

import React, { useState, useEffect } from 'react';
=======
import React from 'react';
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
>>>>>>> c6b769af6e04908e709438e625067d7e912a0db5
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
<<<<<<< HEAD
// import Filter from "@/components/sale/filter";
=======
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
>>>>>>> c6b769af6e04908e709438e625067d7e912a0db5
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
<<<<<<< HEAD
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
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
>>>>>>> c6b769af6e04908e709438e625067d7e912a0db5
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
<<<<<<< HEAD
              {/* <Filter /> */}
=======
              <Filter />
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
>>>>>>> c6b769af6e04908e709438e625067d7e912a0db5

              <section className={style["product_section"]}>
                <div className="container-fluid">
                  <div className="row">
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c6b769af6e04908e709438e625067d7e912a0db5
                  {products.map((product) => (
                      <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12" key={product.id}>
                        <ProductItem item={{
                    id: product.id,
                    img: product.thumbnail?.formats?.large?.url || product.thumbnail?.url,
                    title: product.title,
                    des: product.amount,
                    slug: product.slug,  // Pass the slug to ProductItem
                  }} />
<<<<<<< HEAD
=======
=======
                    {blog_data.map((item) => (
                      <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12" key={item.id}>
                        <ProductItem item={item} />
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
>>>>>>> c6b769af6e04908e709438e625067d7e912a0db5
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
<<<<<<< HEAD
export default Page;
=======
export default Page;
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
>>>>>>> c6b769af6e04908e709438e625067d7e912a0db5
