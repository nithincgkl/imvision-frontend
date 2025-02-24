'use client';

import React from 'react';
import styles from "./style.module.css";
import { useTranslations } from 'next-intl';
import Error from '../common/Error';
import Image from 'next/image';

// Define EventCategory interface correctly
interface EventCategory {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
}

// Define props interface for WowMoments
interface WowMomentsProps {
  categories: EventCategory[]; // categories should be an array of EventCategory
}

const WowMoments: React.FC<WowMomentsProps> = ({ categories }) => {
  const t = useTranslations('home.wowMoments');

  if (!categories || categories.length === 0) {
    return <Error></Error>
  }

  return (
    <>
      <section className={`${styles['home-wow']} ${styles['bg-light-black-2']}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className={styles.headerTexts}>
                <p className={styles.smallText}>{t("smallHeading")}</p>
                <p className={styles.largeText}>{t("heading")}</p>
              </div>
              <p className={styles['home-wow-p']}>
                <span>{t("description1")}</span><br />
                {t("description2")} <br /> {t("description3")}
              </p>
            </div>
          </div>
          <div className="row">
            {categories.map((category) => (
              <div className="col-md-6 d-flex justify-content-center" key={category.id}>
                <div className={styles['wow-box']}>
                  <Image
                    src={category.thumbnailUrl || "/placeholder.jpg"}
                    alt={category.title}
                    width={400}
                    height={250} // Keeps a fixed aspect ratio
                    layout="intrinsic"
                    objectFit="cover" // Ensures images don’t stretch
                    className="img-fluid"
                  />
                  <h4>{category.title}</h4>
                  <p>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WowMoments;
