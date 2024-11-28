import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const BannerVideo: React.FC = () => {
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
                <source src="/assets/videos/banner.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className={styles["banner-content"]}>
              <h1>Bigscreen Beyond</h1>
              <h2>Your display partner</h2>
            </div>

            <button className={styles["talk-btn"]}>Talk to Expert</button>
          </div>
        </div>

        {/* WhatsApp Floating Icon */}
        <a 
              href="https://wa.me/8714240400" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="whatsapp-float"
              aria-label="Chat with us on WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <style jsx>{`
        .whatsapp-float {
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          background-color: #25d366;
          display: flex;
          justify-content: center;
          align-items: center;
              font-size: 37px;
        }

        .whatsapp-float img {
          width: 80%;
          height: 80%;
        }

        .whatsapp-float:hover {
          transform: scale(1.1);
          transition: transform 0.2s;
        }
      `}</style>



      </section>
    </>
  );
};



export default BannerVideo;