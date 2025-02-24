import React from 'react';
import Image from 'next/image';
import styles from "./style.module.css";
import { useTranslations } from 'next-intl';
import Error from '../common/Error';
interface Props {
  homeData: any; // Replace 'any' with proper typing when possible
}

const Displays: React.FC<Props> = ({ homeData }) => {
  const t = useTranslations('home.displays');
  if (!homeData || !homeData.data || (!homeData.data.next_gen_1?.length || !homeData.data.next_gen_2?.length )) {
    return <Error></Error>
  }
  const assetOne = homeData.data.next_gen_1[0];
  const assetTwo = homeData.data.next_gen_2[0];


  return (
    <>
      <section className={styles['home-displays']}>
        <div className="container-fluid">
          <div className="row">
            <div className={styles.headerTexts}>
              <p className={styles.smallText}>{t("smallHeading")}</p>
              <p className={styles.largeText}>{t("heading")}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Image
                src={assetOne.url}
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
                <h2>{t("heading2")}</h2>
                <p>
                  {t("description1")}
                </p>
                <hr />
                <p>
                  <br />
                  {t("description2")}<br />
                  {t("description3")}
                </p>

                <Image
                  src={assetTwo.url}
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