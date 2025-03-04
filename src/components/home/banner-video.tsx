import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Error from "../common/Error";
interface BannerVideoProps {
  homeData: any; // Replace 'any' with proper typing when possible
  video: any;
}

const BannerVideo: React.FC<BannerVideoProps> = ({ homeData,video }) => {
  const t = useTranslations("home.bannerVideo");

  if (!homeData || !video || video.length === 0) {
    return <Error />;
  }
  else {
    const content = homeData.banner;
    const bannerVideo = video[0]; // Get the first banner video

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
              <h1>{content.heading1}</h1>
              <h2>{content.heading2}</h2>
            </div>
            <Link href="/contact">
              <button className={styles["talk-btn"]}>{content.buttonText}</button>
            </Link>
          </div>
        </div>
        </section>
    );
  }
};

export default BannerVideo;
