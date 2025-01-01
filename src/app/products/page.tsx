'use client';

import React, { useState, useEffect } from 'react';
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import ProductItem from "@/components/product-item/product-item";
import LetsTalk from '@/components/home/lets-talk';
import axios from 'axios';
import { CartProvider, useCart } from '@/context/cart-context';

const Product: React.FC = () => {
  return (
    <CartProvider>
      <Page />
    </CartProvider>
  );
};

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
  article_code: string;
}

const Page: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8); // Number of items to display initially

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

  const { cartItems, removeFromCart, updateCartItemCount, addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      img: product.thumbnail.formats?.large?.url || product.thumbnail.url,
      title: product.title,
      des: product.amount,
      amount: parseFloat(product.amount),
      type: product.sale_rent,
      count: 1,
      article_code: product.article_code,
    };

    addToCart(cartItem);
  };

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 8); // Increment the visible items count by 8
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Wrapper>
      <HeaderOne />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <div className={style["without-banner"]}>
              <div className={style.topSection}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <h1 className={style.pageTitle}>Product for Sale/Rent</h1>
                    </div>
                  </div>
                </div>
              </div>

              <section className={style["product_section"]}>
                <div className="container-fluid">
                  <div className="row">
                    {products.slice(0, visibleItems).map((product) => (
                      <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12" key={product.id}>
                        <ProductItem item={{
                          id: product.id,
                          img: product.thumbnail?.formats?.large?.url || product.thumbnail?.url,
                          title: product.title,
                          des: product.amount,
                          slug: product.slug,
                          sale_rent: product.sale_rent,
                          article_code: product.article_code
                        }} />
                      </div>
                    ))}
                  </div>
                  {visibleItems < products.length && (
                    <div className="text-center mt-4">
                      <button onClick={handleLoadMore}  className={style["load_more_btn"]}>
                        Load More
                      </button>
                    </div>
                  )}
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
