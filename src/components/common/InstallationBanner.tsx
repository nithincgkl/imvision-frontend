import React from "react";
import styles from "./style.module.css";
import Link from "next/link";

const InstallationBanner: React.FC = () => {
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
                <source src="/assets/videos/Installation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className={styles["banner-content"]}>
              <h1>Installation</h1>
              {/* <h2>Your display partner</h2> */}
            </div>

            <button className={styles["talk-btn"]}>Talk to Expert</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default InstallationBanner;