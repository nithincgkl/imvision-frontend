import React from "react";
import Image from "next/image";
import styles from "./style.module.css";
import Link from "next/link";
// import Logo_white from "../../../public/assets/img/Logo_white.png";
import { useTranslations } from 'next-intl';
import Error from "../common/Error";

interface Props {
  data: any;
  assets: any;
}
const HomeExperience: React.FC<Props> = ({ data, assets }) => {
  const t = useTranslations('home.homeExperience');
  const experienceData = data?.homeExperience?.content || [];
  const homeExperienceAssets = assets || [];
  
  // Filter assets to only include those with experience_icon_ in their name
  const experienceIconAssets = homeExperienceAssets.filter((asset:any) => 
    asset.name && asset.name.includes('experience_logo')
  );
  const logo = homeExperienceAssets.filter((asset:any) => 
    asset.name && asset.name.includes('logo.png')
  );

  // Sort filtered assets by their numeric suffix
  const sortedAssets = [...experienceIconAssets].sort((a, b) => {
    const numA = parseInt(a.name.replace('experience_logo', ''));
    const numB = parseInt(b.name.replace('experience_logo', ''));
    return numA - numB;
  });

  if (!data || !assets || sortedAssets.length === 0) {
    return <Error />;
  }

  // const experienceData = [
  //   {
  //     title: t('energyEfficiency.title'),
  //     description: t('energyEfficiency.description'),
  //   },
  //   {
  //     title: t('durabilityReliability.title'),
  //     description: t('durabilityReliability.description'),
  //   },
  //   {
  //     title: t('wideViewingAngles.title'),
  //     description: t('wideViewingAngles.description'),
  //   },
  //   {
  //     title: t('fastRefreshRate.title'),
  //     description: t('fastRefreshRate.description'),
  //   },
  //   {
  //     title: t('thinLightweight.title'),
  //     description: t('thinLightweight.description'),
  //   },
  //   {
  //     title: t('scalability.title'),
  //     description: t('scalability.description'),
  //   },
  // ];

  return (
    <section className={styles["home-experience"]}>
      <div className={styles["home-experience-container"]}>
        <div className="container-fluid">
          <div className="col-md-12 d-flex justify-content-center gap-3">
            <div className="text-right">
              <h3 className="text-3xl font-bold">{t('heading')}</h3>
            </div>
            <div>
              <Image src={logo?.[0].url} alt="Company Logo" width={150} height={150} />
            </div>
          </div>

          <div className={styles["experience-box-container"]}>
            {experienceData.map((item:any, index:any) => (
              <div
                className={styles["experience-box"]}
                key={index}
              >
                <Image
                  src={sortedAssets[index].url}
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