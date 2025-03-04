import Image from 'next/image';
import React from 'react';
import style from '../home/style.module.css'
import { useLocale, useTranslations } from 'next-intl';
import Error from "../common/Error";

interface Props {
    data: any;
    assets: any;
}

const WhatWeDoSection: React.FC<Props> = ({ data, assets }) => {
    const t = useTranslations('home.whatWeDo');
    const whatWeDoHeading = data?.what_we_do?.heading || '';
    const whatWeDoItems = data?.what_we_do?.content || [];
    
    // Find the what_we_do_assets from the assets array
    const whatWeDoAssets = assets|| [];
    
    // Sort assets by their name to ensure correct order (what_we_do_1, what_we_do_2, etc.)
    const sortedAssets = [...whatWeDoAssets].sort((a, b) => {
        const numA = parseInt(a.name.replace('what_we_do_', ''));
        const numB = parseInt(b.name.replace('what_we_do_', ''));
        return numA - numB;
    });
    
    if (!data || !assets || whatWeDoAssets.length === 0) {
        return <Error />;
    }

    return (
        <div className={`container-fluid ${style["what_we_do_container"]}`} style={{ marginTop: '200px' }}>
            
            {/* Section Heading */}
            <h2 className={` ${style["section_heading"]}`}>
                {whatWeDoHeading}
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
                                    src={sortedAssets[index].url}
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
