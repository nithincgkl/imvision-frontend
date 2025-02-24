'use client'
import React, { Suspense, useEffect, useState } from 'react';
import HeaderOne from '@/layouts/headers/HeaderOne'
import Wrapper from '@/layouts/wrapper'
import FooterOne from '@/layouts/footers/FooterOne'
import styles from "./style.module.css";
import InstallationBanner from '@/components/common/InstallationBanner';
import InstallationForm from '@/components/common/InstallationForm';
import LetsTalk from '@/components/home/lets-talk';
import { CartProvider, useCart } from '@/context/cart-context'; // Import the useCart hook
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import axios from 'axios';
import Loader from '@/components/common/Loader';

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
    const [installation, setInstallation] = useState([]);
    const locale = useLocale();

    const [loading, setLoading] = useState(true);
    const getInstallationAssets = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}installation?locale=${locale}&populate=*`);
            setInstallation(response.data);
        } catch (error) {
            console.error("Error fetching Installation data:", error);
            setInstallation([]);
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
                    <div id="smooth-content" className='smooth-content'>
                        <main>
                            <InstallationBanner installationData={installation} />

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
}

export default Installation