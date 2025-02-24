import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from "./style.module.css";
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import axios from 'axios';
import Error from '../common/Error';
import Loader from '../common/Loader';


const LetsTalk: React.FC = () => {
  const t = useTranslations('home.letsTalk');
  const locale = useLocale();
  const [data, setData] = useState<any>(null);
  const [loading,setLoading] = useState<Boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}let-us-talk?locale=${locale}&populate=*`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching Let's Talk data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Add dependencies that the effect uses

  if (loading) {
    <div className="text-center my-4"
      style={{
        width: '100%',
        height: '40vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <Loader size={300} />
    </div>
  }
  else if (!data || !data.data || !data.data.let_us_talk_banner?.length) {
    return <Error />;
  }
  else {
    const letUsTalk = data.data.let_us_talk_banner[0];

    return (
      <section className={styles['home-experience-container']}>
        <div className="container mx-auto">
          <div className='row'>
            <div className="col-md-12">
              <div>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles['full-video']}
                >
                  <source src={letUsTalk.url} type="video/mp4" />
                  {t('videoError')}
                </video>
              </div>
            </div>

            <div className="col-md-12 text-center">
              <div className={styles['lets-talk']}>
                <div>
                  <img
                    src="/assets/images/dot-bg.png"
                    className="w-100"
                    alt=""
                  />
                  <div className={styles['lets-talk-text']}>
                    <h2>{letUsTalk.heading || t('heading')}</h2>
                    <h3>{letUsTalk.subheading || t('heading2')}</h3>
                    <Link href="/contact">
                      <button className={styles['center-btn']}>{t('buttonText')}</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default LetsTalk;