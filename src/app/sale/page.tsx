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

// Define types for products
interface Product {
  id: number;
  img: string;
  title: string;
  des: string;
  sale_rent: string;
  slug:string;
}

// Page.tsx
const Page: React.FC = () => {
  const [productData, setProductData] = useState<Product[]>([]); // Original sale products
  const [filteredProductData, setFilteredProductData] = useState<Product[]>([]); // Filtered sale products
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch products
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}products?populate=*`, 
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response?.data?.length > 0) {
        const transformedData = response.data
          .filter((item: any) => item.sale_rent === 'Sale') // Filter for sale products
          .map((item: any) => {
            const imageUrl =
              item.product_images && item.product_images.length > 0
                ? item.product_images[0].url
                : item.thumbnail
                ? item.thumbnail.url
                : 'No image is available';

            return {
              id: item.id,
              img: imageUrl,
              title: item.title,
              des: item. description || '',
              sale_rent: item.sale_rent,
              slug:item.slug,
            };
          });
          
        setProductData(transformedData);
        setFilteredProductData(transformedData);
      } else {
        setError('No sale products found.');
      }
    } catch (error) {
      console.error('Error fetching sale products:', error);
      setError('Failed to load sale products.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle applying filters
  const handleApplyFilters = (filteredProducts: Product[]) => {
    const finalProducts = filteredProducts.length > 0 
      ? filteredProducts.filter(product => product.sale_rent === 'Sale')
      : productData;

    setFilteredProductData(finalProducts);
  };

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
                      <h1 className={style.pageTitle}>Sale Products</h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Component */}
              <Filter onApplyFilters={handleApplyFilters} />

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
                    ) : filteredProductData.length > 0 ? (
                      filteredProductData.map((item) => (
                        <div
                          className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12"
                          key={item.id}
                        >
                          <ProductItem item={item} />
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-center">
                        <p>No sale products found.</p>
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