import React from 'react';
import Image from 'next/image';
import styles from "./style.module.css";

const Displays: React.FC = () => {
  return (
    <>
      <section className={styles['home-displays']}>
        <div className="container-fluid">
          <div className="row">
            <div className={styles.headerTexts}>
              <p className={styles.smallText}>Displays</p>
              <p className={styles.largeText}>Next-generation displays</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Image
                src="/assets/images/home-displays.png"
                alt="Displays"
                width={600}
                height={400}
                priority
                style={{
                  width: '100%',
                  height: 'auto'
                }} // Ensures aspect ratio is maintained
              />
            </div>
            <div className="col-md-6">
              <div className={styles['home-displays-text']}>
                <h2>90 Degree</h2>
                <p>
                  90° connection cabinets cut 45° In the left or right side of your
                  cabinet and then can't connect with normal cabinet from that
                  side anymore.
                </p>
                <hr />
                <p>
                  <br />
                  90° Connection <br />
                  Make your corner &amp; cube
                </p>

                <Image
                  src="/assets/images/home-displays-2.png"
                  alt="Displays"
                  width={600}
                  height={400}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%'
                  }} // Ensures aspect ratio and responsiveness
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Displays;