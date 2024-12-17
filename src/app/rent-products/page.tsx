'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './style.module.css';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import Filter from '@/components/sale/filter';
import ProductItem from '@/components/product-item/product-item';
import LetsTalk from '@/components/home/lets-talk';

const Page: React.FC = () => {
  const [productData, setProductData] = useState<any[]>([]); // State to hold product data
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [filters, setFilters] = useState<any>({}); // State to hold the filters

  // Function to fetch products based on filters
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}products`, 
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          params: {
            'filters[sale_rent][$eq]': 'Rent', // Exact match for 'Rent'
            'populate': '*',
            ...filters // Include filters in the request
          },
        }
      );

      console.log("Rent Products:", response.data);

      if (response?.data?.length > 0) {
        const transformedData = response.data
          .filter((item: any) => item.sale_rent === 'Rent')
          .map((item: any) => {
            const imageUrl =
              item.product_images && item.product_images.length > 0
                ? item.product_images[0].url
                : item.thumbnail
                ? item.thumbnail.url
                : '';

            return {
              id: item.id,
              img: imageUrl,
              title: item.title,
              des: item.description || '',
            };
          });

        setProductData(transformedData);
      } else {
        setError('No rent products found.');
      }
    } catch (error) {
      console.error('Error fetching rent products:', error);
      setError('Failed to load rent products.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products when the component mounts or when filters change
  useEffect(() => {
    fetchProducts();
  }, [filters]); // Trigger fetching whenever filters change

  // // Apply filters and update the filters state
  // const applyFilters = (newFilters: any) => {
  //   setFilters(newFilters); // Update filters state when the user applies new filters
  // };

  return (
    <Wrapper>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <div className={style['without-banner']}>
              <div className={style.topSection}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <h1 className={style.pageTitle}>Rent Products</h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Component */}
              {/* <Filter onApplyFilters={applyFilters} /> */}

              {/* Product Section */}
              <section className={style['product_section']}>
                <div className="container-fluid">
                  <div className="row">
                    {isLoading ? (
                      <div className="col-12 text-center">
                        <p>Loading products...</p>
                      </div>
                    ) : error ? (
                      <div className="col-12 text-center">
                        <p>{error}</p>
                      </div>
                    ) : productData.length > 0 ? (
                      productData.map((item) => (
                        <div
                          className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12"
                          key={item.id}
                        >
                          <ProductItem item={item} />
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-center">
                        <p>No products found.</p>
                      </div>
                    )}
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


export default Page;         