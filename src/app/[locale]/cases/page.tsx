"use client";

import React, { Suspense, useEffect, useState } from "react";
import styles from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import { CartProvider } from "@/context/cart-context";
import { useLocale } from "next-intl";
import axios from "axios";
import Loader from "@/components/common/Loader";
import FooterOne from "@/layouts/footers/FooterOne";
import Error from '@/components/common/Error';

const Cases: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <CasePage />
      </Suspense>
    </CartProvider>
  );
};

const CasePage = () => {
  const [images, setImagesData] = useState<any[]>([]);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [footer, setFooter] = useState<any>([])
  const [navigation, setNavigation] = useState<any>([])
  const locale = useLocale();

  const getCasesAsset = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}case?locale=${locale}&populate=*`
      );
      const fetchedPageData = response.data.data.content;
      const fetchedImages = response.data.data?.images || [];
      setPageData(fetchedPageData);
      setImagesData(fetchedImages);
    } catch (error) {
      console.error("Error fetching industry data:", error);
      setPageData(null);
      setImagesData([]);
    }
  };
  const fetchNavigation = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}navigation?locale=${locale}&populate=*`);
      setNavigation(response.data);
    } catch (error) {
      console.error("Error fetching navigation data:", error);
      setNavigation([]);
    }
  };
  const fetchFooter = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}footer?locale=${locale}&populate=*`);
      setFooter(response.data);
    } catch (error) {
      console.error("Error fetching footer data:", error);
      setFooter([]);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getCasesAsset(),fetchNavigation(),fetchFooter()]);
      setLoading(false);
    };
    fetchData();
  }, []);

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
        <Loader size={150} />
      </div>
    );
  }
  else if (!pageData || pageData === null || !images || images.length === 0) {
    return (
      <div>
        <HeaderOne data={navigation.data} />
        <Error></Error>
        <FooterOne data={footer.data} />
      </div>
    )
  }
  else {
    return (
      <Wrapper>
        <HeaderOne data={navigation.data} />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <div className={`${styles["pageContainer"]} min-h-screen py-10`}>
              <section className={`${styles["home-wow"]} ${styles["bg-light-black-2"]}`}>
                <div className="container-fluid">
                  {pageData ? (
                    <div className="col-12 text-center py-5">
                      <h1 className={styles["contact_heading"]}>{pageData.page_heading}</h1>
                      <p className={styles["contact_paragraph"]}>{pageData.page_description}</p>
                    </div>
                  ) : (
                    <p>Loading content...</p>
                  )}

                  <div className="row">
                    {pageData?.case_studies?.map((category: any, index: number) => {
                      const image = images.find(img => img.caption === `case${index + 1}`);
                      return (
                        <div key={index} className="col-12 d-flex flex-column flex-lg-row align-items-center mb-5">
                          {/* Text Content */}
                          <div className={`${styles["wow-box"]} w-100 text-lg-start`}>
                            <h4>{category.heading}</h4>
                            <p>{category.client_overview}</p>
                            <p>{category.delivered_solution}</p>
                            <ol>
                              {category.client_objectives?.map((item: any, i: number) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ol>
                            <p>{category.outcome_feedback}</p>
                            <p>{category.client_testimonial}</p>
                          </div>
                          {/* Image */}
                          {image && (
                            <div className="ms-lg-4 mt-3 mt-lg-0">
                              <img
                                src={image.formats.medium?.url || image.url}
                                alt={image.caption}
                                className={`${styles["case-image"]} img-fluid`}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* {pageData?.page_footer_description && (
                  <div className="col-12 text-center mt-4">
                    <p className={styles["contact_paragraph"]}>{pageData.page_footer_description}</p>
                  </div>
                )} */}
                </div>
                <div className="col-md-12 text-center">
                  <div className={styles['lets-talk']}>
                    <div className={styles['lets-talk-container']}>
                      <img
                        src="/assets/images/dot-bg.png"
                        className="w-100"
                        alt=""
                      />
                      <div className={styles['lets-talk-text']}>
                        <h2>{pageData.footer_heading}
                        </h2>
                        <p>{pageData.footer_description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <FooterOne data={footer.data} />
              </section>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
};

export default Cases;
