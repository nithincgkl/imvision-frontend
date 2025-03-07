import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useTranslations } from 'next-intl';
import Error from "./Error";
import Installation from "@/app/[locale]/installation/page";
interface Props {
  installationData: any; // Replace 'any' with proper typing when possible
}

const InstallationBanner: React.FC<Props> = ({installationData}:any) => {
  const t = useTranslations('installation');
  if (!installationData || !installationData.data || !installationData.data.installation_banner?.length || installationData.data.content === null) {
    return <Error></Error>
  }
  else {
    const bannerVideo = installationData.data.installation_banner[0];
    const content = installationData.data.content;
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
                    <source src={bannerVideo?.url} type={bannerVideo?.mime} />
                    {t("videoError")}
                  </video>
                </div>
                <div className={styles["banner-content"]}>
                  <h1 className={styles["installation_title"]}>{content.installationHeading}</h1>
                  {/* <h2>Your display partner</h2> */}
                </div>
                <Link href="/contact">
                  <button className={styles["talk-btn"]}>{content.buttonText}</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default InstallationBanner;