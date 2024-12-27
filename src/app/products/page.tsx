'use client';

import React, { useState, useEffect } from 'react';
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
// import Filter from "@/components/sale/filter";
import ProductItem from "@/components/product-item/product-item";
import LetsTalk from '@/components/home/lets-talk';
import axios from 'axios';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook

const Product: React.FC = () => {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
};



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
  sale_rent: string
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


  const { cartItems, removeFromCart, updateCartItemCount ,addToCart} = useCart();

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      img: product.thumbnail.formats?.large?.url || product.thumbnail.url,
      title: product.title,
      des: product.amount,
      amount: parseFloat(product.amount), // Assuming amount is a string, convert to number
      type: product.sale_rent,
      count: 1, // Start with 1 item added
    };

    addToCart(cartItem); // Use the addToCart function from the context
  };

  if (loading) return <div>Loading...</div>; 


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

              {/* <Filter /> */}

              <section className={style["product_section"]}>
                <div className="container-fluid">
                  <div className="row">
                    {products.map((product) => (
                      <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12" key={product.id}>
                        <ProductItem item={{

                          id: product.id,
                          img: product.thumbnail?.formats?.large?.url || product.thumbnail?.url,
                          title: product.title,
                          des: product.amount,
                          slug: product.slug,
                          sale_rent: product.sale_rent // Correctly pass the slug
                          // Pass the slug to ProductItem
                        }} />
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

export default Product;