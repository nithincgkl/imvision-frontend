'use client';

import React, { useState, useEffect, Suspense } from 'react';
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Filter from "@/components/sale/filter";
import ProductItem from "@/components/product-item/product-item";
import LetsTalk from '@/components/home/lets-talk';
import axios from 'axios';
import { CartProvider, useCart } from '@/context/cart-context';
import Loader from '@/components/common/Loader';
import { useLocale, useTranslations } from 'next-intl';

const Product: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>loading...</div>}>
        <Page />
      </Suspense>
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
interface Sort {
  key?: string,
  value?: string
}
interface FilterParameters {
  sort: Sort;
  filters: Filter;
  sortOption: string;
  reset: boolean
}
interface Filters {
  categoryId?: number[];
  subCategoryIds?: number[];
  subSubCategoryIds?: number[];
}
const Page: React.FC = () => {
  const t = useTranslations('productPage.allProducts');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [filterAmount, setAmount] = useState<string>();
  const [filterCreatedAt, setCreatedAt] = useState<string>();
  const [filters, setFilters] = useState<Filter>();
  const [filterLoader, setFilterLoader] = useState<Boolean>(false);
  const locale = useLocale();


  const loadProducts = async () => {
    setLoading(true);
    const allProducts = await fetchProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts); // Initialize filtered products
    setProductLoading(false);
    setLoading(false);
  };
  useEffect(() => {
    loadProducts();
  }, []);

  const fetchProducts = async (
    page: number = 1,
    amount?: string,
    createdAt?: string,
    data?: Filters
  ) => {
    setProductLoading(true);
    try {
      const requestData = {
        categoryIds: data?.categoryId?.length === 0 ? [] : data?.categoryId,
        subCategoryIds: data?.subCategoryIds?.length === 0 ? [] : data?.subCategoryIds,
        subSubCategoryIds: data?.subSubCategoryIds?.length === 0 ? [] : data?.subSubCategoryIds,
      };
      let queryParams = `pageNumber=${page}&limit=4`;
      if (amount) {
        queryParams += `&amount=${amount}`;
      }
      if (createdAt) {
        queryParams += `&createdAt=${createdAt}`;
      }
      const API_URL = `${process.env.NEXT_PUBLIC_API_URL}products?locale=${locale}&${queryParams}`;
      const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

      const response = await axios.post(API_URL,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
      setTotalItems(response.data.totalNumberOfProducts)
      setTotalPages(response.data.numberOfPages)
      setPageNumber(page)
      // Transform data to ensure correct image URLs
      return response.data.products.map((item: any) => {
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
      setError(t("error"));
      return []; // Return an empty array on error
    }
  };

  const handleLoadMore = async () => {
    const nextPage = pageNumber + 1;
    try {
      const newProducts = await fetchProducts(nextPage, filterAmount, filterCreatedAt, filters);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Merge new products into the existing filteredProducts
      const updatedProducts = [...filteredProducts, ...newProducts];

      // Sort the merged array
      const sortedProducts = updatedProducts.sort((a, b) => {
        if (filterAmount === "asc") {
          return parseFloat(a.amount) - parseFloat(b.amount);
        } else if (filterAmount === "desc") {
          return parseFloat(b.amount) - parseFloat(a.amount);
        }
        return 0; // No sorting if filterAmount is not set
      });

      // Update state with sorted products
      setProducts(sortedProducts); // Assuming products should also reflect the sorted data
      setFilteredProducts(sortedProducts);
    } catch (error) {
      console.error("Error loading more products:", error);
      setError(t("error"));
    } finally {
      setProductLoading(false);
    }
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

  const handleApplyFilters = async (params: FilterParameters) => {
    setFilterLoader(true)
    const page = 1;
    const { sort, filters: newFilters, reset } = params;

    let amount = undefined;  // Initialize with undefined to reset values
    let createdAt = undefined;  // Initialize with undefined to reset values

    if (sort.key === "amount") {
      amount = sort.value;
    }
    if (sort.key === "createdAt") {
      createdAt = sort.value;
    }

    // Directly use the parameters for fetchProducts instead of relying on the state
    if (reset) {
      const newProducts = await fetchProducts(page);
      setProducts(newProducts);
      setFilteredProducts(newProducts);
    } else {
      const newProducts = await fetchProducts(page, amount, createdAt, newFilters);
      setProducts(newProducts);
      setFilteredProducts(newProducts);
    }

    // Update the state afterward to reflect the current filter configuration
    setFilters(newFilters);
    setAmount(amount);
    setCreatedAt(createdAt);
    setFilterLoader(false)
    setProductLoading(false);
  };

  if (loading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}
      >
        <Loader size={300} />
      </div>
    );
  }
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
                      <h1 className={style.pageTitle}>{t("heading")}</h1>
                    </div>
                  </div>
                </div>
              </div>

              <Filter onFilterChange={handleApplyFilters} totalItems={totalItems} totalLength={filteredProducts.length} />

              {filterLoader ? (
                <div className="text-center my-4">
                  <Loader size={200} />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center align-content-center py-4">
                  <p>{t("noProduct")}</p>
                </div>
              ) : (
                <section className={style["product_section"]}>
                  <div className="container-fluid">
                    <div className="row">
                      {filteredProducts.map((product) => (
                        <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12" key={product.id}>
                          <ProductItem item={{
                            id: product.id,
                            img: product.img,
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

                    {productLoading && <div><Loader /></div>}

                    <div className={`${style["button_div"]} text-center my-4`}>
                      {!productLoading && filteredProducts.length < totalItems && (
                        <button onClick={handleLoadMore} className={style["load_more_btn"]}>
                          {t("loadMore")}
                        </button>
                      )}
                      <button onClick={() => window.location.href = '/contact'} className={style["contact_btn"]}>
                        {t("contactUs")}
                      </button>
                    </div>
                  </div>
                </section>
              )}

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
