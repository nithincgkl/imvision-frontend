import React from "react";
import Image from "next/image";
import styles from "./style.module.css";
import Link from "next/link";
// import Logo_white from "../../../public/assets/img/Logo_white.png";
import { useTranslations } from 'next-intl';

const HomeExperience: React.FC = () => {
  const t = useTranslations('home.homeExperience');
  const experienceData = [
    {
      title: t('energyEfficiency.title'),
      description: t('energyEfficiency.description'),
    },
    {
      title: t('durabilityReliability.title'),
      description: t('durabilityReliability.description'),
    },
    {
      title: t('wideViewingAngles.title'),
      description: t('wideViewingAngles.description'),
    },
    {
      title: t('fastRefreshRate.title'),
      description: t('fastRefreshRate.description'),
    },
    {
      title: t('thinLightweight.title'),
      description: t('thinLightweight.description'),
    },
    {
      title: t('scalability.title'),
      description: t('scalability.description'),
    },
  ];

  return (
    <section className={styles["home-experience"]}>
      <div className={styles["home-experience-container"]}>
        <div className="container-fluid">
          <div className="col-md-12 d-flex justify-content-center gap-3">
            <div className="text-right">
              <h3 className="text-3xl font-bold">{t('heading')}</h3>
            </div>
            <div>
              <Image src={'/assets/img/Logo_white.png'} alt="Company Logo" width={150} height={150} />
            </div>
          </div>

          <div className={styles["experience-box-container"]}>
            {experienceData.map((item, index) => (
              <div
                className={styles["experience-box"]}
                key={index}
              >
                <Image
                  src={`/assets/images/icons/0${index + 1}.svg`}
                  alt={`${item.title} Icon`}
                  width={50}
                  height={50}
                  priority={index < 3}
                />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeExperience;