import React from "react";
import styles from "./style.module.css";
import Link from "next/link";

const InstallationBanner: React.FC = () => {
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
                Your browser does not support the video tag.
              </video>
            </div>
            <div className={styles["banner-content"]}>
              <h1 className={styles["installation_title"]}>Installation</h1>
              {/* <h2>Your display partner</h2> */}
            </div> 
            <Link href="/contact">
            <button className={styles["talk-btn"]}>Talk to Expert</button>
            </Link>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstallationBanner;