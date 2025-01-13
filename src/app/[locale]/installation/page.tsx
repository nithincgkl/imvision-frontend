'use client'
import React, { Suspense, useState } from 'react';
import HeaderOne from '@/layouts/headers/HeaderOne'
import Wrapper from '@/layouts/wrapper'
import FooterOne from '@/layouts/footers/FooterOne'
import styles from "./style.module.css";
import InstallationBanner from '@/components/common/InstallationBanner';
import InstallationForm from '@/components/common/InstallationForm';
import LetsTalk from '@/components/home/lets-talk';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
import { useTranslations } from 'next-intl';

const Installation: React.FC = () => {
    return (
        <CartProvider>
            <Suspense fallback={<div>loading...</div>}>
                <Page />
            </Suspense>
        </CartProvider>
    );
};

const Page: React.FC = () => {
    const t = useTranslations('installation');
    return (
        <Wrapper>
            <HeaderOne />
            <div id="smooth-wrapper">
                <div id="smooth-content" className='smooth-content'>
                    <main>
                        <InstallationBanner />

                        <section className={styles["instructions"]}>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12"><h2>{t("heading2")}</h2></div>
                                    <div className="col-md-12">

                                        <div className={styles["box-container"]}>

                                            <div className={styles["box"]}>
                                                <h6>1</h6>
                                                <p>{t("para1")}
                                                    <span>–{t("para2")}</span></p>
                                            </div>
                                            <div className={styles["box"]}>
                                                <h6>2</h6>
                                                <p>{t("para3")} <span>RAL 6005</span>{t("para4")}</p>
                                            </div>
                                            <div className={styles["box"]}>
                                                <h6>3</h6>
                                                <p>{t("para5")} <span>–{t("para6")}</span></p>
                                            </div>
                                            <div className={styles["box"]}>
                                                <h6>4</h6>
                                                <p><span>{t("para7")}</span>{t("para8")}</p>
                                            </div>
                                            <div className={styles["box"]}>
                                                <h6>5</h6>
                                                <p><span>{t("para9")}</span> {t("para10")}</p>
                                            </div>
                                            <div className={styles["box"]}>
                                                <h6>6</h6>
                                                <p><span>{t("para11")}</span> {t("para12")}</p>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>

                        <InstallationForm />
                        <LetsTalk />


                        <FooterOne />
                    </main>
                </div>
            </div>
        </Wrapper>
    )
}

export default Installation