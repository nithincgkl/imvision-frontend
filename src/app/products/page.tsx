'use client';

import React, { useState, useEffect } from 'react';
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Filter from "@/components/sale/filter";
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
  title: string;
  amount: string;
  slug: string;
  sale_rent: string;
  article_code: string;
  des: string;
  img: string;
  product_images?: any;
  thumbnail: {
    formats?: {
      large?: { url: string };
    };
    url: string;
  };
  createdAt: Date;
}

const Page: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [visibleCount, setVisibleCount] = useState(4); // Number of products to show initially

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await fetchProducts();
      setProducts(allProducts);
      setFilteredProducts(allProducts); // Initialize filtered products
      setLoading(false);
    };

    loadProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const API_URL = `${process.env.NEXT_PUBLIC_API_URL}products?populate=*`;
      const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      // Transform data to ensure correct image URLs
      return response.data.map((item: any) => {
        const imageUrl =
          (item.product_images && item.product_images.length > 0 && item.product_images[0].url) ||
          (item.thumbnail && item.thumbnail.url) ||
          'No image is available'; // Default image if none exists

        return {
          id: item.id,
          img: imageUrl,
          title: item.title,
          des: item.des || '',
          sale_rent: item.sale_rent,
          amount: item.amount,
          article_code: item.article_code,
          slug: item.slug,
          thumbnail: item.thumbnail,
          createdAt: item.createdAt,
        };
      });

    } catch (error) {
      console.error("Error fetching product data:", error);
      setError("Failed to load products. Please try again later.");
      return []; // Return an empty array on error
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Increase visible count by 4
  };

  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      id: product.id,
      img: product.img, // Pass transformed image URL
      title: product.title,
      des: product.amount,
      amount: parseFloat(product.amount),
      type: product.sale_rent,
      count: 1,
      article_code: product.article_code,
    };

    addToCart(cartItem);
  };

  const handleApplyFilters = (filtered: Product[]) => {
    setFilteredProducts(filtered);
    console.log("Filtered products:", filtered); // Debug filtered data
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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

              <Filter onApplyFilters={handleApplyFilters} />

              <section className={style["product_section"]}>
                <div className="container-fluid">
                  <div className="row">
                    {filteredProducts.slice(0, visibleCount).map((product) => (
                      <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12" key={product.id}>
                        <ProductItem item={{
                          id: product.id,
                          img: product.img, // Pass transformed img URL
                          title: product.title,
                          des: product.amount,
                          slug: product.slug,
                          sale_rent: product.sale_rent,
                          article_code: product.article_code,
                          amount: product.amount,
                          createdAt: product.createdAt
                        }}
                          linkEnabled={true} />
                      </div>
                    ))}
                  </div>
                  <div className={`${style["button_div"]} text-center my-4`}>
                    {visibleCount < filteredProducts.length && (
                      <button onClick={handleLoadMore} className={style["load_more_btn"]}>
                        Load More
                      </button>
                    )}
                    <button onClick={() => window.location.href = '/contact'} className={style["contact_btn"]}>
                      Contact Us
                    </button>
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
