import React from 'react';
import Image from 'next/image';
import styles from "./style.module.css";
import Link from 'next/link';

const LetsTalk: React.FC = () => {
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
                <source src="/assets/videos/videos.mp4" type="video/mp4" />
                Your browser does not support the video tag.
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
                  <h2>Have a project for us?</h2>
                  <h3>Let's talk.</h3>
                  <Link href="/contact" >
                  <button className={styles['center-btn']}>Talk to expert</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetsTalk;