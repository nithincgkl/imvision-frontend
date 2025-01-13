import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useTranslations } from 'next-intl';

const InstallationBanner: React.FC = () => {
  const t = useTranslations('installation');
  return (
    <>
      <section className={styles["nav-banner-container"]}>
        <div className={styles["banner"]}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">

                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={styles["banner-video"]}
                >
                  <source src="/assets/videos/Installation.mp4" type="video/mp4" />
                  {t("videoError")}
                </video>
              </div>
              <div className={styles["banner-content"]}>
                <h1 className={styles["installation_title"]}>{t("heading")}</h1>
                {/* <h2>Your display partner</h2> */}
              </div>
              <Link href="/contact">
                <button className={styles["talk-btn"]}>{t("button")}</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstallationBanner;