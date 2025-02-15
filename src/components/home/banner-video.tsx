import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from 'next-intl';

const BannerVideo: React.FC = () => {
  const t = useTranslations('home.bannerVideo');
  return (
    <>
      <section className={styles["nav-banner-container"]}>
        <div className={styles["banner"]}>
          <div className="container-fluid">
            <div className="col-md-12">
              <video
                autoPlay
                loop
                muted
                playsInline
                className={styles["banner-video"]}
              >
                <source src="/assets/videos/banner_updated.mov" type="video/mp4" />
                {t("heading")}
              </video>
            </div>
            <div className={styles["banner-content"]}>
              <h1>{t("subHeading1")}</h1>
              <h2>{t("subHeading2")}</h2>
            </div>
            <Link href="/contact">
              <button className={styles["talk-btn"]}>{t("buttonText")}</button>
            </Link>
          </div>
        </div>

      </section>
    </>
  );
};



export default BannerVideo;