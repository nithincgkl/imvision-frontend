'use client';
import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image'; // Import StaticImageData
import styles from "./style.module.css";

interface ProductItemProps {
  item: {
    img: StaticImageData; // Use StaticImageData for Next.js images
    title: string;
    des: string;
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  return (
    <div className={styles['our-screen-box']}>
      <div className={styles["main_div"]}>
        <div className={`${styles['box']} ${styles['box--top-bot']}`}>
          <div className={`${styles['box__inner']} ${styles['box--top-bot']}`}>
            <div className="cs_post cs_style_1">
              <Link href="/event-details" className={styles["pb-15"]}>
                <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.img}`} alt={item.title} />
              </Link>
              <div className="cs_post_info">
                <h2 className="cs_post_title">
                  <Link href="/event-details">{item.title}</Link>
                </h2>
                <p className="cs_m0">SEK {item.des}</p>
                <div className={styles['button-section']}>
                  <button>Add to Cart</button>
                  <button>Quick Enquiry</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
