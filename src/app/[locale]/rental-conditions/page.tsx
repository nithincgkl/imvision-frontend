'use client'
import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import { FiDownload } from "react-icons/fi";
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
import { useLocale, useTranslations } from 'next-intl';
import axios from 'axios';
import Error from '@/components/common/Error';
import Loader from '@/components/common/Loader';

const RentalConditions: React.FC = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div>loading...</div>}>
        <Page />
      </Suspense>
    </CartProvider>
  );
};

// Main ContactPage Component
const Page = () => {
  const [rentalConditions, setRentalConditions] = useState<any>([]);
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const t = useTranslations('rentalConditions');
  const getInstallationAssets = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}rental-condition?locale=${locale}&populate=*`);
      setRentalConditions(response.data.data);
    } catch (error) {
      console.error("Error fetching Rental conditions data:", error);
      setRentalConditions([]); 
    }
  };
        useEffect(() => {
          const fetchData = async () => {
            setLoading(true); // Start loader before fetching
            await Promise.all([getInstallationAssets()]);
            setLoading(false); // Stop loader once all APIs complete
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
        <Loader size={300} />
      </div>
    );
  }
  else {
    return (
      <Wrapper>
        <HeaderOne />
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main>
              <section className={style.contact_section}>
                <div className={style.contact_banner}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-8">
                        <h1 className={style.pageTitle}>{t("heading")}</h1>
                      </div>
                      <div className="col-md-4">
                        <p>{t("desc")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={style["rental_conditions"]}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12">
                        <div className={style["rental_conditions_container"]}>
                          <h4>{t("heading2")}</h4>
                          <ol>
                            {rentalConditions?.conditions?.rental_conditions?.length > 0 ? (
                              rentalConditions.conditions.rental_conditions.map((data: string, index: number) => (
                                <li key={index}>{data}</li> // Corrected function syntax & added key
                              ))
                            ) : (
                              <Error /> // Self-closing Error component
                            )}
                          </ol>

                          <div className={style["download_btn_container"]}>
                            <div><img src="/assets/images/download.jpg" className="w-100" alt="" /></div>
                            <a
                              href={rentalConditions.pdf.url}
                              download="lease-agreement.pdf"
                              className={style["download-link"]}
                            >
                              <h4>{t("download")}<br className='d-md-none d-block' /> {t("lease")}</h4>
                              <div className={style["download_btn"]}>
                                <span>PDF</span>
                                <span><FiDownload /></span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </section>

              <LetsTalk />
            </main>
            <FooterOne />
          </div>
        </div>
      </Wrapper>
    );
  }
};

export default RentalConditions;