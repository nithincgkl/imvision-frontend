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
import { CartProvider } from '@/context/cart-context'; // Import the CartProvider

const RentProducts: React.FC = () => {
  return (
    <CartProvider>
      <RentPage />
    </CartProvider>
  );
};

// Define types for products
interface Product {
  id: string;
  img: string;
  title: string;
  des: string;
  sale_rent: string;
  slug: string;
  article_code: string;
  amount: string;
  createdAt: Date;
}

// Page.tsx for Rent Products
const RentPage: React.FC = () => {
  const [productData, setProductData] = useState<Product[]>([]); // Original rent products
  const [filteredProductData, setFilteredProductData] = useState<Product[]>([]); // Filtered rent products
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4); // Number of products to show initially
  const [load, setLoad] = useState(true)
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
      if (response?.data?.products?.length > 0) {
        const transformedData = response.data.products
          .filter((item: any) => item.sale_rent === 'Rent') // Filter for rent products
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
              des: item.des || '',
              sale_rent: item.sale_rent,
              slug: item.slug,
              amount: item.amount,
              createdAt: item.createdAt,
            };
          });

        setProductData(transformedData);
        setFilteredProductData(transformedData);
      } else {
        setError('No rent products found.');
      }
    } catch (error) {
      console.error('Error fetching rent products:', error);
      setError('Failed to load rent products.');
      setLoad(false);
    } finally {
      setIsLoading(false);
      setLoad(false);

    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle applying filters
  const handleApplyFilters = (filteredProducts: Product[]) => {
    const finalProducts = filteredProducts.length > 0
      ? filteredProducts.filter((product) => product.sale_rent === 'Rent')
      : productData;

    setFilteredProductData(finalProducts);
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Increase visible count by 4
  };
  if (load && isLoading) return <div>Loading...</div>;
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
                      filteredProductData.slice(0, visibleCount).map((item) => (
                        <div
                          className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12"
                          key={item.id}
                        >
                          <ProductItem item={item} linkEnabled={true} />
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-center">
                        <p>No rent products found.</p>
                      </div>
                    )}
                  </div>
                  <div className={`${style["button_div"]} text-center my-4`}>
                    {visibleCount < filteredProductData.length && (
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

export default RentProducts;
