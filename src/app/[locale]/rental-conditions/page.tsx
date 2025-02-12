'use client'
import React, { Suspense } from 'react';
import Link from 'next/link';
import Wrapper from '@/layouts/wrapper';
import FooterOne from '@/layouts/footers/FooterOne';
import HeaderOne from '@/layouts/headers/HeaderOne';
import style from "./style.module.css";
import LetsTalk from '@/components/home/lets-talk';
import { FiDownload } from "react-icons/fi";
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('rentalConditions');
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
                          <li>{t("point1")}</li>
                          <li>{t("point2")}</li>
                          <li>{t("point3")}</li>
                          <li>{t("point4")}</li>
                          <li>{t("point5")}</li>
                          <li>{t("point6")}</li>
                          <li>{t("point7")}</li>
                          <li>{t("point8")}</li>
                        </ol>
                        <div className={style["download_btn_container"]}>
                          <div><img src="/assets/images/download.jpg" className="w-100" alt="" /></div>
                          <a
                            href="/lease-agreement.pdf"
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
};

export default RentalConditions;