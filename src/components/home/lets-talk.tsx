import React from 'react';
import Image from 'next/image';
import styles from "./style.module.css";
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const LetsTalk: React.FC = () => {
  const t = useTranslations('home.letsTalk');
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
                <source src="/assets/videos/videos.mp4" type="video/mp4" />
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
                  <h2>{t('heading')}</h2>
                  <h3>{t('heading2')}</h3>
                  <Link href="/contact" >
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
};

export default LetsTalk;