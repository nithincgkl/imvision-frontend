import Image from 'next/image';
import React from 'react';
import style from '../home/style.module.css'
import { useLocale, useTranslations } from 'next-intl';

interface Props {
    data: any;
}

const WhatWeDoSection: React.FC<Props> = ({ data }) => {
    const t = useTranslations('home.whatWeDo');
    const whatWeDoItems = data?.data?.what_we_do?.what_we_do || [];

    const imageUrls = [
        data?.data?.what_we_do_1?.url,
        data?.data?.what_we_do_2?.url,
        data?.data?.what_we_do_3?.url,
        data?.data?.what_we_do_4?.url,
        data?.data?.what_we_do_5?.url,
        data?.data?.what_we_do_6?.url,
    ];

    return (
        <div className={`container-fluid ${style["what_we_do_container"]}`} style={{ marginTop: '200px' }}>
            
            {/* Section Heading */}
            <h2 className={` ${style["section_heading"]}`}>
                {t("heading")}
            </h2>

            <div className={`row d-flex flex-wrap justify-content-center ${style["what_we_do_sub"]}`}>
                {whatWeDoItems.map((item: any, index: number) => (
                    <div
                        key={index}
                        className={`col-md-5 m-3 d-flex ${style["what_we_do_box"]}`} // Adjust width and add margin
                    >
                        <div className={`${style["what_we_do_items"]}`}>
                            {/* Image Wrapper */}
                            <div className={`${style["image_wrapper"]}`}>
                                <Image
                                    src={imageUrls[index]}
                                    alt={item.title}
                                    width={400}
                                    height={400}
                                    className="object-cover w-full h-auto"
                                />
                                {/* Title Overlay */}
                                <div className={`${style["title_overlay"]}`}>
                                    <p>{item.title}</p>
                                </div>
                            </div>

                            {/* Description Wrapper */}
                            <div className={`${style["description_wrapper"]}`}>
                                <p className="text-gray-300 text-lg">{item.description}</p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhatWeDoSection;
