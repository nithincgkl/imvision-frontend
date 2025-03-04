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
  const [footer, setFooter] = useState<any>([])
  const [letsTalk, setLetsTalk] = useState<any>([])
  const [navigation, setNavigation] = useState<any>([])
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
  const fetchLetsTalk = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}let-us-talk?locale=${locale}&populate=*`);
      setLetsTalk(response.data);
    } catch (error) {
      console.error("Error fetching Let's Talk data:", error);
      setLetsTalk([]);
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
            setLoading(true); // Start loader before fetching
            await Promise.all([getInstallationAssets(),fetchNavigation(),fetchLetsTalk(),fetchFooter()]);
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
        <Loader size={150} />
      </div>
    );
  }
  else if (!rentalConditions || rentalConditions.content === null || rentalConditions?.conditions?.rental_conditions?.length === 0) {
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
        <HeaderOne data={navigation.data}/>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <main>
              <section className={style.contact_section}>
                <div className={style.contact_banner}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-8">
                        <h1 className={style.pageTitle}>{rentalConditions?.content?.heading}</h1>
                      </div>
                      <div className="col-md-4">
                        <p>{rentalConditions?.content?.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={style["rental_conditions"]}>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12">
                        <div className={style["rental_conditions_container"]}>
                          <h4>{rentalConditions?.content?.heading2}</h4>
                          <ol>
                            {rentalConditions?.content?.rental_conditions?.length > 0 ? (
                              rentalConditions.content.rental_conditions.map((data: string, index: number) => (
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
                              <h4 dangerouslySetInnerHTML={{__html: rentalConditions?.content?.download}}></h4>
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

              <LetsTalk data={letsTalk.data}/>
            </main>
            <FooterOne data={footer.data}/>
          </div>
        </div>
      </Wrapper>
    );
  }
};

export default RentalConditions;