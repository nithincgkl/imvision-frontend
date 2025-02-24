import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Error from "../common/Error";
interface BannerVideoProps {
  homeData: any; // Replace 'any' with proper typing when possible
}

const BannerVideo: React.FC<BannerVideoProps> = ({ homeData }) => {
  const t = useTranslations("home.bannerVideo");

  if (!homeData || !homeData.data || !homeData.data.banner_home?.length) {
    return <Error></Error>
  }
  else {
    const bannerVideo = homeData.data.banner_home[0]; // Get the first banner video

    return (
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
                <source src={bannerVideo.url} type={bannerVideo.mime} />
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
    );
  }
};

export default BannerVideo;
