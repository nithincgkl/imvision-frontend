import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from "./style.module.css";
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import axios from 'axios';
import Error from '../common/Error';
import Loader from '../common/Loader';

interface Props {
  data:any
}
const LetsTalk: React.FC<Props> = ({data}) => {
  const t = useTranslations('home.letsTalk');
  if (!data || data.let_us_talk_banner === 0 || data.content === null) {
    <p>{JSON.stringify(data)}</p>
    return <Error />;
  }
  else {
    const letUsTalk = data.let_us_talk_banner[0];
    const content = data.content;

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
                    <h2>{content.heading1}</h2>
                    <h3>{content.heading2}</h3>
                    <Link href="/contact">
                      <button className={styles['center-btn']}>{content.buttonText}</button>
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