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
import Error from '@/components/common/Error';

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
    const [installation, setInstallation] = useState<any>([]);
    const [footer, setFooter] = useState<any>([])
    const [letsTalk, setLetsTalk] = useState<any>([])
    const [navigation, setNavigation] = useState<any>([])
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
    else if (!installation || installation.data.content === null || installation.data.installation_banner.length === 0) {
        return (
            <div>
              <HeaderOne data={navigation.data} />
              <Error></Error>
              <FooterOne data={footer.data} />
            </div>
          )
    }
    else {
        const content = installation.data.content
        return (
            <Wrapper>
                <HeaderOne data={navigation.data}/>
                <div id="smooth-wrapper">
                    <div id="smooth-content" className='smooth-content'>
                        <main>
                            <InstallationBanner installationData={installation} />

                            <section className={styles["instructions"]}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-12"><h2>{content.instructionHeading}</h2></div>
                                        <div className="col-md-12">

                                            <div className={styles["box-container"]}>

                                            {content.instructions.map((item:any) => (
                                                    <div key={item.index} className={styles["box"]}>
                                                        <h6>{item.index}</h6>
                                                        <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </section>

                            <InstallationForm data={installation.data.content} />
                            <LetsTalk data={letsTalk.data} />


                            <FooterOne data={footer.data}/>
                        </main>
                    </div>
                </div>
            </Wrapper>
        )
    }
}

export default Installation